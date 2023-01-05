import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SearchResults from "../components/SearchResults/SearchResults.component";

describe("Toggle Button", () => {
  it("renders without crashing", () => {
    expect(() => render(<SearchResults countries={[]} />)).not.toThrow();
  });
});
