import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { wagmiConfig } from "lib/configs/wagmi/config";
import { theme } from "lib/configs/chakra-ui/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxelarContextProvider } from "lib/configs/axelar/axelar-context-provider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <RainbowKitProvider theme={darkTheme()}>
            <AxelarContextProvider>
              <Component {...pageProps} />
            </AxelarContextProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
