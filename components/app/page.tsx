import React from "react";
import {
  Box,
  Center,
  Container,
  ContainerProps as Props,
} from "@chakra-ui/react";
import { PageNav } from "components/app/page-nav/page-nav";
import { Head } from "components/app/head";

export const Page = ({ children }: Props) => (
  <>
    <Head />
    <Box data-name="page" minH={"100vh"} pb={20}>
      <Center py={16}>
        <PageNav />
      </Center>
      <Container maxW={"752px"}>{children}</Container>
    </Box>
  </>
);
