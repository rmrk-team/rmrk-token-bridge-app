import React from "react";
import { Flex, FlexProps as Props } from "@chakra-ui/react";

export const ActionContainer = (props: Props) => (
  <Flex
    data-name="action-container"
    direction={"column"}
    maxW={"392px"}
    w={"100%"}
    {...props}
  />
);
