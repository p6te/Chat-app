import { render, screen } from "@testing-library/react";
import FormLayout from ".";
import { BrowserRouter } from "react-router-dom";

describe("FormLayout tests", () => {
  it("FormLayout is displayed with all properties", () => {
    const mockFooter = "mock footer";
    const mockTitle = "mock title";
    const MockFooterLink = "mock link";
    render(
      <FormLayout
        footer={mockFooter}
        title={mockTitle}
        footerLink={MockFooterLink}
      >
        <div>children</div>
      </FormLayout>,
      { wrapper: BrowserRouter }
    );
    const modal = screen.getByTestId("FormLayout-testid");
    const footer = screen.getByText(mockFooter);
    const title = screen.getByText(mockTitle);
    const link = screen.getByRole("link", { name: MockFooterLink });

    expect(modal).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
