import { nonNullable } from "next/dist/lib/non-nullable";

export const isZero = (value?: number | bigint) =>
  Boolean(nonNullable(value) && Number(value) === 0);
