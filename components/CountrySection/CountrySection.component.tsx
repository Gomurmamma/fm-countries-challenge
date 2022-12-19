import React from "react";
import style from "./CountrySection.module.scss";
import CountryCardDetails from "../CountryCardDetails/CountryCardDetails.component";

type currencyObj = {
  currency: {
    name: string;
  };
};

type languageObj = {
  language: {
    name: string;
  };
};
type CardProps = {
  country: {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
    nativeName: string;
    subregion: string;
    topLevelDomain: string[];
    currencies: currencyObj[];
    languages: languageObj[];
    borders: string[];
  };
};

const CountrySection = (country) => {
  console.log("2222222 Here country data in section", country.country.country);

  const demo_country = {
    name: "Chad",
    population: 2000,
    region: "Africa",
    capital: "Big City",
    flag: "https://flagcdn.com/al.svg",
    nativeName: "Chad",
    subregion: "Horn of Africa",
    topLevelDomain: [".be"],
    currencies: [{ currency: { name: "dollar" } }],
    languages: [
      { language: { name: "french" } },
      { language: { name: "german" } },
      { language: { name: "local" } },
    ],
    borders: ["Egypt", "Kenya", "Ethiopia", "Congo", "South Africa"],
  };

  return (
    <section className={style.CountrySection}>
      <CountryCardDetails country={country.country.country} />
    </section>
  );
};

export default CountrySection;
