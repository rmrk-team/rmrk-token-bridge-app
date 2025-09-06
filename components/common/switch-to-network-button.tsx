import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { useSwitchChain } from "wagmi";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  size?: ButtonProps["size"];
};

export const SwitchToNetworkButton = ({ network, size }: Props) => {
  const { id: activeChainId, name: activeChainName } =
    getActiveChainFromNetworkKey(network);
  const { chains, switchChain } = useSwitchChain();

  return (
    <Button
      data-name="switch-to-network-button"
      onClick={() => switchChain({ chainId: activeChainId })}
      variant={"outline"}
      colorScheme={"pink"}
      size={size}
    >
      Switch to {activeChainName}
    </Button>
  );
};
