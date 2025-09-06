import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { useReadContract } from "wagmi";
import { SWAPPER_MINTER } from "lib/evm/abis";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { EVM_RMRK_CONTRACTS } from "lib/evm/constants";
import { format } from "date-fns";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  enabled?: boolean;
};

export const useSwapperMinterLastMigration = ({
  network,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);
  const swapperMinterAddress = network
    ? EVM_RMRK_CONTRACTS[network].migrator
    : undefined;

  const isEnabled = !!enabled && !!swapperMinterAddress && !!chainId;

  const {
    data: lastMigration,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useReadContract({
    chainId,
    address: swapperMinterAddress,
    abi: SWAPPER_MINTER,
    functionName: "lastMigration",
    query: {
      enabled: isEnabled,
    },
  });

  const lastMigrationParsed = lastMigration
    ? format(new Date(Number(lastMigration) * 1000), "haaa O, dd MMMM yyyy")
    : undefined;

  return {
    lastMigration,
    lastMigrationParsed,
    isLoading: isLoading && isEnabled,
    isError,
    isSuccess,
    refetch: () => {
      if (isEnabled) {
        refetch();
      }
    },
  };
};
