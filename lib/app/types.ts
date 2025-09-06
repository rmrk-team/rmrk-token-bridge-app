import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";

export type WebUrl = `https://${string}`;

export type AxelarNetworks =
  | EVM_NETWORK_KEYS.ethereum
  | EVM_NETWORK_KEYS.polygon
  | EVM_NETWORK_KEYS.base
  | EVM_NETWORK_KEYS.bsc
  | EVM_NETWORK_KEYS.moonbeam;

export enum PAGES {
  home = "home",
  bridge = "bridge",
}

export interface ILocalUrls {
  [PAGES.home]: string;
  [PAGES.bridge]: string;
}
