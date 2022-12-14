import React from "react";
import style from "./CountrySection.module.scss";
import CountryCardDetails from "../CountryCardDetails/CountryCardDetails.component";

const CountrySection: React.FC = () => {
  const country = {
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
    borders: ["Egypt", "Kenya", "Ethiopia"],
  };

  return (
    <section className={style.CountrySection}>
      <CountryCardDetails country={country} />
    </section>
  );
};

export default CountrySection;
