export const formatBalanceToReadable = (balance: string) => {
  const decimalSplit = balance.split(".");
  const isPostDecimalTooLong = decimalSplit[1]?.length > 4;

  return isPostDecimalTooLong
    ? `${decimalSplit[0]}.${decimalSplit[1].substring(0, 4)}~`
    : balance;
};
