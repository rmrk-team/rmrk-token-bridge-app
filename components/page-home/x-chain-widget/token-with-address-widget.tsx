import React from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { Label } from "components/common/inputs/label";
import { CircledNetworkIcon } from "components/common/circled-network-icon";
import copy from "copy-to-clipboard";
import { supportedCurrencies } from "lib/evm/constants";
import { shortenAccountId } from "lib/app/utils";
import { IoMdCopy } from "@react-icons/all-files/io/IoMdCopy";

type Props = {
  network: EVM_NETWORK_KEYS;
};

export const TokenWithAddressWidget = ({ network }: Props) => {
  const toast = useToast({
    duration: 3000,
  });

  const tokenAddress = supportedCurrencies[network].newToken.address;

  const onClick = () => {
    copy(tokenAddress);
    toast({
      title: `Token address copied`,
      status: "success",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <Flex
      data-name="token-with-address-widget"
      justify={"space-between"}
      align={"center"}
    >
      <Flex align={"center"} gap={3}>
        <Label>Transfer</Label>
        <Flex
          color={"gray.50"}
          fontSize={"sm"}
          fontWeight={"semibold"}
          lineHeight={5}
          gap={1}
        >
          <CircledNetworkIcon network={network} />
          $RMRK
        </Flex>
      </Flex>
      <Button
        onClick={onClick}
        variant={"unstyled"}
        color={"gray.400"}
        fontSize={"xs"}
        fontWeight={"semibold"}
        lineHeight={4}
        display={"flex"}
      >
        Token Address: {shortenAccountId(tokenAddress, true)}
        &nbsp;
        <Box fontSize={"sm"}>
          <IoMdCopy />
        </Box>
      </Button>
    </Flex>
  );
};
