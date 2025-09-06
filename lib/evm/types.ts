import { UseWaitForTransactionReceiptReturnType } from "wagmi";

export type EthereumAddress = `0x${string}`;

export type ChainToken = {
  address: EthereumAddress;
  isNativeTokenWrapper?: boolean;
};

export type ChainTokens = {
  legacyToken: ChainToken;
  newToken: ChainToken;
};

export type ERC20Token = ChainToken & {
  symbol: string;
  decimals: number;
};

export type WaitWriteTransactionData =
  UseWaitForTransactionReceiptReturnType["data"];
