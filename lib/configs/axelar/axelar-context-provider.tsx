import React, { createContext, ReactNode, useContext } from "react";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";

type AxelarContextValue = {
  AxelarQueryAPI: AxelarQueryAPI | undefined;
};

export const AxelarContext = createContext<AxelarContextValue | undefined>(
  undefined
);

export const useAxelarContext = () => {
  const ctx = useContext(AxelarContext);
  if (!ctx) {
    throw new Error("Axelar context not found");
  }
  return ctx;
};

type ProviderProps = {
  children: ReactNode;
};

export const AxelarContextProvider = ({ children }: ProviderProps) => {
  const api = new AxelarQueryAPI({
    environment: Environment.MAINNET,
  });

  return (
    <AxelarContext.Provider value={{ AxelarQueryAPI: api }}>
      {children}
    </AxelarContext.Provider>
  );
};
