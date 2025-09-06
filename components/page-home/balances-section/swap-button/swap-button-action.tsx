import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { useErc20Balance, useErc20IsSuffiecientAllowance } from "lib/evm/hooks";
import { EVM_RMRK_CONTRACTS, oldRmrkNetworkTokens } from "lib/evm/constants";
import { ApproveErc20Button } from "components/common/approve-erc20-button";
import { useSwapperMinterSwapLegacyRemark } from "lib/evm/hooks/swapper-minter";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";
import { isZero } from "lib/common/utils";
import { ActionContainer } from "components/page-home/balances-section/action-container";

type Props = {
  network: EVM_NETWORK_KEYS;
  onSwapSuccess?: () => void;
  amount: string | undefined;
};

export const SwapButtonAction = ({ network, onSwapSuccess, amount }: Props) => {
  const toast = useToast({
    duration: 10000,
  });

  const { address: tokenAddress } = oldRmrkNetworkTokens[network];
  const { data: oldErc20Balance } = useErc20Balance({
    tokenAddress,
    network,
  });

  const isDisabled = !amount || isZero(parseFloat(amount));
  const allowedAddress = EVM_RMRK_CONTRACTS[network].swapperMinter;
  const { address } = useAccount();

  const swapBalance = `${amount ? `${amount} ` : ""}${oldErc20Balance?.symbol}`;

  const parsedAmount =
    oldErc20Balance && amount
      ? parseUnits(amount, oldErc20Balance?.decimals)
      : undefined;

  const { isSufficientAllowance, refetch: refetchIsSufficientAllowance } =
    useErc20IsSuffiecientAllowance({
      tokenAddress,
      network,
      requiredAllowance: parsedAmount,
      allowedAddress,
    });

  const onSuccess = () => {
    toast({
      title: `${oldErc20Balance?.formatted} ${oldErc20Balance?.symbol} swapped to RMRK`,
      status: "success",
      position: "top",
      isClosable: true,
    });
    onSwapSuccess?.();
  };

  const onError = () => {
    toast({
      title: `Swap failed`,
      description: "Swap of xcRMRK to RMRK failed.",
      status: "error",
      position: "top",
      isClosable: true,
    });
  };

  const { swapLegacyRmrk, isLoading: isLoadingSwapLegacyRmrk } =
    useSwapperMinterSwapLegacyRemark({
      toAddress: address,
      amount: parsedAmount,
      network,
      enabled: isSufficientAllowance,
      onSuccess,
      onError,
    });

  return (
    <ActionContainer>
      {isSufficientAllowance || isDisabled ? (
        <Button
          isDisabled={isDisabled}
          onClick={swapLegacyRmrk}
          isLoading={isLoadingSwapLegacyRmrk}
          colorScheme={"pinkPurpleGradient"}
        >
          Swap {swapBalance}
        </Button>
      ) : (
        <ApproveErc20Button
          tokenAddress={tokenAddress}
          allowedAddress={allowedAddress}
          network={network}
          approveAmount={parsedAmount}
          onSuccess={() => refetchIsSufficientAllowance()}
        />
      )}
    </ActionContainer>
  );
};
