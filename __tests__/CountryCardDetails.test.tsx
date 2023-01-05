import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CountryCardDetails from "../components/CountryCardDetails/CountryCardDetails.component";

describe("CountryCardDetails", () => {
  it("renders without crashing", () => {
    expect(() =>
      render(
        <CountryCardDetails
          country={{
            name: "Mexico",
            population: 128932753,
            region: "Americas",
            capital: "Mexico City",
            flag: "https://flagcdn.com/ax.svg",
            nativeName: "Mexico",
            subregion: "North America",
            topLevelDomain: [".mx"],
            currencies: [{ name: "Mexican peso" }],
            languages: [{ name: "Spanish" }],
          }}
          borderCountries={[
            { name: "Guatemala" },
            { name: "Belieze" },
            { name: "United States" },
          ]}
        />
      )
    ).not.toThrow();
  });
});
