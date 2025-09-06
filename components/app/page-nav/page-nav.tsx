import React from "react";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NavButton } from "components/app/page-nav/nav-button";
import { localUrls } from "lib/app/local-urls";
import { PAGES } from "lib/app/types";
import { IconMigrate } from "components/common/icons/icon-migrate";
import { IconSwap } from "components/common/icons/icon-swap";

export const PageNav = () => {
  const router = useRouter();

  return (
    <Stack
      data-name="page-nav"
      gap={3}
      direction={["column", "row"]}
      justify={"center"}
      align={"center"}
    >
      <NavButton
        href={localUrls[PAGES.home]}
        leftIcon={<IconMigrate />}
        isActive={router.pathname === localUrls[PAGES.home]}
      >
        Swap Tokens
      </NavButton>
      <NavButton
        href={localUrls[PAGES.bridge]}
        leftIcon={<IconSwap />}
        isActive={router.pathname === localUrls[PAGES.bridge]}
      >
        Cross-chain Transfer
      </NavButton>
    </Stack>
  );
};
