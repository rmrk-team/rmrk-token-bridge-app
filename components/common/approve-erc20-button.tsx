import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useErc20Approve, useErc20TokenInfo } from "lib/evm/hooks";
import { EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { formatUnits } from "viem";
import { BaseError } from "@wagmi/core/src/errors/base";
import { err } from "pino-std-serializers";

type Props = {
  tokenAddress: EthereumAddress | undefined;
  allowedAddress: EthereumAddress | undefined;
  network: EVM_NETWORK_KEYS | undefined;
  approveAmount: bigint | undefined;
  onSuccess?: () => void;
  onError?: (data?: BaseError) => void;
};

export const ApproveErc20Button = ({
  approveAmount,
  allowedAddress,
  network,
  tokenAddress,
  onSuccess,
  onError,
}: Props) => {
  const toast = useToast({
    duration: 10000,
  });

  const onSuccessCall = () => {
    toast({
      title: `Approved xcRMRK`,
      status: "success",
      position: "top",
      isClosable: true,
    });
    onSuccess?.();
  };

  const onErrorCall = (error: BaseError | undefined) => {
    toast({
      title: `Approval failed`,
      description: error?.shortMessage,
      status: "error",
      position: "top",
      isClosable: true,
    });
    onError?.();
  };

  const { tokenInfo } = useErc20TokenInfo({
    tokenAddress,
    network,
  });

  const { setApproval, isLoading } = useErc20Approve({
    allowedAddress,
    tokenAddress,
    network,
    amount: approveAmount,
    onSuccess: onSuccessCall,
    onError: onErrorCall,
  });

  const parsedApproveAmount =
    tokenInfo && approveAmount
      ? formatUnits(approveAmount, tokenInfo.decimals)
      : undefined;

  return (
    <Button
      data-name="approve-erc20-button"
      onClick={setApproval}
      isLoading={isLoading}
      colorScheme={"pinkPurpleFaintGradient"}
    >
      Approve {parsedApproveAmount} {tokenInfo?.symbol}
    </Button>
  );
};
