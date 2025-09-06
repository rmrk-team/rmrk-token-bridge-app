import React from "react";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";
import { IconEthereum } from "components/common/icons/networks/icon-ethereum";
import { IconPolygon } from "components/common/icons/networks/icon-polygon";
import { IconMoonbeam } from "components/common/icons/networks/icon-moonbeam";
import { IconMoonriver } from "components/common/icons/networks/icon-moonriver";
import { IconBase } from "components/common/icons/networks/icon-base";
import { IconBsc } from "components/common/icons/networks/icon-bsc";

type Props = {
  network: EVM_NETWORK_KEYS | undefined;
};

export const NetworkIconSwitchFromKey = ({ network }: Props) => {
  switch (network) {
    case EVM_NETWORK_KEYS.ethereum:
      return <IconEthereum />;
    case EVM_NETWORK_KEYS.polygon:
      return <IconPolygon />;
    case EVM_NETWORK_KEYS.base:
      return <IconBase />;
    case EVM_NETWORK_KEYS.bsc:
      return <IconBsc />;
    case EVM_NETWORK_KEYS.moonbeam:
      return <IconMoonbeam />;
    case EVM_NETWORK_KEYS.moonriver:
      return <IconMoonriver />;
  }

  return <IconEthereum />;
};
