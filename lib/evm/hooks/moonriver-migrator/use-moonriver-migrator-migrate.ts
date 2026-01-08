import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { MOONRIVER_MIGRATOR } from "lib/evm/abis";
import { UseQueryOptions } from "@tanstack/react-query";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { EVM_RMRK_CONTRACTS } from "lib/evm/constants";
import { useContractWriteCallbacks } from "lib/evm/hooks/use-contract-write-callbacks";
import { BaseError } from "@wagmi/core/src/errors/base";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  amount: bigint | undefined;
  onSuccess?: (data: any) => void;
  onError?: (data?: BaseError) => void;
  enabled?: boolean;
};

export const useMoonriverMigratorMigrate = ({
  network,
  amount,
  onSuccess,
  onError,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);
  const moonriverMigratorAddress = network
    ? EVM_RMRK_CONTRACTS[network].moonriverMigrator
    : undefined;

  const isEnabled =
    enabled && !!moonriverMigratorAddress && !!amount && !!chainId;

  const {
    data,
    writeContractAsync,
    isPending: isLoadingWrite,
    error,
  } = useWriteContract();

  const {
    data: waitData,
    isFetching,
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

  const migrate = isEnabled
    ? () =>
        writeContractAsync({
          chainId,
          address: moonriverMigratorAddress,
          args: [amount],
          abi: MOONRIVER_MIGRATOR,
          functionName: "migrate",
        })
    : undefined;

  return {
    migrate,
    isLoading: isEnabled && (isLoadingWrite || isFetching),
  };
};
