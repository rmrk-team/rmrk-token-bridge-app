import { isAddress } from "viem";
import { EthereumAddress } from "lib/evm/types";

export const getIsValidEthereumAddress = (
  testedString: unknown
): testedString is EthereumAddress => {
  if (!testedString || typeof testedString !== "string") return false;
  return isAddress(testedString);
};
