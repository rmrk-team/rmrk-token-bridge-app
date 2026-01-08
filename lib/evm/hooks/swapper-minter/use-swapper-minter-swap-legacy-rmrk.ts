import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { SWAPPER_MINTER } from "lib/evm/abis";
import { UseQueryOptions } from "@tanstack/react-query";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { EVM_RMRK_CONTRACTS } from "lib/evm/constants";
import { EthereumAddress } from "lib/evm/types";
import { useContractWriteCallbacks } from "lib/evm/hooks/use-contract-write-callbacks";
import { BaseError } from "@wagmi/core/src/errors/base";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  amount: bigint | undefined;
  toAddress: EthereumAddress | undefined;
  onSuccess?: (data: any) => void;
  onError?: (data?: BaseError) => void;
  enabled?: boolean;
};

export const useSwapperMinterSwapLegacyRemark = ({
  network,
  amount,
  toAddress,
  onSuccess,
  onError,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);

  const swapperMinterAddress = network
    ? EVM_RMRK_CONTRACTS[network].swapperMinter
    : undefined;

  const isEnabled =
    !!enabled && !!swapperMinterAddress && !!amount && !!toAddress && !!chainId;

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

  const swapLegacyRmrk = isEnabled
    ? () =>
        writeContractAsync({
          chainId,
          address: swapperMinterAddress,
          args: [amount, toAddress],
          abi: SWAPPER_MINTER,
          functionName: "swapLegacyRMRK",
        })
    : undefined;

  return {
    swapLegacyRmrk,
    isLoading: isEnabled && (isLoadingWrite || isFetchingReceipt),
  };
};
