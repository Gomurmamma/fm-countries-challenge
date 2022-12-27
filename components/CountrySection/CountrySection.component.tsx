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

  return (
    <section className={style.CountrySection}>
      <nav className={style.CountrySection__navBtn}>
        <LinkButton
          buttonprops={{ title: "Back", html: <>&#8592; </> }}
          onClick={() => router.back()}
        />
      </nav>
      <CountryCardDetails
        country={country.country.country}
        borderCountries={country.borderCountries}
      />
    </section>
  );
};

export default CountrySection;
