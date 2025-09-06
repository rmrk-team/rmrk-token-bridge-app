import React from "react";
import { Flex, FlexProps as Props } from "@chakra-ui/react";

export const BorderedSectionContainer = (props: Props) => (
  <Flex
    data-name="bordered-section-container"
    direction={"column"}
    borderRadius={"xl"}
    borderWidth={"1px"}
    borderStyle={"solid"}
    borderColor={"gray.500"}
    px={10}
    py={8}
    {...props}
  />
);
