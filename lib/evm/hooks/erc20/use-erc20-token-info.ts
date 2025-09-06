import { ERC20Token, EthereumAddress } from "lib/evm/types";
import { useReadContracts } from "wagmi";
import { ERC20 } from "lib/evm/abis";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  tokenAddress: EthereumAddress | undefined;
  enabled?: boolean;
};

export const useErc20TokenInfo = ({
  tokenAddress,
  network,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);
  const isEnabled = !!enabled && !!tokenAddress && !!network && !!chainId;

  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        chainId,
        address: tokenAddress,
        abi: ERC20,
        functionName: "symbol",
      },
      {
        chainId,
        address: tokenAddress,
        abi: ERC20,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: isEnabled,
    },
  });

  const tokenInfo = data
    ? ({
        symbol: data[0].result,
        decimals: data[1].result,
        address: tokenAddress,
      } as ERC20Token)
    : undefined;

  return {
    tokenInfo,
    isLoading: isLoading && isEnabled,
    refetch: () => {
      if (isEnabled) {
        refetch();
      }
    },
  };
};
