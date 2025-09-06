import { mainnet, polygon, base, bsc, moonbeam, moonriver } from "wagmi/chains";

export enum EVM_NETWORK_KEYS {
  ethereum = "ethereum",
  polygon = "polygon",
  base = "base",
  bsc = "bsc",
  moonbeam = "moonbeam",
  moonriver = "moonriver",
}

export const EVM_NETWORKS = {
  [EVM_NETWORK_KEYS.ethereum]: mainnet.name,
  [EVM_NETWORK_KEYS.polygon]: polygon.name,
  [EVM_NETWORK_KEYS.base]: base.name,
  [EVM_NETWORK_KEYS.bsc]: bsc.name,
  [EVM_NETWORK_KEYS.moonriver]: moonriver.name,
  [EVM_NETWORK_KEYS.moonbeam]: moonbeam.name,
} as const;

export type EVM_NETWORKS = (typeof EVM_NETWORKS)[keyof typeof EVM_NETWORKS];
