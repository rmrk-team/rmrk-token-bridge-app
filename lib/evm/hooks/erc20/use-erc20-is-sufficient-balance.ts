import { useErc20Balance } from "lib/evm/hooks";
import { EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { isZero } from "lib/common/utils";
import { parseUnits } from "viem";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  tokenAddress: EthereumAddress | undefined;
  requiredBalance: string | number | undefined;
  enabled?: boolean;
};

export const useErc20IsSuffiecientBalance = ({
  network,
  tokenAddress,
  requiredBalance,
  enabled = true,
}: Props) => {
  const isZeroRequired = isZero(Number(requiredBalance));
  const isEnabled = !!enabled && !isZeroRequired;

  const {
    data: erc20Balance,
    isLoading,
    refetch,
  } = useErc20Balance({
    network,
    tokenAddress,
    enabled: isEnabled,
  });

  const isSufficientBalance = Boolean(
    isZeroRequired ||
      (erc20Balance &&
        requiredBalance &&
        erc20Balance.value >=
          parseUnits(`${requiredBalance}`, erc20Balance.decimals))
  );

  return {
    erc20Balance,
    isSufficientBalance,
    isLoading: isLoading && isEnabled,
    refetch: () => {
      if (isEnabled) {
        refetch();
      }
    },
  };
};
