import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  useToken,
} from "@chakra-ui/react";

export const MoonriverMoonbeamNote = () => {
  const [orange900] = useToken("colors", ["orange.900"]);

  return (
    <Alert
      status="warning"
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={2}
      backgroundColor={`${orange900}30`}
    >
      <Flex align={"center"} gap={0}>
        <AlertIcon color={"orange.500"} />
        <AlertTitle>
          <Box color={"orange.500"} display={"inline"}>
            Moonbeam migration note
          </Box>{" "}
          posted at{" "}
        </AlertTitle>
      </Flex>
      <AlertDescription color={"whiteAlpha.700"} fontWeight={"normal"}>
        Keep in mind that your Moonriver balance will be migrated to Moonbeam
        network in the process
      </AlertDescription>
    </Alert>
  );
};
