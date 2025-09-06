import React from "react";
import { Flex, FlexProps as Props } from "@chakra-ui/react";

export const Label = (props: Props) => (
  <Flex
    data-name="label"
    as={"label"}
    color={"gray.400"}
    fontSize={"xs"}
    lineHeight={4}
    fontWeight={"semibold"}
    {...props}
  />
);
