import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Homepage from "../pages/index";

describe("Home page", () => {
  it("renders without crashing", () => {
    expect(() => render(<Homepage />)).not.toThrow();
  });
});
