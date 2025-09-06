import { createConfig, http } from "wagmi";
import { createClient } from "viem";
import { connectedChains } from "lib/configs/wagmi/configure-chains";
import { connectors } from "lib/configs/rainbowkit/config";

export const wagmiConfig = createConfig({
  chains: connectedChains,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors,
  ssr: true,
});
