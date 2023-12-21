import React from "react";
import { render, screen } from "@testing-library/react";
import TestComponent from "./TestComponent";

describe("TestComponent", () => {
  it("renders the component with a heading element", () => {
    render(<TestComponent />);
    const headingElement = screen.getByText("Hello test");
    expect(headingElement).toBeInTheDocument();
  });
});
