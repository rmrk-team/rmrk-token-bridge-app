import React, { useState, useEffect } from "react";
import { Box, Flex, Input, VStack } from "@chakra-ui/react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { ChainTokens } from "lib/evm/types";
import { TokenBalance } from "components/page-home/balances-section/token-balance";
import { IconDoubleArrowDown } from "components/common/icons/icon-double-arrow-down";
import { BorderedSectionContainer } from "components/common/bordered-section-container";
import { useSwapperMinterLastMigration } from "lib/evm/hooks/swapper-minter";
import { blockExplorers } from "lib/common/constants/block-explorers";
import { newRmrkNetworkTokens, oldRmrkNetworkTokens } from "lib/evm/constants";
import dynamic from "next/dynamic";
import { MigrateButton } from "components/page-home/balances-section/migrate-button/migrate-button";
import { SwapButton } from "components/page-home/balances-section/swap-button/swap-button";
import { useErc20Balance } from "lib/evm/hooks";

const MoonriverMigrationNote = dynamic(
  () =>
    import(
      "components/page-home/balances-section/moonriver-last-migration-note"
    ).then((mod) => mod.MoonriverLastMigrationNote),
  {
    ssr: false,
  }
);

type Props = {
  network: EVM_NETWORK_KEYS;
  currencies: ChainTokens;
  isMoonriverMigrator: boolean;
};

export const NetworkBalance = ({
  network,
  currencies,
  isMoonriverMigrator,
}: Props) => {
  const [migrateCount, setMigrateCount] = useState<number>(0);
  const [amount, setAmount] = useState<string>();

  const tokenAddress = oldRmrkNetworkTokens[network].address;

  const { data: erc20Balance } = useErc20Balance({
    network,
    tokenAddress,
  });

  useEffect(() => {
    if (erc20Balance) {
      setAmount(erc20Balance.formatted);
    }
  }, [erc20Balance?.value]);

  const { lastMigrationParsed, isLoading: isLoadingLastMigrationParsed } =
    useSwapperMinterLastMigration({
      network: isMoonriverMigrator ? EVM_NETWORK_KEYS.moonbeam : network,
    });

  return (
    <BorderedSectionContainer
      as={VStack}
      data-name="network-balance"
      align={"stretch"}
      gap={8}
      px={6}
      pt={6}
      pb={8}
    >
      <Flex gap={3} justify={"space-evenly"} direction={["column", "row"]}>
        <Flex flexDirection={"column"} flexGrow={1} w={"100%"}>
          <TokenBalance
            network={network}
            tokenAddress={currencies.legacyToken.address}
            balanceChangeTicker={migrateCount}
            blockExplorerUrl={`${blockExplorers[network]}/address/${currencies.legacyToken.address}`}
            isFrom
          />
        </Flex>
        <Flex
          align={"center"}
          justify={"center"}
          color={"gray.500"}
          transform={[null, "rotate(-90deg)"]}
          fontSize={"20px"}
        >
          <IconDoubleArrowDown />
        </Flex>
        <Flex flexDirection={"column"} flexGrow={1} w={"100%"}>
          <TokenBalance
            network={network}
            tokenAddress={currencies.legacyToken.address}
            balanceChangeTicker={migrateCount}
            blockExplorerUrl={`${
              blockExplorers[
                isMoonriverMigrator ? EVM_NETWORK_KEYS.moonbeam : network
              ]
            }/address/${
              isMoonriverMigrator
                ? newRmrkNetworkTokens.moonbeam.address
                : currencies.newToken.address
            }`}
            customLabel={
              isMoonriverMigrator ? "To $RMRK (on Moonbeam)" : "To $RMRK"
            }
          />
        </Flex>
      </Flex>
      <TokenBalance
        network={isMoonriverMigrator ? EVM_NETWORK_KEYS.moonbeam : network}
        tokenAddress={
          isMoonriverMigrator
            ? newRmrkNetworkTokens[EVM_NETWORK_KEYS.moonbeam].address
            : currencies.newToken.address
        }
        balanceChangeTicker={migrateCount}
        blockExplorerUrl={`${
          blockExplorers[
            isMoonriverMigrator ? EVM_NETWORK_KEYS.moonbeam : network
          ]
        }/address/${
          isMoonriverMigrator
            ? newRmrkNetworkTokens[EVM_NETWORK_KEYS.moonbeam].address
            : currencies.newToken.address
        }`}
        customLabel={
          isMoonriverMigrator ? "RMRK balance (on Moonbeam)" : "RMRK balance"
        }
      />
      {/*<VStack align={"stretch"}>*/}
      {/*  <Box fontSize={"xs"} fontWeight={"semibold"} color={"gray.400"}>*/}
      {/*    Enter amount to swap*/}
      {/*  </Box>*/}
      {/*  <Input*/}
      {/*    type={"number"}*/}
      {/*    value={amount}*/}
      {/*    onChange={(e) => setAmount(e.target.value)}*/}
      {/*  />*/}
      {/*</VStack>*/}
      {isMoonriverMigrator &&
        !!lastMigrationParsed &&
        !isLoadingLastMigrationParsed && (
          <MoonriverMigrationNote lastMigration={lastMigrationParsed} />
        )}

      <Flex direction={"column"} alignItems={"center"}>
        {isMoonriverMigrator ? (
          <MigrateButton
            network={network}
            amount={amount}
            onMigrationSuccess={() => setMigrateCount(migrateCount + 1)}
          />
        ) : (
          <SwapButton
            network={network}
            amount={amount}
            onSwapSuccess={() => setMigrateCount(migrateCount + 1)}
          />
        )}
      </Flex>
    </BorderedSectionContainer>
  );
};
