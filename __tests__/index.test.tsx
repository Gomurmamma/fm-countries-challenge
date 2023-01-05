import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "../pages/index";

describe("Home page", () => {
  it("renders a heading", () => {
    render(<Homepage />);

    const heading = screen.getByRole("heading", {
      name: /where in the world/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
