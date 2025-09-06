import { chakra } from "@chakra-ui/react";
import Link from "next/link";

export const NextLink = chakra(Link, {
  baseStyle: {
    display: "inline",
    _hover: {
      textDecoration: "underline",
    },
  },
});
