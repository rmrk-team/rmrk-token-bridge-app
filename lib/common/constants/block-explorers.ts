import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { WebUrl } from "lib/app/types";
import { base, bsc, mainnet, moonbeam, moonriver, polygon } from "wagmi/chains";

export const blockExplorers: Record<EVM_NETWORK_KEYS, WebUrl> = {
  [EVM_NETWORK_KEYS.ethereum]: mainnet.blockExplorers.default.url,
  [EVM_NETWORK_KEYS.polygon]: polygon.blockExplorers.default.url,
  [EVM_NETWORK_KEYS.base]: base.blockExplorers.default.url,
  [EVM_NETWORK_KEYS.bsc]: bsc.blockExplorers.default.url,
  [EVM_NETWORK_KEYS.moonbeam]: moonbeam.blockExplorers.default.url,
  [EVM_NETWORK_KEYS.moonriver]: moonriver.blockExplorers.default.url,
};
