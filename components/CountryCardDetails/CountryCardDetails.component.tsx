import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./CountryCardDetails.module.scss";

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

function borderCountries(borders: string[]) {
  // Initialize borderCountries[]
  let borderCountries: string[] = [];

  // borders array reduced to first 3 items into borderCountries[]
  for (let i = 0; i < 3; i++) {
    borderCountries[i] = borders[i];
  }

  // map borders array to li's
  return (
    <ul>
      {borderCountries.map((country, i) => (
        <li key={i}>{country}</li>
      ))}
    </ul>
  );
}

function CountryCardDetails({ country }: CardProps) {
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
                  <span>Capital</span> {country.capital}
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
                    // Renders single currency, or currencies with commas & spaces
                    country.currencies.length === 1 ? (
                      `${country.currencies[0].currency.name}`
                    ) : (
                      <ul>
                        {country.currencies.map((currency, i) => (
                          <li key={i}>`${currency.currency.name}, `</li>
                        ))}
                      </ul>
                    )
                  }
                </li>

                <li>
                  <span>Languages:</span>
                  {
                    // Renders single language, or languages with commas & spaces
                    country.languages.length === 1 ? (
                      `${country.languages[0].language.name}`
                    ) : (
                      <ul>
                        {country.languages.map((language, i) => (
                          <li key={i}>{language.language.name} </li>
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
            <nav>{borderCountries(country.borders)}</nav>
          </div>
        </figcaption>
      </figure>
    </>
  );
}

export default CountryCardDetails;
