import React from "react";
import style from "./CountrySection.module.scss";
import CountryCardDetails from "../CountryCardDetails/CountryCardDetails.component";
import LinkButton from "../LinkButton/LinkButton.component";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();

  console.log("2222222 Here country data in section", country);
  console.log(
    "2222222 Here BORDERcountries in section",
    country.borderCountries
  );

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
      <LinkButton
        buttonprops={{ title: "Back" }}
        onClick={() => router.back()}
      />
      <CountryCardDetails
        country={country.country.country}
        borderCountries={country.borderCountries}
      />
    </section>
  );
};

export default CountrySection;
