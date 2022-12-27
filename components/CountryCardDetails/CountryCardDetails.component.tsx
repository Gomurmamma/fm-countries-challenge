import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./CountryCardDetails.module.scss";
import LinkButton from "../LinkButton/LinkButton.component";

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
    borders: any[];
  };
};

const borderCountries = async (borders: any[]) => {
  console.log("the borders array", borders);

  // Initialize borderCountries[]
  let borderCountries: any[] = [];

  // borders array reduced to first 3 items into borderCountries[]
  for (let i = 0; i < 3; i++) {
    borderCountries.push(borders[i]);
  }

  return borderCountries ? (
    <ul role="list">
      {borderCountries.map((country, i) =>
        country ? (
          <li key={i}>
            <Link
              href={`/countries/${country.replace(
                /[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g,
                ""
              )}`}
            >
              <LinkButton
                buttonprops={{
                  title: country.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, ""),
                }}
              />
            </Link>
          </li>
        ) : (
          ""
        )
      )}
    </ul>
  ) : (
    <></>
  );
};

function CountryCardDetails({ country, borderCountries }): JSX.Element {
  console.log("4444 Here's country obj in detail component", country);
  console.log(
    "4444 Here's borderCountries in detail component",
    borderCountries
  );

  return (
    <>
      <figure className={style.CountryCardDetails}>
        <div className={style.CountryCardDetails__imageFrame}>
          <Image
            className={style.CountryCardDetails__image}
            alt={`Flag of ${country.name}`}
            src={country.flag}
            fill={true}
          />
        </div>
        <figcaption className={style.CountryCardDetails__textcontent}>
          <h2 className={style.CountryCardDetails__textcontent__name}>
            {country.name}
          </h2>
          <ul
            role="list"
            className={style.CountryCardDetails__textcontent__info}
          >
            <li>
              <ul
                role="list"
                className={style.CountryCardDetails__textcontent__inline}
              >
                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  Native Name:
                  <span
                    className={
                      style.CountryCardDetails__textcontent__info__value
                    }
                  >
                    {country.nativeName}
                  </span>
                </li>
                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  Population:{" "}
                  <span
                    className={
                      style.CountryCardDetails__textcontent__info__value
                    }
                  >
                    {country.population.toLocaleString("en-US")}
                  </span>
                </li>
                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  Region:{" "}
                  <span
                    className={
                      style.CountryCardDetails__textcontent__info__value
                    }
                  >
                    {country.region}
                  </span>
                </li>
                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  Sub Region:{" "}
                  <span
                    className={
                      style.CountryCardDetails__textcontent__info__value
                    }
                  >
                    {country.subregion}{" "}
                  </span>
                </li>
                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  Capital:{" "}
                  <span
                    className={
                      style.CountryCardDetails__textcontent__info__value
                    }
                  >
                    {country.capital}
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <ul role="list">
                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  Top Level Domain:{" "}
                  <span
                    className={
                      style.CountryCardDetails__textcontent__info__value
                    }
                  >
                    {country.topLevelDomain}
                  </span>
                </li>
                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  <span>Currencies: </span>
                  {
                    <ul
                      role="list"
                      className={
                        style.CountryCardDetails__textcontent__infolist
                      }
                    >
                      {country.currencies
                        ? country.currencies.map((currency, i) => (
                            <li
                              key={i}
                              className={
                                style.CountryCardDetails__textcontent__info__value
                              }
                            >
                              {currency.name}{" "}
                            </li>
                          ))
                        : ""}
                    </ul>
                  }
                </li>

                <li
                  className={
                    style.CountryCardDetails__textcontent__info__detail
                  }
                >
                  <span>Languages: </span>
                  {
                    <ul
                      role="list"
                      className={
                        style.CountryCardDetails__textcontent__infolist
                      }
                    >
                      {country.languages?.map((language, i) => (
                        <li
                          key={i}
                          className={
                            style.CountryCardDetails__textcontent__info__value
                          }
                        >
                          {language.name}
                        </li>
                      ))}
                    </ul>
                  }
                </li>
              </ul>
            </li>
          </ul>
          <div className={style.CountryCardDetails__textcontent__borders}>
            <p
              className={style.CountryCardDetails__textcontent__borders__title}
            >
              Border Countries:
            </p>
            {borderCountries ? (
              <nav>
                {borderCountries.slice(0, 3).map((country, i) => (
                  <Link
                    key={i}
                    href={`/countries/${country.name.common.replace(
                      /[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g,
                      ""
                    )}`}
                    className={
                      style.CountryCardDetails__textcontent__borders__button
                    }
                  >
                    <LinkButton
                      buttonprops={{
                        title: country.name.common.replace(
                          /[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g,
                          ""
                        ),
                      }}
                    ></LinkButton>
                  </Link>
                ))}
              </nav>
            ) : (
              ""
            )}
          </div>
        </figcaption>
      </figure>
    </>
  );
}

export default CountryCardDetails;
