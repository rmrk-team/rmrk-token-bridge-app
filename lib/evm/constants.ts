import { ChainToken, ChainTokens, EthereumAddress } from "lib/evm/types";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { GasToken } from "@axelar-network/axelarjs-sdk/dist/src/constants/GasToken";
import { CHAINS as AxelarChains } from "@axelar-network/axelarjs-sdk";
import { AxelarNetworks } from "lib/app/types";

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const oldRmrkNetworkTokens: Record<EVM_NETWORK_KEYS, ChainToken> = {
  [EVM_NETWORK_KEYS.ethereum]: {
    address: "0x471ea49dd8e60e697f4cac262b5fafcc307506e4",
  },
  [EVM_NETWORK_KEYS.polygon]: {
    address: "0xd225eAD1Ce2554F6CB519894Fc98cFB882566339",
  },
  [EVM_NETWORK_KEYS.base]: {
    address: NULL_ADDRESS,
  },
  [EVM_NETWORK_KEYS.bsc]: {
    address: NULL_ADDRESS,
  },
  [EVM_NETWORK_KEYS.moonbeam]: {
    address: "0xECf2ADafF1De8A512f6e8bfe67a2C836EDb25Da3",
  },
  [EVM_NETWORK_KEYS.moonriver]: {
    address: "0xffffffFF893264794d9d57E1E0E21E0042aF5A0A",
  },
};

export const newRmrkNetworkTokens: Record<EVM_NETWORK_KEYS, ChainToken> = {
  [EVM_NETWORK_KEYS.ethereum]: {
    address: "0x524d524B4c9366be706D3A90dcf70076ca037aE3",
  },
  [EVM_NETWORK_KEYS.polygon]: {
    address: "0x524d524B4c9366be706D3A90dcf70076ca037aE3",
  },
  [EVM_NETWORK_KEYS.base]: {
    address: "0x524d524B4c9366be706D3A90dcf70076ca037aE3",
  },
  [EVM_NETWORK_KEYS.bsc]: {
    address: "0x524d524B4c9366be706D3A90dcf70076ca037aE3",
  },
  [EVM_NETWORK_KEYS.moonbeam]: {
    address: "0x524d524B4c9366be706D3A90dcf70076ca037aE3",
  },
  [EVM_NETWORK_KEYS.moonriver]: {
    address: NULL_ADDRESS,
  },
};

export const ethereumTokens: ChainTokens = {
  legacyToken: oldRmrkNetworkTokens[EVM_NETWORK_KEYS.ethereum],
  newToken: newRmrkNetworkTokens[EVM_NETWORK_KEYS.ethereum],
};
export const polygonTokens: ChainTokens = {
  legacyToken: oldRmrkNetworkTokens[EVM_NETWORK_KEYS.polygon],
  newToken: newRmrkNetworkTokens[EVM_NETWORK_KEYS.polygon],
};

export const baseTokens: ChainTokens = {
  legacyToken: oldRmrkNetworkTokens[EVM_NETWORK_KEYS.base],
  newToken: newRmrkNetworkTokens[EVM_NETWORK_KEYS.base],
};

export const bscTokens: ChainTokens = {
  legacyToken: oldRmrkNetworkTokens[EVM_NETWORK_KEYS.bsc],
  newToken: newRmrkNetworkTokens[EVM_NETWORK_KEYS.bsc],
};

export const moonbeamTokens: ChainTokens = {
  legacyToken: oldRmrkNetworkTokens[EVM_NETWORK_KEYS.moonbeam],
  newToken: newRmrkNetworkTokens[EVM_NETWORK_KEYS.moonbeam],
};

export const mooonriverTokens: ChainTokens = {
  legacyToken: oldRmrkNetworkTokens[EVM_NETWORK_KEYS.moonriver],
  newToken: newRmrkNetworkTokens[EVM_NETWORK_KEYS.moonriver],
};

export const supportedCurrencies: Record<EVM_NETWORK_KEYS, ChainTokens> = {
  [EVM_NETWORK_KEYS.ethereum]: ethereumTokens,
  [EVM_NETWORK_KEYS.polygon]: polygonTokens,
  [EVM_NETWORK_KEYS.base]: baseTokens,
  [EVM_NETWORK_KEYS.bsc]: bscTokens,
  [EVM_NETWORK_KEYS.moonbeam]: moonbeamTokens,
  [EVM_NETWORK_KEYS.moonriver]: mooonriverTokens,
};

export const gasTokenSymbol: Partial<Record<EVM_NETWORK_KEYS, string>> = {
  [EVM_NETWORK_KEYS.ethereum]: GasToken.ETH,
  [EVM_NETWORK_KEYS.polygon]: GasToken.MATIC,
  [EVM_NETWORK_KEYS.base]: GasToken.BASE,
  [EVM_NETWORK_KEYS.bsc]: GasToken.BNBCHAIN,
  [EVM_NETWORK_KEYS.moonbeam]: GasToken.GLMR,
};

export const axelarChainNames: Record<AxelarNetworks, string> = {
  [EVM_NETWORK_KEYS.ethereum]: AxelarChains.MAINNET.ETHEREUM,
  [EVM_NETWORK_KEYS.polygon]: AxelarChains.MAINNET.POLYGON,
  [EVM_NETWORK_KEYS.base]: AxelarChains.MAINNET.BASE,
  [EVM_NETWORK_KEYS.bsc]: AxelarChains.MAINNET.BNBCHAIN,
  [EVM_NETWORK_KEYS.moonbeam]: AxelarChains.MAINNET.MOONBEAM,
};

export const NETWORK_CONTACTS_PROPS = {
  moonriverMigrator: "moonriverMigrator",
  migrator: "migrator",
  swapperMinter: "swapperMinter",
} as const;

export type NETWORK_CONTACTS_PROPS =
  (typeof NETWORK_CONTACTS_PROPS)[keyof typeof NETWORK_CONTACTS_PROPS];

type NETWORK_CONTRACT_SET = Partial<
  Record<NETWORK_CONTACTS_PROPS, EthereumAddress>
>;

export const EVM_RMRK_CONTRACTS: Record<
  EVM_NETWORK_KEYS,
  NETWORK_CONTRACT_SET
> = {
  [EVM_NETWORK_KEYS.ethereum]: {
    [NETWORK_CONTACTS_PROPS.swapperMinter]:
      "0x0FcD44621752d72C9a216d8F4d986a03B8BDB03a",
  },
  [EVM_NETWORK_KEYS.polygon]: {
    [NETWORK_CONTACTS_PROPS.swapperMinter]:
      "0x89AC95db035dBe04Ff2e591C19Cce645b65867BE",
  },
  [EVM_NETWORK_KEYS.base]: {},
  [EVM_NETWORK_KEYS.bsc]: {},
  [EVM_NETWORK_KEYS.moonbeam]: {
    [NETWORK_CONTACTS_PROPS.migrator]:
      "0xf4B6FE71B6aa6f904864B4C95ECDBcc06CBec5d9",
    [NETWORK_CONTACTS_PROPS.swapperMinter]:
      "0xeC15f6C93F6E41847C03a3c748e524465add8b7a",
  },
  [EVM_NETWORK_KEYS.moonriver]: {
    [NETWORK_CONTACTS_PROPS.moonriverMigrator]:
      "0x45888288D054DBE4E3b0cc2577BE51F38E63F5E2",
  },
};

export const AXELAR_FINALITY_ESTIMATES: Record<
  AxelarNetworks,
  { finalityTime: string; blockTime: string }
> = {
  [EVM_NETWORK_KEYS.ethereum]: {
    finalityTime: "24 minutes",
    blockTime: "200 blocks",
  },
  [EVM_NETWORK_KEYS.polygon]: {
    finalityTime: "6 minutes",
    blockTime: "128 blocks",
  },
  [EVM_NETWORK_KEYS.base]: {
    finalityTime: "25 minutes",
    blockTime: "1000000 blocks",
  },
  [EVM_NETWORK_KEYS.bsc]: {
    finalityTime: "5 minutes",
    blockTime: "15 blocks",
  },
  [EVM_NETWORK_KEYS.moonbeam]: {
    finalityTime: "3 minutes",
    blockTime: "1 block",
  },
};
