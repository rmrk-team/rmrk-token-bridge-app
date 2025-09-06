import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { newRmrkNetworkTokens } from "lib/evm/constants";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
};

export const getRmrkAddressFromNetworkKey = ({ network }: Props) =>
  network ? newRmrkNetworkTokens[network].address : undefined;
