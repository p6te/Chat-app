export const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";

  stringified = JSON.stringify(value);

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return error;
};
