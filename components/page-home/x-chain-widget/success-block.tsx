import React from "react";
import { Box, Button, Flex, Image, VStack } from "@chakra-ui/react";
import { AxelarAccountBlockScan } from "components/page-home/axelar-account-block-scan";
import { EthereumAddress } from "lib/evm/types";
import { AXELAR_FINALITY_ESTIMATES } from "lib/evm/constants";
import { AxelarNetworks } from "lib/app/types";

type Props = {
  network: AxelarNetworks | undefined;
  address: EthereumAddress | undefined;
  setIsTransferInitiated: (isTransferInitiated: boolean) => void;
};

export const SuccessBlock = ({
  network,
  address,
  setIsTransferInitiated,
}: Props) => {
  const time = network
    ? AXELAR_FINALITY_ESTIMATES[network].finalityTime
    : undefined;

  return (
    <VStack gap={4}>
      <VStack gap={0}>
        <Image
          src={"/static/images/transfer-success.svg"}
          maxW={"516px"}
          w={"100%"}
        />
        <Box
          fontSize={"lg"}
          fontWeight={"bold"}
          lineHeight={7}
          color={"gray.50"}
          textAlign={"center"}
        >
          Transfer successfully initiated
        </Box>
      </VStack>
      <Flex align={"center"} justify={"center"} flexWrap={"wrap"} gap={1}>
        <Box fontSize={"xs"} color={"gray.400"} fontWeight={"medium"}>
          Please wait ~{time} to complete transfer.
        </Box>
        {address && <AxelarAccountBlockScan address={address} />}
      </Flex>
      <Button
        onClick={() => setIsTransferInitiated(false)}
        mt={2}
        colorScheme={"pinkPurpleGradient"}
        maxW={"200px"}
        w={"100%"}
      >
        Transfer again
      </Button>
    </VStack>
  );
};
