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
            <li className={style.CountryCardOverview__textcontent__info}>
              Population:{" "}
              <span className={style.CountryCardOverview__textcontent__value}>
                {country.population}
              </span>
            </li>
            <li className={style.CountryCardOverview__textcontent__info}>
              Region:{" "}
              <span className={style.CountryCardOverview__textcontent__value}>
                {country.region}
              </span>
            </li>
            <li className={style.CountryCardOverview__textcontent__info}>
              Capital:{" "}
              <span className={style.CountryCardOverview__textcontent__value}>
                {country.capital}
              </span>
            </li>
          </ul>
        </figcaption>
      </Link>
    </figure>
  );
}

export default CountryCardOverview;
