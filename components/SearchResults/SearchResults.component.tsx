import React from "react";
import style from "./SearchResults.module.scss";
import CountryCardOverview from "../CountryCardOverview/CountryCardOverview.component";

interface CountryListProps {
  countries: Country[];
}

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

function SearchResults({ countries }: CountryListProps) {
  return (
    <section className={style.SearchResults}>
      {countries?.map((country, i) => (
        <CountryCardOverview key={i} country={country} />
      ))}
    </section>
  );
}

export default SearchResults;
