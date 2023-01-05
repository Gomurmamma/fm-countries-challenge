import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SearchFeatures from "../components/SearchFeatures/SearchFeatures.component";

describe("SearchFeatures", () => {
  it("renders without crashing", () => {
    expect(() => render(<SearchFeatures countriesData={[]} />)).not.toThrow();
  });
});
