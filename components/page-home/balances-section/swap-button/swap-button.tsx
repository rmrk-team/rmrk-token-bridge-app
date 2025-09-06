import React from "react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { ActionNetworkAndConnectResolver } from "components/common/action-network-and-connect-resolver";
import { SwapButtonAction } from "components/page-home/balances-section/swap-button/swap-button-action";

type Props = {
  network: EVM_NETWORK_KEYS;
  onSwapSuccess: () => void | undefined;
  amount: string | undefined;
};

export const SwapButton = ({ network, amount, onSwapSuccess }: Props) => (
  <ActionNetworkAndConnectResolver network={network}>
    <SwapButtonAction
      network={network}
      onSwapSuccess={onSwapSuccess}
      amount={amount}
    />
  </ActionNetworkAndConnectResolver>
);
