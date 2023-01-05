import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header/Header.component";

describe("Header", () => {
  it("renders without crashing", () => {
    expect(() => render(<Header heading="text" />)).not.toThrow();
  });
});
