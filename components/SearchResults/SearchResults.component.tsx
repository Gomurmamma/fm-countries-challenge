import React from "react";
import style from "./SearchResults.module.scss";
import CountryCardOverview from "../CountryCardOverview/CountryCardOverview.component";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
    fallbackInView: true,
  });
  return (
    <section className={style.SearchResults} ref={ref}>
      {countries?.map((country, i) =>
        inView ? <CountryCardOverview key={i} country={country} /> : null
      )}
    </section>
  );
}

export default SearchResults;
