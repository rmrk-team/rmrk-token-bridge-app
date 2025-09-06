import {
  EVM_NETWORK_KEYS,
  EVM_NETWORKS,
} from "lib/app/network-protocol-mapping";
import { supportedChains } from "lib/configs/wagmi/configure-chains";
import { Chain } from "viem";

export const getActiveChainFromNetworkKey = (network?: EVM_NETWORK_KEYS) =>
  (network ? supportedChains[network] : {}) as Chain & {
    network: EVM_NETWORKS;
  };
