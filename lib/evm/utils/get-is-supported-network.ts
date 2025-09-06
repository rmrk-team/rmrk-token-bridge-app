import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";

export const getIsSupportedNetwork = (network: string) =>
  Boolean(
    Object.values(EVM_NETWORK_KEYS).includes(network as EVM_NETWORK_KEYS) ||
      network === "ethereum"
  );
