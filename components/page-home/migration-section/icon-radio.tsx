import React from "react";
import {
  Box,
  Flex,
  HStack,
  RadioProps as Props,
  useRadio,
} from "@chakra-ui/react";
import { CircledNetworkIcon } from "components/common/circled-network-icon";

export const IconRadio = ({ children, ...restProps }: Props) => {
  const { getInputProps, getRadioProps } = useRadio(restProps);

  const input = getInputProps();
  const checkbox = getRadioProps();
  const isChecked = checkbox.checked;

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        align={"center"}
        justify={"center"}
        cursor={"pointer"}
        px={3}
        h={["32px", "40px"]}
        borderRadius={"full"}
        borderWidth={"1px"}
        borderColor={"gray.500"}
        fontSize={"sm"}
        fontWeight={"semibold"}
        lineHeight={5}
        color={"whiteAlpha.700"}
        _hover={{
          opacity: isChecked ? 1 : 0.7,
        }}
        _checked={{
          bg: "pink.800",
          color: "white",
          borderColor: "pink.700",
          borderWidth: "2px",
          cursor: "default",
          fontWeight: "bold",
        }}
        transition={"all 0.15s ease-in-out"}
        {...checkbox}
      >
        <HStack gap={2}>
          <CircledNetworkIcon network={input.value} />
          <Box>{children}</Box>
        </HStack>
      </Flex>
    </Box>
  );
};
