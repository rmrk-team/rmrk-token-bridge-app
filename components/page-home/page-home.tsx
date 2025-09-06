import React from "react";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { Page } from "components/app/page";
import { ButtonConnectWallet } from "components/common/button-connect-wallet";
import { GradientGraphicHeading } from "components/common/gradient-graphic-heading/gradient-graphic-heading";
import { MigrationSection } from "components/page-home/migration-section/migration-section";
import { FaqSection } from "components/page-home/faq-section/faq-section";
import { Bold } from "components/common/bold";

export const PageHome = () => (
  <Page>
    <VStack
      align={"stretch"}
      justify={"center"}
      w={"100%"}
      data-name="page-home"
      gap={10}
    >
      <VStack align={"stretch"} gap={4}>
        <GradientGraphicHeading
          image={<Image src={"/static/images/crypto-transfer-1.webp"} />}
        >
          Swap Tokens
        </GradientGraphicHeading>
        <Box fontSize={"sm"} lineHeight={5} color={"gray.100"}>
          You can <Bold>replace</Bold> your xcRMRK balance with the new RMRK
          token balance using this Swap tab. Replacing the balance on Moonriver
          will also migrate tokens to Moonbeam. Replacing the balance on any
          other chain will do so on that chain.
          <br />
          You will end up with a balance of new RMRK tokens, which you can then
          move across chains using the second tab above -{" "}
          <Bold>Cross Chain transfers</Bold>.
        </Box>
      </VStack>
      <Flex justify={"center"}>
        <Flex direction={"column"} maxW={"392px"} w={"100%"}>
          <ButtonConnectWallet size={"md"} />
        </Flex>
      </Flex>
      <MigrationSection />
      <FaqSection />
    </VStack>
  </Page>
);
