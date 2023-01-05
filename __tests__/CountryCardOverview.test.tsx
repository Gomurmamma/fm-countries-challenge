import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CountryCardOverview from "../components/CountryCardOverview/CountryCardOverview.component";

describe("CountryCardOverview", () => {
  it("renders without crashing", () => {
    expect(() =>
      render(
        <CountryCardOverview
          country={{
            name: "United Mexican States",
            population: 430562,
            region: "Americas",
            capital: "Mexico City",
            flag: "https://flagcdn.com/ax.svg",
          }}
        />
      )
    ).not.toThrow();
  });
});
