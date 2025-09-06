import React, { useEffect } from "react";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Link,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { EthereumAddress } from "lib/evm/types";
import { useErc20Balance } from "lib/evm/hooks";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { formatBalanceToReadable } from "lib/common/utils";
import { Label } from "components/common/inputs/label";
import { IconBlockExplorer } from "components/common/icons/icon-block-explorer";
import { WebUrl } from "lib/app/types";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  tokenAddress: EthereumAddress | undefined;
  balanceChangeTicker: number | undefined;
  isFrom?: boolean;
  customLabel?: string;
  blockExplorerUrl: WebUrl;
};

export const TokenBalance = ({
  network,
  tokenAddress,
  balanceChangeTicker,
  isFrom,
  customLabel,
  blockExplorerUrl,
}: Props) => {
  const {
    data: erc20Balance,
    isLoading,
    refetch,
  } = useErc20Balance({
    tokenAddress,
    network,
  });

  useEffect(() => {
    refetch();
  }, [balanceChangeTicker]);

  const label =
    customLabel ||
    (isFrom
      ? `From $${erc20Balance?.symbol || "xcRMRK"}`
      : `To $${erc20Balance?.symbol || "RMRK"}`);

  const balance = erc20Balance?.formatted;

  const isZeroBalance = Number(balance) === 0;

  return isLoading ? (
    <Center h={"80px"}>
      <Spinner />
    </Center>
  ) : (
    <VStack
      data-name="token-balance"
      align={"stretch"}
      gap={1}
      p={4}
      borderWidth={"1px"}
      borderStyle={"solid"}
      borderColor={"gray.500"}
      borderRadius={"xl"}
    >
      <Label>
        <Flex align={"center"} gap={1}>
          {label}{" "}
          <Link href={blockExplorerUrl} isExternal>
            <IconButton
              aria-label="See on block explorer"
              icon={<IconBlockExplorer />}
              size={"xs"}
              fontSize={""}
            />
          </Link>
        </Flex>
      </Label>
      <Box
        fontSize={"lg"}
        fontWeight={"bold"}
        color={isZeroBalance ? "gray.500" : "gray.50"}
      >
        {balance ? formatBalanceToReadable(balance) : "0"}
      </Box>
    </VStack>
  );
};
