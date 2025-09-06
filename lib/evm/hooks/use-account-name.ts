import { EthereumAddress } from "lib/evm/types";
import { useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";

type Props = {
  address: EthereumAddress;
  enabled?: boolean;
};

export const useAccountName = ({ address, enabled = true }: Props) => {
  const chainId = mainnet.id;
  const isEnabled = !!enabled && !!address && !!chainId;

  const { data: accountName, refetch } = useEnsName({
    address,
    chainId,
    query: {
      enabled: isEnabled,
    },
  });

  return {
    accountName,
    refetch: () => {
      if (isEnabled) {
        refetch();
      }
    },
  };
};
