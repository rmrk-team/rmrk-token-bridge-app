import {
  useWaitForTransactionReceipt,
  type UseWaitForTransactionReceiptReturnType,
  useWriteContract,
} from "wagmi";
import { ERC20 } from "lib/evm/abis";
import { EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { useContractWriteCallbacks } from "lib/evm/hooks/use-contract-write-callbacks";
import { BaseError } from "@wagmi/core/src/errors/base";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  tokenAddress: EthereumAddress | undefined;
  allowedAddress: EthereumAddress | undefined;
  amount: bigint | undefined;
  onSuccess?: (data: UseWaitForTransactionReceiptReturnType["data"]) => void;
  onError?: (data?: BaseError) => void;
  enabled?: boolean;
};

export const useErc20Approve = ({
  network,
  tokenAddress,
  allowedAddress,
  amount,
  onSuccess,
  onError,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);
  const isEnabled =
    !!enabled && !!tokenAddress && !!allowedAddress && !!amount && !!chainId;

  const {
    data,
    writeContractAsync,
    isPending: isLoadingWrite,
    error,
  } = useWriteContract();

  const {
    isFetching: isFetchingReceipt,
    data: waitData,
    isFetched,
  } = useWaitForTransactionReceipt({
    hash: data,
    confirmations: 2,
    query: {
      enabled: isEnabled,
    },
  });

  useContractWriteCallbacks({
    waitData,
    isFetched,
    onSuccess,
    onError,
    error,
  });

  const setApproval = isEnabled
    ? () =>
        writeContractAsync({
          chainId,
          address: tokenAddress,
          args: [allowedAddress, amount],
          abi: ERC20,
          functionName: "approve",
        })
    : undefined;

  return {
    setApproval,
    isLoading: isEnabled && (isLoadingWrite || isFetchingReceipt),
  };
};
