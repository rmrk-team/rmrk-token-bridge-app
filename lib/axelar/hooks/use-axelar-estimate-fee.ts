import { useAxelarContext } from "lib/configs/axelar/axelar-context-provider";
import { useEffect, useState } from "react";
import { axelarChainNames, gasTokenSymbol } from "lib/evm/constants";
import { AxelarNetworks } from "lib/app/types";
import { supportedChains } from "lib/configs/wagmi/configure-chains";
import { formatUnits } from "viem";

type Props = {
  sourceNetwork: AxelarNetworks | undefined;
  destinationNetwork: AxelarNetworks | undefined;
};

export const useAxelarEstimateFee = ({
  sourceNetwork,
  destinationNetwork,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [estimateFee, setEstimateGasFee] = useState<bigint | undefined>();
  const { AxelarQueryAPI } = useAxelarContext();
  const nativeCurrency = sourceNetwork
    ? supportedChains[sourceNetwork].nativeCurrency
    : undefined;

  const gasChainTokenSymbol = sourceNetwork
    ? gasTokenSymbol[sourceNetwork]
    : "";

  const parsedEstimateFee =
    estimateFee && nativeCurrency
      ? formatUnits(estimateFee, nativeCurrency.decimals)
      : undefined;

  const calculateFee = async () => {
    if (!!AxelarQueryAPI && !!sourceNetwork && !!destinationNetwork) {
      setIsLoading(true);
      const feeResult = await AxelarQueryAPI?.estimateGasFee(
        axelarChainNames[sourceNetwork],
        axelarChainNames[destinationNetwork],
        gasChainTokenSymbol || "",
        undefined,
        undefined,
        "0"
      );

      setEstimateGasFee(feeResult as unknown as bigint);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateFee();
  }, [JSON.stringify(AxelarQueryAPI), sourceNetwork, destinationNetwork]);

  return {
    estimateFee,
    parsedEstimateFee,
    symbol: nativeCurrency?.symbol,
    isLoading,
  };
};
