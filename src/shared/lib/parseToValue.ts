export const getParsedValue = (value) => {
  try {
    if (typeof value !== "string") return false;
    return JSON.parse(value);
  } catch {}

  return false;
};
