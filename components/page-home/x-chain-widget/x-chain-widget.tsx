import React, { useEffect, useState } from "react";
import { Box, Center, Flex, VStack } from "@chakra-ui/react";
import { XChainTransferButton } from "components/page-home/x-chain-widget/x-chain-transfer-button";
import { AxelarNetworks } from "lib/app/types";
import { useAccount } from "wagmi";
import { ActionNetworkAndConnectResolver } from "components/common/action-network-and-connect-resolver";
import { ChainSelectionSection } from "components/page-home/x-chain-widget/chain-selection-section/chain-selection-section";
import { BorderedSectionContainer } from "components/common/bordered-section-container";
import { IconDoubleArrowDown } from "components/common/icons/icon-double-arrow-down";
import { TokenWithAddressWidget } from "components/page-home/x-chain-widget/token-with-address-widget";
import { ChainBalance } from "components/page-home/x-chain-widget/chain-balance";
import { SuccessBlock } from "components/page-home/x-chain-widget/success-block";
import { ViewHistory } from "components/page-home/x-chain-widget/view-history";
import { TransferAmountInput } from "components/page-home/x-chain-widget/transfer-amount-input";
import { TxLengthInfo } from "components/page-home/x-chain-widget/tx-length-info";
import { DestinationReceive } from "components/page-home/x-chain-widget/destination-receive";
import { TxFeeInfo } from "components/page-home/x-chain-widget/tx-fee-info";

export const XChainWidget = () => {
  const [isTransferInitiated, setIsTransferInitiated] = useState(false);
  const { address } = useAccount();

  const [sourceNetwork, setSourceNetwork] = useState<
    AxelarNetworks | undefined
  >();

  const [destinationNetwork, setDestinationNetwork] = useState<
    AxelarNetworks | undefined
  >();

  const [transferAmount, setTransferAmount] = useState<string>("0");

  useEffect(() => {
    setTransferAmount("0");
  }, [sourceNetwork]);

  return (
    <Box data-name="x-chain-widget">
      {isTransferInitiated ? (
        <SuccessBlock
          network={sourceNetwork}
          address={address}
          setIsTransferInitiated={setIsTransferInitiated}
        />
      ) : (
        <VStack align={"stretch"} gap={4}>
          {address && (
            <Flex justify={"flex-end"}>
              <ViewHistory address={address} />
            </Flex>
          )}
          <VStack align={"stretch"} gap={8}>
            {sourceNetwork && (
              <BorderedSectionContainer p={4}>
                <TokenWithAddressWidget network={sourceNetwork} />
              </BorderedSectionContainer>
            )}
            <VStack align={"stretch"} gap={3}>
              <BorderedSectionContainer p={4}>
                <VStack align={"stretch"} gap={5}>
                  <ChainSelectionSection
                    isFrom
                    name={"source-network"}
                    onChange={setSourceNetwork}
                  />
                  <VStack align={"stretch"} gap={3}>
                    <TransferAmountInput
                      sourceNetwork={sourceNetwork}
                      transferAmount={transferAmount}
                      setTransferAmount={setTransferAmount}
                    />
                    {!!address && !!sourceNetwork && (
                      <ChainBalance network={sourceNetwork} />
                    )}
                  </VStack>
                </VStack>
              </BorderedSectionContainer>
              <Center color={"gray.500"} fontSize={"md"}>
                <IconDoubleArrowDown />
              </Center>
              <VStack align={"stretch"} gap={2}>
                <BorderedSectionContainer p={4}>
                  <VStack align={"stretch"} gap={5}>
                    <ChainSelectionSection
                      name={"destination-network"}
                      onChange={setDestinationNetwork}
                    />

                    <DestinationReceive
                      transferAmount={transferAmount}
                      destinationNetwork={destinationNetwork}
                    />
                  </VStack>
                </BorderedSectionContainer>
                <TxFeeInfo
                  sourceNetwork={sourceNetwork}
                  destinationNetwork={destinationNetwork}
                />
              </VStack>
            </VStack>
            <Flex direction={"column"} pt={8} pb={4} w={"100%"}>
              <ActionNetworkAndConnectResolver network={sourceNetwork}>
                <VStack gap={2}>
                  <Flex direction={"column"} w={"100%"}>
                    <XChainTransferButton
                      transferAmount={transferAmount}
                      sourceNetwork={sourceNetwork}
                      destinationNetwork={destinationNetwork}
                      onResolve={setIsTransferInitiated}
                    />
                  </Flex>
                  <TxLengthInfo network={sourceNetwork} />
                </VStack>
              </ActionNetworkAndConnectResolver>
            </Flex>
          </VStack>
        </VStack>
      )}
    </Box>
  );
};
