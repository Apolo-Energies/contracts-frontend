export const formatIbanES = (value: string) => {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .slice(0, 29); // ES + 24 caracteres + espacios
};
