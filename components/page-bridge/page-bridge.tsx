import React from "react";
import { Flex, Image, VStack } from "@chakra-ui/react";
import { Page } from "components/app/page";
import { ButtonConnectWallet } from "components/common/button-connect-wallet";
import { XChainWidget } from "components/page-home/x-chain-widget/x-chain-widget";
import { GradientGraphicHeading } from "components/common/gradient-graphic-heading/gradient-graphic-heading";

export const PageBridge = () => (
  <Page>
    <VStack
      align={"center"}
      justify={"center"}
      w={"100%"}
      data-name="page-home"
      gap={10}
    >
      <GradientGraphicHeading
        image={<Image src={"/static/images/blockchain-gateway.webp"} />}
      >
        Transfer $RMRK to another chain
      </GradientGraphicHeading>
      <Flex direction={"column"} maxW={"392px"} w={"100%"}>
        <ButtonConnectWallet size={"md"} />
      </Flex>
      <Flex direction={"column"} maxW={"600px"} w={"100%"}>
        <XChainWidget />
      </Flex>
    </VStack>
  </Page>
);
