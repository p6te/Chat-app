import { render, screen } from "@testing-library/react";
import FormLayout from ".";
import { BrowserRouter } from "react-router-dom";

describe("FormLayout tests", () => {
  it("FormLayout ", () => {
    render(
      <FormLayout
        footer="mock footer"
        title="mock title"
        footerLink="mock link"
      >
        <div>children</div>
      </FormLayout>,
      { wrapper: BrowserRouter }
    );
    const modal = screen.getByTestId("FormLayout-testid");
    expect(modal).toBeInTheDocument();
  });
});
