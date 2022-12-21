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
    <ul>
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
        <figcaption>
          <h2>{country.name}</h2>
          <ul>
            <div>
              <ul>
                <li>
                  <span>Native Name:</span> {country.nativeName}
                </li>
                <li>
                  <span>Population:</span> {country.population}
                </li>
                <li>
                  <span>Region:</span> {country.region}
                </li>
                <li>
                  <span>Sub Region:</span> {country.subregion}
                </li>
                <li>
                  <span>Capital:</span> {country.capital}
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <span>Top Level Domain: {country.topLevelDomain}</span>
                </li>
                <li>
                  <span>Currencies: </span>
                  {
                    <ul>
                      {country.currencies
                        ? country.currencies.map((currency, i) => (
                            <li key={i}>{currency.name} </li>
                          ))
                        : ""}
                    </ul>
                  }
                </li>

                <li>
                  <span>Languages: </span>
                  {
                    // Renders single language, or languages with commas & spaces
                    country.languages?.length === 1 ? (
                      `${country.languages[0].name}`
                    ) : (
                      <ul>
                        {country.languages?.map((language, i) => (
                          <li key={i}>{language.name} </li>
                        ))}
                      </ul>
                    )
                  }
                </li>
              </ul>
            </div>
          </ul>
          <div>
            <p>Border Countries:</p>
            {borderCountries ? (
              <nav>
                {borderCountries.slice(0, 3).map((country, i) => (
                  <Link
                    key={i}
                    href={`/countries/${country.name.common.replace(
                      /[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g,
                      ""
                    )}`}
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
