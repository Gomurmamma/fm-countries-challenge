import React from "react";
import style from "./SearchResults.module.scss";
import CountryCardOverview from "../CountryCardOverview/CountryCardOverview.component";

interface CountryListProps {
  countries: Country[];
}

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    svg: string;
  };
}

function SearchResults(countries: CountryListProps) {
  return (
    <section className={style.SearchResults}>
      {countries.countries.map((country, i) => (
        <CountryCardOverview key={i} country={country} />
      ))}
    </section>
  );
}

export default SearchResults;
