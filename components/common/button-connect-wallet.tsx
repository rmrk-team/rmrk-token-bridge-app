import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { EthereumAddress } from "lib/evm/types";
import { EnsUsername } from "components/common/ens-username";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { SwitchToNetworkButton } from "components/common/switch-to-network-button";

type Props = {
  network?: EVM_NETWORK_KEYS;
  size?: ButtonProps["size"];
};

export const ButtonConnectWallet = ({ network, size }: Props) => {
  const { id: activeChainId } = getActiveChainFromNetworkKey(network);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        const isWrongNetwork = !!activeChainId && chain?.id !== activeChainId;

        if (!connected) {
          return (
            <Button
              data-name="button-connect-wallet"
              onClick={openConnectModal}
              size={size}
              variant={"solid"}
              colorScheme={"pinkPurpleFaintGradient"}
            >
              Connect Wallet
            </Button>
          );
        }

        if (isWrongNetwork) {
          return <SwitchToNetworkButton network={network} size={size} />;
        }

        if (account) {
          return (
            <Button
              onClick={openAccountModal}
              colorScheme={"pinkDark"}
              variant={"outline"}
              size={size}
            >
              <EnsUsername
                address={account.address as EthereumAddress}
                shorten
              />
            </Button>
          );
        }

        return null;
      }}
    </ConnectButton.Custom>
  );
};
