import { useChainId } from "wagmi";
import { connectedChains } from "lib/configs/wagmi/configure-chains";

export const useConnectedNetwork = () => {
  const chainId = useChainId();
  const isSupportedNetwork = Boolean(
    chainId &&
      connectedChains.find((supportedChain) => supportedChain.id === chainId)
  );

  return {
    isSupportedNetwork,
    chainId: isSupportedNetwork ? chainId : undefined,
  };
};
