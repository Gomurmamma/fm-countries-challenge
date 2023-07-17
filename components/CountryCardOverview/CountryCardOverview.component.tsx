import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./CountryCardOverview.module.scss";
import { useInView } from "react-intersection-observer";

type CardProps = {
  country: {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
  };
  lazy: boolean;
};

function CountryCardOverview({ country, lazy }: CardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  return (
    <figure
      className={style.CountryCardOverview}
      title={`Go to the ${country.name} page`}
    >
      <Link
        href={`/countries/${country.name.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g,
          ""
        )}`}
        className={style.CountryCardOverview__link}
      >
        <div
          className={style.CountryCardOverview__imageFrame}
          ref={ref}
          data-inview={inView}
        >
          {inView ? (
            <Image
              className={style.CountryCardOverview__image}
              alt={`Flag of ${country.name}`}
              src={`${country.flag}`}
              fill={true}
              priority={lazy ? false : true}
            />
          ) : null}
        </div>
        <figcaption className={style.CountryCardOverview__textcontent}>
          <h2 className={style.CountryCardOverview__textcontent__name}>
            {country.name}
          </h2>
          <ul role="list">
            <li className={style.CountryCardOverview__textcontent__info}>
              Population:{" "}
              <span className={style.CountryCardOverview__textcontent__value}>
                {country.population.toLocaleString("en-US")}
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
