import React from "react";
import style from "./CountrySection.module.scss";
import CountryCardDetails from "../CountryCardDetails/CountryCardDetails.component";
import BackButton from "../BackButton/BackButton.component";
import { useRouter } from "next/navigation";

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

  return (
    <section className={style.CountrySection}>
      <nav className={style.CountrySection__navBtn}>
        <BackButton
          buttonprops={{
            title: "Back button",
            tooltip: "Go back to the previous page",
            text: "Back",
          }}
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
