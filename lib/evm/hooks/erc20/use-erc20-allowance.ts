import { useAccount, useReadContract } from "wagmi";
import { ERC20 } from "lib/evm/abis/ERC20";
import { EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";

type Props = {
  tokenAddress: EthereumAddress | undefined;
  allowedAddress: EthereumAddress | undefined;
  network: EVM_NETWORK_KEYS | undefined;
  enabled?: boolean;
};

export const useErc20Allowance = ({
  network,
  tokenAddress,
  allowedAddress,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);
  const { address } = useAccount();
  const isEnabled =
    !!enabled && !!address && !!tokenAddress && !!allowedAddress && !!chainId;

  const {
    data: allowance,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useReadContract({
    chainId,
    address: tokenAddress,
    args: isEnabled ? [address, allowedAddress] : undefined,
    abi: ERC20,
    functionName: "allowance",
    query: {
      enabled: isEnabled,
    },
  });

  return {
    isLoading: isLoading && isEnabled,
    isSuccess,
    isError,
    allowance,
    refetch: () => {
      if (isEnabled) {
        refetch();
      }
    },
  };
};
