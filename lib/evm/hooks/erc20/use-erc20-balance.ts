import { useAccount, useReadContracts } from "wagmi";
import { EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { ERC20 } from "lib/evm/abis";
import { formatUnits } from "viem";
import { isZero } from "lib/common/utils";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  tokenAddress: EthereumAddress | undefined;
  enabled?: boolean;
};

export const useErc20Balance = ({
  network,
  tokenAddress,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);
  const { address } = useAccount();
  const isEnabled = !!enabled && !!address && !!tokenAddress && !!chainId;

  const erc20Contract = {
    chainId,
    address: tokenAddress,
    abi: ERC20,
  } as const;

  const {
    data: erc20Data,
    isLoading,
    isSuccess: isSuccessReadContracts,
    isError,
    refetch,
  } = useReadContracts({
    contracts: [
      {
        ...erc20Contract,
        functionName: "balanceOf",
        args: isEnabled ? [address] : undefined,
      },
      {
        ...erc20Contract,
        functionName: "decimals",
      },
      {
        ...erc20Contract,
        functionName: "symbol",
      },
    ],
    query: {
      enabled: isEnabled,
    },
  });

  const [balanceData, decimalData, symbolData] = erc20Data || [];

  const isSuccess =
    isSuccessReadContracts &&
    !!balanceData &&
    (!!balanceData.result || isZero(balanceData.result)) &&
    !!decimalData?.result &&
    !!symbolData?.result;

  return {
    data: isSuccess
      ? {
          value: balanceData.result!,
          decimals: decimalData.result,
          symbol: symbolData.result,
          formatted: formatUnits(balanceData.result!, decimalData.result),
        }
      : undefined,
    isLoading: isLoading && isEnabled,
    isSuccess,
    isError,
    refetch: () => {
      if (isEnabled) {
        refetch();
      }
    },
  };
};
