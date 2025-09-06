import React from "react";
import { Flex } from "@chakra-ui/react";
import { AxelarNetworks } from "lib/app/types";
import { useAxelarEstimateFee } from "lib/axelar/hooks";
import { Label } from "components/common/inputs/label";

type Props = {
  sourceNetwork: AxelarNetworks | undefined;
  destinationNetwork: AxelarNetworks | undefined;
};

export const TxFeeInfo = ({ sourceNetwork, destinationNetwork }: Props) => {
  const { parsedEstimateFee, symbol } = useAxelarEstimateFee({
    sourceNetwork,
    destinationNetwork,
  });

  return parsedEstimateFee ? (
    <Flex data-name="tx-init-info" align={"center"} flexWrap={"wrap"} gap={1}>
      <Label>Estimated fee:</Label>
      <Flex fontSize={"xs"} color={"gray.400"} fontWeight={"medium"}>
        ~{parseFloat(parsedEstimateFee).toFixed(8)} {symbol}
      </Flex>
    </Flex>
  ) : null;
};
