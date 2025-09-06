import { Icon } from "@chakra-ui/react";
import {
  EVM_NETWORK_KEYS,
  EVM_NETWORKS,
} from "lib/app/network-protocol-mapping";
import { IconPolygon } from "components/common/icons/networks/icon-polygon";
import { IconMoonbeam } from "components/common/icons/networks/icon-moonbeam";
import React, { ReactNode } from "react";
import { AxelarNetworks } from "lib/app/types";
import { IconEthereum } from "components/common/icons/networks/icon-ethereum";
import { IconBase } from "components/common/icons/networks/icon-base";
import { IconBsc } from "components/common/icons/networks/icon-bsc";

export type OptionTypes = {
  value: AxelarNetworks;
  label: string;
  icon: ReactNode;
};

export type GroupedNetworkOption = {
  label: string;
  options: OptionTypes[];
};

export const networkOptions: Record<AxelarNetworks, OptionTypes> = {
  [EVM_NETWORK_KEYS.ethereum]: {
    value: EVM_NETWORK_KEYS.ethereum,
    label: EVM_NETWORKS.ethereum,
    icon: <Icon as={IconEthereum} />,
  },
  [EVM_NETWORK_KEYS.polygon]: {
    value: EVM_NETWORK_KEYS.polygon,
    label: EVM_NETWORKS.polygon,
    icon: <Icon as={IconPolygon} />,
  },
  [EVM_NETWORK_KEYS.base]: {
    value: EVM_NETWORK_KEYS.base,
    label: EVM_NETWORKS.base,
    icon: <Icon as={IconBase} />,
  },
  [EVM_NETWORK_KEYS.bsc]: {
    value: EVM_NETWORK_KEYS.bsc,
    label: EVM_NETWORKS.bsc,
    icon: <Icon as={IconBsc} />,
  },
  [EVM_NETWORK_KEYS.moonbeam]: {
    value: EVM_NETWORK_KEYS.moonbeam,
    label: EVM_NETWORKS.moonbeam,
    icon: <Icon as={IconMoonbeam} />,
  },
};

export const groupedNetworkOptionsList: OptionTypes[] | GroupedNetworkOption[] =
  [
    networkOptions[EVM_NETWORK_KEYS.ethereum],
    networkOptions[EVM_NETWORK_KEYS.polygon],
    networkOptions[EVM_NETWORK_KEYS.base],
    networkOptions[EVM_NETWORK_KEYS.bsc],
    networkOptions[EVM_NETWORK_KEYS.moonbeam],
  ];
