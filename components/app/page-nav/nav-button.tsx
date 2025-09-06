import React from "react";
import { Button, ButtonProps, Flex } from "@chakra-ui/react";
import { LinkProps as NextLinkProps } from "next/link";
import { NextLink } from "components/app/next-link";

type Props = {
  href: NextLinkProps["href"];
  leftIcon: ButtonProps["leftIcon"];
  isActive?: boolean;
  children: ButtonProps["children"];
};

export const NavButton = ({ href, leftIcon, isActive, children }: Props) => (
  <NextLink
    href={href}
    pointerEvents={isActive ? "none" : "auto"}
    cursor={isActive ? "default" : "pointer"}
  >
    <Button
      data-name="nav-button"
      leftIcon={
        <Flex fontSize={"20px"} align={"center"} justify={"center"}>
          {leftIcon}
        </Flex>
      }
      variant={isActive ? "solid" : "outline"}
      colorScheme={isActive ? "pinkDark" : "gray"}
      pointerEvents={isActive ? "none" : "auto"}
      cursor={isActive ? "default" : "pointer"}
      size={["sm", "md"]}
    >
      {children}
    </Button>
  </NextLink>
);
