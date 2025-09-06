import React from "react";
import { Box } from "@chakra-ui/react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { useErc20Balance } from "lib/evm/hooks";
import { formatBalanceToReadable } from "lib/common/utils";
import { newRmrkNetworkTokens } from "lib/evm/constants";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
};

export const ChainBalance = ({ network }: Props) => {
  const rmrkAddress = network
    ? newRmrkNetworkTokens[network].address
    : undefined;

  const { data: erc20Balance } = useErc20Balance({
    tokenAddress: rmrkAddress,
    network,
  });

  return (
    <Box
      data-name="source-chain-balance"
      color={"gray.400"}
      fontSize={"xs"}
      fontWeight={"medium"}
      lineHeight={4}
    >
      Balance:{" "}
      {erc20Balance
        ? `${formatBalanceToReadable(erc20Balance?.formatted || "")} ${
            erc20Balance?.symbol
          }`
        : "-"}
    </Box>
  );
};
