import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ToggleButton from "../components/ToggleButton/ToggleButton.component";

describe("Toggle Button", () => {
  it("renders without crashing", () => {
    expect(() => render(<ToggleButton />)).not.toThrow();
  });
});
