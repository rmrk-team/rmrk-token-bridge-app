import React, { ReactNode } from "react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { useAccount } from "wagmi";
import { useConnectedNetwork } from "lib/evm/hooks";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { ButtonConnectWallet } from "components/common/button-connect-wallet";
import { ButtonProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  network: EVM_NETWORK_KEYS | undefined;
  size?: ButtonProps["size"];
};

export const ActionNetworkAndConnectResolver = ({
  children,
  network,
  size,
}: Props) => {
  const { address } = useAccount();
  const { chainId: connectedChainId } = useConnectedNetwork();
  const { id: activeChainId } = getActiveChainFromNetworkKey(network);
  const isWrongNetwork = !!activeChainId && connectedChainId !== activeChainId;

  return !!address && !isWrongNetwork ? (
    children
  ) : (
    <ButtonConnectWallet network={network} size={size} />
  );
};
