export const parseIfJson = (value: any) => {
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return value;
  }
};
