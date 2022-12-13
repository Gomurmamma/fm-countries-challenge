import React from "react";
import Image from "next/image";
import style from "./CountryCardOverview.module.scss";

type CardProps = {
  country: {
    name: {
      common: string;
    };
    population: number;
    region: string;
    capital: string[];
    flags: {
      svg: string;
    };
  };
};

function CountryCardOverview({ country }: CardProps) {
  return (
    <figure className={style.CountryCardOverview}>
      <div className={style.CountryCardOverview__imageFrame}>
        <Image
          className={style.CountryCardOverview__image}
          alt={`Flag of ${country.name.common}`}
          src={`${country.flags.svg}`}
          fill={true}
        />
      </div>
      <figcaption>
        <h2>{country.name.common}</h2>
        <ul>
          <li>{country.population}</li>
          <li>{country.region}</li>
          <li>{country.capital}</li>
        </ul>
      </figcaption>
    </figure>
  );
}

export default CountryCardOverview;
