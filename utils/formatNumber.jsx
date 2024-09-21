export const formatNumberWithCommas = (number) => {
  if (!number) return "";
  const [integerPart, decimalPart] = number.split(".");
  return (
    integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (decimalPart ? "." + decimalPart : "")
  );
};
