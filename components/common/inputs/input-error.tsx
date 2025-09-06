import React from "react";
import { Box, BoxProps as Props } from "@chakra-ui/react";

export const InputError = (props: Props) => (
  <Box
    data-name="input-error"
    color={"red.400"}
    fontWeight={"medium"}
    fontSize={"sm"}
    {...props}
  />
);
