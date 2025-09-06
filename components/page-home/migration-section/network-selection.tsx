import React from "react";
import { Flex, useRadioGroup } from "@chakra-ui/react";
import { IconRadio } from "components/page-home/migration-section/icon-radio";
import {
  EVM_NETWORK_KEYS,
  EVM_NETWORKS,
} from "lib/app/network-protocol-mapping";

type Props = {
  networkList: EVM_NETWORK_KEYS[];
  onChange: (network: EVM_NETWORK_KEYS) => void;
};

export const NetworkSelection = ({ networkList, onChange }: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: EVM_NETWORK_KEYS.moonriver,
    onChange,
  });

  const options = networkList.map((network) => ({
    value: network,
    label: EVM_NETWORKS[network],
  }));

  const group = getRootProps();

  return (
    <Flex data-name="network-selection" gap={3} flexWrap={"wrap"} {...group}>
      {options.map(({ value, label }) => {
        const radio = getRadioProps({ value });

        return (
          <IconRadio key={value} {...radio}>
            {label}
          </IconRadio>
        );
      })}
    </Flex>
  );
};
