import React from "react";
import { Flex } from "@chakra-ui/react";
import { AxelarAccountBlockScan } from "components/page-home/axelar-account-block-scan";
import { RiHistoryFill } from "@react-icons/all-files/ri/RiHistoryFill";
import { EthereumAddress } from "lib/evm/types";

type Props = {
  address: EthereumAddress;
};

export const ViewHistory = ({ address }: Props) => (
  <AxelarAccountBlockScan address={address}>
    <Flex fontSize={"sm"}>
      <RiHistoryFill />
    </Flex>
    View transaction history
  </AxelarAccountBlockScan>
);
