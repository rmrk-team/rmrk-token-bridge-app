import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Link,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { useErc20Balance, useErc20IsSuffiecientAllowance } from "lib/evm/hooks";
import { EVM_RMRK_CONTRACTS, oldRmrkNetworkTokens } from "lib/evm/constants";
import { ApproveErc20Button } from "components/common/approve-erc20-button";
import { useMoonriverMigratorMigrate } from "lib/evm/hooks/moonriver-migrator";
import { parseUnits } from "viem";
import { Hash } from "viem/types/misc";
import { blockExplorers } from "lib/common/constants/block-explorers";
import { isZero } from "lib/common/utils";
import { ActionContainer } from "components/page-home/balances-section/action-container";
import { Bold } from "components/common/bold";
import { RiExternalLinkFill } from "@react-icons/all-files/ri/RiExternalLinkFill";

type Props = {
  network: EVM_NETWORK_KEYS;
  onMigrationSuccess?: () => void;
  amount: string | undefined;
};

export const MigrateButtonAction = ({
  network,
  amount,
  onMigrationSuccess,
}: Props) => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const toast = useToast({
    duration: 10000,
  });

  const { address: tokenAddress } = oldRmrkNetworkTokens[network];
  const { data: oldErc20Balance } = useErc20Balance({
    tokenAddress,
    network,
  });

  const isDisabled = !amount || isZero(parseFloat(amount));
  const allowedAddress = EVM_RMRK_CONTRACTS[network].moonriverMigrator;
  const parsedAmount =
    oldErc20Balance && amount
      ? parseUnits(amount, oldErc20Balance?.decimals)
      : undefined;

  const migrateBalance = `${amount ? `${amount} ` : ""}${
    oldErc20Balance?.symbol
  }`;

  const { isSufficientAllowance, refetch: refetchIsSufficientAllowance } =
    useErc20IsSuffiecientAllowance({
      tokenAddress,
      network,
      requiredAllowance: parsedAmount,
      allowedAddress,
    });

  const onSuccess = (data: unknown) => {
    const txData = data as { transactionHash: Hash };

    toast({
      title: `${migrateBalance} RMRK migrated to Moonbeam`,
      description: (
        <VStack align={"stretch"} gap={2}>
          <Box>Check in monday to see your tokens on Moonbeam network.</Box>
          <Link
            href={`${blockExplorers[EVM_NETWORK_KEYS.moonriver]}/tx/${
              txData.transactionHash
            }`}
            fontWeight={"bold"}
            isExternal
          >
            Tx Hash: {txData.transactionHash}{" "}
            <Box display={"inline-block"}>
              <RiExternalLinkFill />
            </Box>
          </Link>
        </VStack>
      ),
      status: "success",
      position: "top",
      isClosable: true,
      duration: null,
    });
    onMigrationSuccess?.();
  };

  const onError = () => {
    toast({
      title: `Migration failed`,
      description: "Migration to Moonbeam failed.",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
  };

  const { migrate, isLoading: isLoadingMigrate } = useMoonriverMigratorMigrate({
    amount: parsedAmount,
    network,
    enabled: isSufficientAllowance,
    onSuccess,
    onError,
  });

  return isSufficientAllowance || isDisabled ? (
    <VStack>
      <ActionContainer>
        <Button
          isDisabled={isDisabled || !isAgreed}
          onClick={migrate}
          isLoading={isLoadingMigrate}
          colorScheme={"pinkPurpleGradient"}
        >
          Migrate {migrateBalance}
        </Button>
      </ActionContainer>

      <Checkbox
        colorScheme={"pink"}
        size={"lg"}
        gap={1}
        w={"100%"}
        onChange={() => setIsAgreed(!isAgreed)}
        isChecked={isAgreed}
      >
        <Box fontSize={"sm"} color={"gray.400"} fontWeight={"semibold"}>
          I understand that my $xcRMRK balance will migrate from{" "}
          <Bold>Moonriver</Bold> to <Bold>Moonbeam</Bold> as $RMRK
        </Box>
      </Checkbox>
    </VStack>
  ) : (
    <ActionContainer>
      <ApproveErc20Button
        tokenAddress={tokenAddress}
        allowedAddress={allowedAddress}
        network={network}
        approveAmount={parsedAmount}
        onSuccess={() => refetchIsSufficientAllowance()}
      />
    </ActionContainer>
  );
};
