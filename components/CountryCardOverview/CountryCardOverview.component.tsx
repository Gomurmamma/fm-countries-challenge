import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./CountryCardOverview.module.scss";

type CardProps = {
  country: {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
  };
};

function CountryCardOverview({ country }: CardProps) {
  return (
    <figure className={style.CountryCardOverview}>
      <Link
        href={{
          pathname: "/countries/[country]",
          query: { country: `${country.name}` },
        }}
      >
        <div className={style.CountryCardOverview__imageFrame}>
          <Image
            className={style.CountryCardOverview__image}
            alt={`Flag of ${country.name}`}
            src={`${country.flag}`}
            fill={true}
          />
        </div>
        <figcaption>
          <h2>{country.name}</h2>
          <ul>
            <li>{country.population}</li>
            <li>{country.region}</li>
            <li>{country.capital}</li>
          </ul>
        </figcaption>
      </Link>
    </figure>
  );
}

export default CountryCardOverview;
