import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { AXELAR_FINALITY_ESTIMATES } from "lib/evm/constants";
import { AxelarNetworks } from "lib/app/types";

type Props = {
  network: AxelarNetworks | undefined;
};

export const TxLengthInfo = ({ network }: Props) => {
  if (!network) return null;

  const time = AXELAR_FINALITY_ESTIMATES[network].finalityTime;

  return (
    <Flex
      align={"center"}
      justify={"center"}
      flexWrap={"wrap"}
      gap={1}
      data-name="tx-init-info"
      fontSize={"xs"}
      color={"gray.400"}
      fontWeight={"medium"}
    >
      <Box>~{time} to complete transfer.</Box>
    </Flex>
  );
};
