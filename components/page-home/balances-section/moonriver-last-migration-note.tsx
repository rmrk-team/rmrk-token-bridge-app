import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  useToken,
  Link,
} from "@chakra-ui/react";

type Props = {
  lastMigration: string;
};

export const MoonriverLastMigrationNote = ({ lastMigration }: Props) => {
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
            Latest token batch
          </Box>{" "}
          migrated at{" "}
          <Box color={"orange.500"} display={"inline"}>
            {lastMigration}
          </Box>
        </AlertTitle>
      </Flex>
      <AlertDescription color={"whiteAlpha.700"} fontWeight={"normal"}>
        Moonriver migrations on demand by reaching out to{" "}
        <Link
          href="mailto:hello@rmrk.app"
          target="_blank"
          isExternal
          fontWeight={"bold"}
        >
          hello@rmrk.app
        </Link>{" "}
        or via our{" "}
        <Link
          href="https://t.me/rmrk_app"
          target="_blank"
          isExternal
          fontWeight={"bold"}
        >
          official Telegram channel
        </Link>
        .
      </AlertDescription>
    </Alert>
  );
};
