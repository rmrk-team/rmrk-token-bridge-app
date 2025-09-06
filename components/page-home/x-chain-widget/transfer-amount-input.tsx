import React from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import { Label } from "components/common/inputs/label";
import { InputError } from "components/common/inputs/input-error";
import { useErc20Balance, useErc20IsSuffiecientBalance } from "lib/evm/hooks";
import { AxelarNetworks } from "lib/app/types";
import { getRmrkAddressFromNetworkKey } from "lib/evm/utils";

type Props = {
  sourceNetwork: AxelarNetworks | undefined;
  transferAmount: string | undefined;
  setTransferAmount: (transferAmount: string) => void;
};

export const TransferAmountInput = ({
  sourceNetwork,
  transferAmount,
  setTransferAmount,
}: Props) => {
  const rmrkAddress = getRmrkAddressFromNetworkKey({
    network: sourceNetwork,
  });

  const { data: erc20Balance } = useErc20Balance({
    tokenAddress: rmrkAddress,
    network: sourceNetwork,
  });

  const { isSufficientBalance } = useErc20IsSuffiecientBalance({
    network: sourceNetwork,
    tokenAddress: rmrkAddress,
    requiredBalance: transferAmount,
  });

  const isExceedingBalance = transferAmount && !isSufficientBalance;

  const setToMax = () => {
    if (erc20Balance) {
      setTransferAmount(erc20Balance.formatted);
    }
  };

  return (
    <VStack align={"stretch"} gap={1} data-name="transfer-amount-input">
      <Label>Transfer</Label>
      <HStack gap={3} align={"center"}>
        <InputGroup opacity={sourceNetwork ? 1 : 0.5}>
          <Input
            type={"number"}
            placeholder="0"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            isDisabled={!sourceNetwork}
            borderColor={"gray.500"}
            borderRight={"none"}
            px={3}
            fontSize={"sm"}
            h={"34px"}
            fontWeight={"medium"}
            lineHeight={"34px"}
            _disabled={{
              borderColor: "gray.500",
            }}
          />
          <InputRightAddon
            backgroundColor={"transparent"}
            borderColor={"gray.500"}
            borderLeft={"none"}
            h={"34px"}
          >
            <Button
              size={"xs"}
              variant={"outline-angular"}
              colorScheme={"pinkDark"}
              onClick={setToMax}
              isDisabled={!sourceNetwork}
            >
              max
            </Button>
          </InputRightAddon>
        </InputGroup>
        <Box
          color={"gray.50"}
          fontSize={"sm"}
          lineHeight={5}
          fontWeight={"semibold"}
        >
          ${sourceNetwork ? erc20Balance?.symbol : "RMRK"}
        </Box>
      </HStack>
      {isExceedingBalance && <InputError>Insufficient balance</InputError>}
    </VStack>
  );
};
