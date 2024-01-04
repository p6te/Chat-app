import { render, screen } from "@testing-library/react";
import Input from ".";
import { ThemeContextProvider } from "~/styles/theme/themeContext";

describe("Input tests", () => {
  const mockLabel = "test label";
  const mockError = "test error";
  const mockPlaceholder = "test placeholder";

  it("Should not display placeholder when label is passed", () => {
    render(<Input label={mockLabel} placeholder={mockPlaceholder} />);

    const label = screen.getByText(mockLabel);
    const inputPlaceholder = screen.queryByPlaceholderText(mockPlaceholder);

    expect(label).toBeVisible();
    expect(inputPlaceholder).toBeNull();
  });

  it("Should display placeholder when is no label", () => {
    render(<Input placeholder={mockPlaceholder} />);

    const labelPlaceholder = screen.getByPlaceholderText(mockPlaceholder);

    expect(labelPlaceholder).toBeVisible();
  });
  it("Should display error message", () => {
    render(<Input errorMessage={mockError} />);

    const errorMessage = screen.getByText(mockError);

    expect(errorMessage).toBeVisible();
  });
});
