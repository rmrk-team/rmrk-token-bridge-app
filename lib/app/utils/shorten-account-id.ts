export const shortenAccountId = (
  id: string,
  inMiddle?: boolean,
  sliceSize: number = 4
) => {
  if (id) {
    const beginningSliceSize = inMiddle ? sliceSize : 12;
    if (id.length <= beginningSliceSize) {
      return id;
    }
    const beginning = id.slice(0, beginningSliceSize);
    const end = id.slice(-sliceSize);

    return inMiddle
      ? `${beginning}...${end}`
      : `${beginning}${id.length > 12 ? "..." : ""}`;
  }

  return "";
};
