import React, { ReactNode } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { EthereumAddress } from "lib/evm/types";
import { AXELAR_BLOCK_SCANNER_BASE_URL } from "lib/axelar/constants";
import { RiExternalLinkFill } from "@react-icons/all-files/ri/RiExternalLinkFill";

type Props = {
  address: EthereumAddress;
  children?: ReactNode;
};

export const AxelarAccountBlockScan = ({ address, children }: Props) => (
  <Link
    href={`${AXELAR_BLOCK_SCANNER_BASE_URL}/address/${address}?tab=general_message_passing`}
    isExternal
    color={"pink.500"}
    fontSize={"xs"}
    lineHeight={4}
    fontWeight={"semibold"}
  >
    <Flex align={"center"} gap={1}>
      {children || <>Check transactions on explorer</>}{" "}
      <Flex display={"inline-flex"} fontSize={"sm"}>
        <RiExternalLinkFill />
      </Flex>
    </Flex>
  </Link>
);
