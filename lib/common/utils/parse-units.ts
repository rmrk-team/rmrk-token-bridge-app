import { parseUnits as parseUnitsViem } from "viem";

export const parseUnits = (amount: number, decimals: number) =>
  parseUnitsViem(`${amount}`, decimals);
