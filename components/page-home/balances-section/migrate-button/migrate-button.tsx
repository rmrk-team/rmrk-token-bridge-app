import React from "react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { ActionNetworkAndConnectResolver } from "components/common/action-network-and-connect-resolver";
import { MigrateButtonAction } from "components/page-home/balances-section/migrate-button/migrate-button-action";

type Props = {
  network: EVM_NETWORK_KEYS;
  onMigrationSuccess: () => void;
  amount: string | undefined;
};

export const MigrateButton = ({
  network,
  amount,
  onMigrationSuccess,
}: Props) => (
  <ActionNetworkAndConnectResolver network={network}>
    <MigrateButtonAction
      amount={amount}
      network={network}
      onMigrationSuccess={onMigrationSuccess}
    />
  </ActionNetworkAndConnectResolver>
);
