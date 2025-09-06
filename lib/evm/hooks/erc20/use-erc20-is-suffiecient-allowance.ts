import { useErc20Allowance } from "lib/evm/hooks";
import { EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { isZero } from "lib/common/utils";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  tokenAddress: EthereumAddress | undefined;
  allowedAddress: EthereumAddress | undefined;
  requiredAllowance: bigint | undefined;
  enabled?: boolean;
};

export const useErc20IsSuffiecientAllowance = ({
  network,
  tokenAddress,
  allowedAddress,
  requiredAllowance,
  enabled = true,
}: Props) => {
  const isEnabled =
    !!enabled &&
    !!network &&
    !!tokenAddress &&
    !!allowedAddress &&
    !!requiredAllowance;

  const { allowance, isLoading, refetch } = useErc20Allowance({
    network,
    tokenAddress,
    allowedAddress,
    enabled: isEnabled,
  });

  const isZeroRequired = isZero(requiredAllowance);

  const isSufficientAllowance =
    isZeroRequired ||
    Boolean(requiredAllowance && allowance && allowance >= requiredAllowance);

  return {
    allowance,
    isSufficientAllowance,
    isLoading: isLoading && isEnabled,
    refetch: () => {
      if (isEnabled) {
        refetch();
      }
    },
  };
};
