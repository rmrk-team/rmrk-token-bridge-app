import React from "react";
import { Box, Button, Link, useToast, VStack } from "@chakra-ui/react";
import {
  useErc20InterchainTransfer,
  useErc20IsSuffiecientBalance,
} from "lib/evm/hooks";
import { useAccount } from "wagmi";
import { AxelarNetworks } from "lib/app/types";
import { AXELAR_BLOCK_SCANNER_BASE_URL } from "lib/axelar/constants";
import { Hash } from "viem/types/misc";
import { useAxelarEstimateFee } from "lib/axelar/hooks";
import { newRmrkNetworkTokens } from "lib/evm/constants";
import { RiExternalLinkFill } from "@react-icons/all-files/ri/RiExternalLinkFill";

type Props = {
  sourceNetwork: AxelarNetworks | undefined;
  destinationNetwork: AxelarNetworks | undefined;
  transferAmount: string | undefined;
  onResolve: (transferred: boolean) => void;
  isDisabled?: boolean;
};

export const XChainTransferButton = ({
  sourceNetwork,
  destinationNetwork,
  transferAmount,
  onResolve,
  isDisabled = false,
}: Props) => {
  const { address } = useAccount();

  const rmrkTokenAddress = destinationNetwork
    ? newRmrkNetworkTokens[destinationNetwork].address
    : undefined;

  const { isSufficientBalance } = useErc20IsSuffiecientBalance({
    tokenAddress: rmrkTokenAddress,
    requiredBalance: transferAmount,
    network: sourceNetwork,
  });

  const toast = useToast({
    duration: 10000,
  });

  const { estimateFee } = useAxelarEstimateFee({
    sourceNetwork,
    destinationNetwork,
  });

  const isEnabled =
    !isDisabled &&
    isSufficientBalance &&
    !!address &&
    !!sourceNetwork &&
    !!transferAmount &&
    !!parseFloat(transferAmount) &&
    !!destinationNetwork &&
    sourceNetwork !== destinationNetwork;

  const { interchainTransfer, isLoading: isInterchainTransferLoading } =
    useErc20InterchainTransfer({
      network: sourceNetwork,
      destinationNetwork: destinationNetwork,
      recipient: address,
      amount: transferAmount,
      payableAmount: estimateFee,
      enabled: isEnabled,

      onSuccess: (data) => {
        const txData = data as { transactionHash: Hash };

        if (txData) {
          toast({
            title: `${transferAmount} RMRK transferred`,
            description: (
              <VStack align={"stretch"} gap={2}>
                <Box>
                  Check status on{" "}
                  <Link
                    isExternal
                    href={`${AXELAR_BLOCK_SCANNER_BASE_URL}/gmp/${txData.transactionHash}`}
                    fontWeight={"bold"}
                    textDecoration={"underline"}
                  >
                    Axelarscan
                  </Link>
                </Box>
                <Link
                  href={`${AXELAR_BLOCK_SCANNER_BASE_URL}/gmp/${txData.transactionHash}`}
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
          onResolve(true);
        }
      },
      onError: (error) => {
        if (error) {
          toast({
            title: `Error`,
            description: error.shortMessage,
            status: "error",
            position: "top",
            isClosable: true,
            duration: 5000,
          });
        }
      },
    });

  return (
    <Button
      onClick={interchainTransfer}
      colorScheme={"pinkPurpleGradient"}
      data-name="x-chain-transfer-button"
      isDisabled={!isEnabled}
      isLoading={isInterchainTransferLoading}
    >
      Transfer
    </Button>
  );
};
