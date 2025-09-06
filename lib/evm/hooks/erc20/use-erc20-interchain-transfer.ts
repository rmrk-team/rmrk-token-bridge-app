import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ERC20 } from "lib/evm/abis";
import { UseQueryOptions } from "@tanstack/react-query";
import { EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { getActiveChainFromNetworkKey } from "lib/app/utils";
import { axelarChainNames, newRmrkNetworkTokens } from "lib/evm/constants";
import { AxelarNetworks } from "lib/app/types";
import { useErc20TokenInfo } from "lib/evm/hooks/erc20/use-erc20-token-info";
import { useContractWriteCallbacks } from "lib/evm/hooks/use-contract-write-callbacks";
import { parseUnits } from "viem";
import { BaseError } from "@wagmi/core/src/errors/base";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
  destinationNetwork: AxelarNetworks | undefined;
  recipient: EthereumAddress | undefined;
  amount: string | undefined;
  payableAmount: bigint | undefined;
  onSuccess?: UseQueryOptions["onSuccess"];
  onError?: (data?: BaseError) => void;
  enabled?: boolean;
};

export const useErc20InterchainTransfer = ({
  network,
  destinationNetwork,
  recipient,
  amount,
  payableAmount,
  onSuccess,
  onError,
  enabled = true,
}: Props) => {
  const { id: chainId } = getActiveChainFromNetworkKey(network);
  const { address } = useAccount();

  const tokenAddress = network
    ? newRmrkNetworkTokens[network].address
    : undefined;

  const { tokenInfo, isLoading: isLoadingTokenInfo } = useErc20TokenInfo({
    network,
    tokenAddress,
  });

  const isEnabled =
    enabled &&
    !!address &&
    !!tokenAddress &&
    !!network &&
    !!destinationNetwork &&
    !!recipient &&
    !!amount &&
    !!payableAmount &&
    !!chainId &&
    !!tokenInfo;

  const {
    data,
    writeContractAsync,
    isLoading: isLoadingWrite,
    error,
  } = useWriteContract();

  const {
    isFetching: isFetchingReceipt,
    data: waitData,
    isFetched,
  } = useWaitForTransactionReceipt({
    hash: data,
    confirmations: 2,
  });

  useContractWriteCallbacks({
    waitData,
    isFetched,
    onSuccess,
    onError,
    error,
  });

  const interchainTransfer = isEnabled
    ? () =>
        writeContractAsync({
          chainId,
          address: tokenAddress,
          args: [
            axelarChainNames[destinationNetwork],
            recipient,
            parseUnits(amount, tokenInfo.decimals),
            "0x",
          ],
          abi: ERC20,
          functionName: "interchainTransfer",
          value: payableAmount,
        })
    : undefined;

  return {
    interchainTransfer,
    isLoading: isEnabled && (isLoadingWrite || isFetchingReceipt),
  };
};
