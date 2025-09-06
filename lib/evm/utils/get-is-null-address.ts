import { EthereumAddress } from "lib/evm/types";
import { NULL_ADDRESS } from "lib/evm/constants";

export const getIsNullAddress = (address: EthereumAddress) =>
  address === NULL_ADDRESS;
