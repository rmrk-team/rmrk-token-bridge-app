import React from "react";
import { Circle, SquareProps } from "@chakra-ui/react";
import { NetworkIconSwitchFromKey } from "components/common/network-icon-switch-from-key";
import { EVM_NETWORK_KEYS } from "lib/app/network-protocol-mapping";

type Props = SquareProps & {
  network: EVM_NETWORK_KEYS;
};

export const CircledNetworkIcon = ({ network, ...restProps }: Props) => {
  const isMoonbeam = network === EVM_NETWORK_KEYS.moonbeam;

  return (
    <Circle
      size={"20px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      fontSize={isMoonbeam ? "lg" : "sm"}
      pl={isMoonbeam ? 1 : undefined}
      pt={isMoonbeam ? "5px" : undefined}
      {...restProps}
    >
      <NetworkIconSwitchFromKey network={network} />
    </Circle>
  );
};
