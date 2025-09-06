import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  subWallet,
  talismanWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { isProd } from "lib/app/constants";

const appName = "RMRK Token Manager";
const projectId = "YOUR_PROJECT_ID";

export const connectors = connectorsForWallets(
  [
    {
      groupName: "Token Migrator",
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        talismanWallet,
        ...(isProd ? [subWallet, walletConnectWallet] : []),
      ],
    },
  ],
  {
    appName,
    projectId,
  }
);
