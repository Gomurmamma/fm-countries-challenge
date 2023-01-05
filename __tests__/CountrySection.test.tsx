import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CountrySection from "../components/CountrySection/CountrySection.component";

describe("CountrySection", () => {
  it("renders without crashing", () => {
    expect(() => render(<CountrySection />)).not.toThrow();
  });
});
