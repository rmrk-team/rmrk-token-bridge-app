import React, { ReactNode } from "react";
import { Box, BoxProps, Flex, Heading } from "@chakra-ui/react";

type Props = BoxProps & {
  image: ReactNode;
};

export const GradientGraphicHeading = ({ image, children }: Props) => {
  return (
    <Flex
      data-name="gradient-graphic-heading"
      align={"flex-end"}
      justify={"flex-start"}
      py={4}
      w={"100%"}
      h={"124px"}
      background={
        "linear-gradient(96deg, rgba(255, 54, 150, 0.00) 15.27%, rgba(255, 54, 150, 0.10) 48.28%, rgba(161, 104, 252, 0.20) 82.78%)"
      }
      borderRadius={"3xl"}
      position={"relative"}
    >
      <Box position={"absolute"} right={0} top={0} h={"100%"}>
        {image}
      </Box>
      <Heading
        as={"h1"}
        fontWeight={"bold"}
        fontSize={"4xl"}
        lineHeight={"1em"}
        position={"relative"}
      >
        {children}
      </Heading>
    </Flex>
  );
};
