import { ensureError } from "../ensureError";

const mockErrorMessage = "Mock error message";

test("Should return error message if value is type of Error", () => {
  const mockError = new Error(mockErrorMessage);
  const errorMessage = ensureError(mockError.message);

  expect(errorMessage.message).toContain(mockErrorMessage);
});

test("Should return error message if value is not type of Error", () => {
  const errorMessage = ensureError(mockErrorMessage);

  expect(errorMessage.message).toContain("Mock error message");
});
