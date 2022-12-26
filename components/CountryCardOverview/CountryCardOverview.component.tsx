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
        href={`/countries/${country.name.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g,
          ""
        )}`}
        className={style.CountryCardOverview__link}
      >
        <div className={style.CountryCardOverview__imageFrame}>
          <Image
            className={style.CountryCardOverview__image}
            alt={`Flag of ${country.name}`}
            src={`${country.flag}`}
            fill={true}
          />
        </div>
        <figcaption className={style.CountryCardOverview__textcontent}>
          <h2 className={style.CountryCardOverview__textcontent__name}>
            {country.name}
          </h2>
          <ul role="list">
            <li>
              Population: <span>{country.population}</span>
            </li>
            <li>
              Region: <span>{country.region}</span>
            </li>
            <li>
              Capital <span>{country.capital}</span>
            </li>
          </ul>
        </figcaption>
      </Link>
    </figure>
  );
}

export default CountryCardOverview;
