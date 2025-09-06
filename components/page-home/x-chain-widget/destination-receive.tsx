import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Label } from "components/common/inputs/label";
import { useErc20TokenInfo } from "lib/evm/hooks";
import { AxelarNetworks } from "lib/app/types";
import { newRmrkNetworkTokens } from "lib/evm/constants";
import { formatBalanceToReadable } from "lib/common/utils";

type Props = {
  transferAmount: string | undefined;
  destinationNetwork: AxelarNetworks | undefined;
};

export const DestinationReceive = ({
  transferAmount,
  destinationNetwork,
}: Props) => {
  if (!destinationNetwork) return null;

  const tokenAddress = destinationNetwork
    ? newRmrkNetworkTokens[destinationNetwork].address
    : undefined;

  const { tokenInfo } = useErc20TokenInfo({
    tokenAddress,
    network: destinationNetwork,
  });

  return (
    <VStack data-name="destination-receive" align={"flex-start"} gap={1}>
      <Label>Receive</Label>
      <Box
        color={"gray.400"}
        fontWeight={"bold"}
        fontSize={"md"}
        lineHeight={6}
      >
        {formatBalanceToReadable(transferAmount || "0")} ${tokenInfo?.symbol}
      </Box>
    </VStack>
  );
};
