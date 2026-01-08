import { base, bsc, mainnet, moonbeam, moonriver, polygon } from "wagmi/chains";
import { isProd } from "lib/app/constants";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { Chain } from "viem";

export const supportedChains: Record<EVM_NETWORK_KEYS, Chain> = {
  [EVM_NETWORK_KEYS.ethereum]: mainnet,
  [EVM_NETWORK_KEYS.polygon]: polygon,
  [EVM_NETWORK_KEYS.base]: base,
  [EVM_NETWORK_KEYS.bsc]: bsc,
  [EVM_NETWORK_KEYS.moonriver]: moonriver,
  [EVM_NETWORK_KEYS.moonbeam]: {
    ...moonbeam,
    rpcUrls: {
      default: {
        http: ["https://moonbeam.drpc.org"],
        webSocket: ["wss://moonbeam.drpc.org"],
      },
    },
  },
};

export const connectedChains: readonly [Chain, ...Chain[]] = isProd
  ? [
      supportedChains[EVM_NETWORK_KEYS.ethereum],
      supportedChains[EVM_NETWORK_KEYS.polygon],
      supportedChains[EVM_NETWORK_KEYS.base],
      supportedChains[EVM_NETWORK_KEYS.bsc],
      supportedChains[EVM_NETWORK_KEYS.moonbeam],
      supportedChains[EVM_NETWORK_KEYS.moonriver],
    ]
  : [
      supportedChains[EVM_NETWORK_KEYS.ethereum],
      supportedChains[EVM_NETWORK_KEYS.polygon],
      supportedChains[EVM_NETWORK_KEYS.base],
      supportedChains[EVM_NETWORK_KEYS.bsc],
      supportedChains[EVM_NETWORK_KEYS.moonbeam],
      supportedChains[EVM_NETWORK_KEYS.moonriver],
    ];
