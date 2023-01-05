import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Homepage from "../pages/index";

describe("Home page", () => {
  it("renders without crashing", () => {
    expect(() => render(<Homepage />)).not.toThrow();
  });

  it("renders a heading", () => {
    render(<Homepage />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
