import React, { ChangeEvent } from "react";
import { HStack, VStack } from "@chakra-ui/react";
import { AxelarNetworks } from "lib/app/types";
import { Label } from "components/common/inputs/label";
import dynamic from "next/dynamic";

const SelectAxelarNetwork = dynamic(
  () =>
    import(
      "components/common/select-axelar-network/select-axelar-network"
    ).then((mod) => mod.SelectAxelarNetwork),
  {
    ssr: false,
  }
);

type Props = {
  name: string;
  onChange: (network: AxelarNetworks) => void;
  customLabel?: string;
  isFrom?: boolean;
};

export const ChainSelectionSection = ({
  name,
  onChange,
  customLabel,
  isFrom,
}: Props) => {
  const label = customLabel || (isFrom ? "From" : "To");

  return (
    <VStack data-name="chain-selection-section" align={"stretch"} gap={5}>
      <HStack>
        <Label>{label}</Label>
        <SelectAxelarNetwork
          name={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value as AxelarNetworks)
          }
        />
      </HStack>
    </VStack>
  );
};
