import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export const Bold = (props: BoxProps) => (
  <Box as={"strong"} data-name={"bold"} display={"inline"} {...props} />
);
