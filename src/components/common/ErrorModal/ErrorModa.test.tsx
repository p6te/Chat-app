import { render, screen } from "@testing-library/react";
import ErrorModal from ".";

describe("ErrorModal tests", () => {
  const onClose = vi.fn();

  it("Error modal should be visible without error message", () => {
    const isOpen = true;
    render(<ErrorModal onClose={onClose} isOpen={isOpen} />);
    const modal = screen.getByTestId("ErrorModal-testid");
    expect(modal).toBeInTheDocument();
  });

  it("Error modal should not be visible", () => {
    const isOpen = false;

    render(<ErrorModal onClose={onClose} isOpen={isOpen} />);
    const modal = screen.queryByTestId("ErrorModal-testid");
    expect(modal).toBeNull();
  });

  it("Error message should not be visible", () => {
    const isOpen = true;
    const error = "error message";

    render(
      <ErrorModal onClose={onClose} isOpen={isOpen} errorMessage={error} />
    );
    const errorMessage = screen.queryByTestId("errorMessage-testid");
    expect(errorMessage).toHaveTextContent(error);
  });
});
