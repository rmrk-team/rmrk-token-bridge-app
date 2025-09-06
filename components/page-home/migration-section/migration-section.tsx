import React, { useState } from "react";
import { Heading, VStack } from "@chakra-ui/react";
import { supportedCurrencies } from "lib/evm/constants";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { NetworkBalance } from "components/page-home/balances-section/network-balance";
import { NetworkSelection } from "components/page-home/migration-section/network-selection";

const NETWORK_LIST: EVM_NETWORK_KEYS[] = [
  EVM_NETWORK_KEYS.moonriver,
  EVM_NETWORK_KEYS.ethereum,
  EVM_NETWORK_KEYS.polygon,
  EVM_NETWORK_KEYS.moonbeam,
];

export const MigrationSection = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<EVM_NETWORK_KEYS>(
    EVM_NETWORK_KEYS.moonriver
  );

  return (
    <VStack data-name="migration-section" align={"stretch"} gap={5}>
      <VStack data-name="migration-section" align={"stretch"} gap={2}>
        <Heading
          as={"h2"}
          color={"whiteAlpha.700"}
          fontSize={"lg"}
          fontWeight={"bold"}
          lineHeight={7}
        >
          Choose where to swap your tokens
        </Heading>
        <NetworkSelection
          networkList={NETWORK_LIST}
          onChange={setSelectedNetwork}
        />
      </VStack>
      <NetworkBalance
        key={`network-balance-${selectedNetwork}`}
        network={selectedNetwork}
        currencies={supportedCurrencies[selectedNetwork]}
        isMoonriverMigrator={selectedNetwork === EVM_NETWORK_KEYS.moonriver}
      />
    </VStack>
  );
};
