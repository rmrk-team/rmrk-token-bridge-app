export type RoundingFunction = (value: number) => number;

export const roundToDecimalPlaces = (
  value: number,
  precision: number,
  roundingMethod: RoundingFunction = Math.round
) => {
  if (!Number.isInteger(precision)) {
    throw new TypeError("Precision must be an integer");
  }
  if (precision < 0) {
    throw new TypeError("Precision must be greater than or equal to zero");
  }
  const multiplier = Math.pow(10, precision);
  return roundingMethod(value * multiplier) / multiplier;
};
