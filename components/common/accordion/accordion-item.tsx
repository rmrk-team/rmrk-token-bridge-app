import React, { ReactNode } from "react";
import {
  AccordionButton,
  AccordionItem as ChakraAccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";

export type Props = {
  question: string | ReactNode;
  answer: string | ReactNode;
};

export const AccordionItem = ({ question, answer }: Props) => (
  <ChakraAccordionItem border={"none"}>
    {({ isExpanded }) => (
      <Box
        backgroundColor={isExpanded ? "#ffffff04" : "gray.800"}
        transition={"background-color 0.15s ease-in-out"}
        borderRadius={"lg"}
        borderColor={"#ffffff08"}
        borderWidth={"1px"}
        borderStyle={"solid"}
      >
        <AccordionButton
          px={8}
          pt={8}
          pb={8}
          _hover={{
            backgroundColor: "transparent",
          }}
          color={isExpanded ? "mintaur.abyss" : "white"}
        >
          <HStack gap={8} justifyItems={"space-between"} w={"100%"}>
            <Heading
              as={"h3"}
              fontSize={"sm"}
              lineHeight={5}
              fontWeight={isExpanded ? "medium" : "bold"}
              flexGrow={1}
              textAlign={"left"}
              color={isExpanded ? "whiteAlpha.700" : "gray.400"}
            >
              {question}
            </Heading>
            <Box flexShrink={0} color={"whiteAlpha.700"}>
              {isExpanded ? (
                <AiOutlineMinus size={"14px"} />
              ) : (
                <AiOutlinePlus size={"14px"} />
              )}
            </Box>
          </HStack>
        </AccordionButton>
        <AccordionPanel
          px={8}
          pt={0}
          pb={8}
          color={"whiteAlpha.700"}
          fontSize={"xs"}
          lineHeight={4}
          fontWeight={"medium"}
        >
          {answer}
        </AccordionPanel>
      </Box>
    )}
  </ChakraAccordionItem>
);
