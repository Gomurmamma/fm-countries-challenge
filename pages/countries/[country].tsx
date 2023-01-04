import React from "react";
import Header from "../../components/Header/Header.component";
import CountrySection from "../../components/CountrySection/CountrySection.component";
import dynamic from "next/dynamic";
import Head from "next/head";

type currencyObj = {
  currency: {
    name: string;
  };
};

type CardProps = {
  country: {
    name: string;
    population: number;
    region: string;
    capital?: string | null;
    flag: string;
    nativeName: string;
    subregion: string;
    topLevelDomain: string[];
    currencies: currencyObj[];
    languages: any[];
    borders?: any[];
  };
};

const ToggleButton = dynamic(
  () => import("../../components/ToggleButton/ToggleButton.component"),
  {
    ssr: false,
  }
);

function Country({ countryData, borderCountries }) {
  return (
    <>
      <Head>
        <title>
          {`${countryData.country.name} - `}Countries API Challenge - Tony Young
        </title>
        <meta
          name="description"
          content={`Information on the country ${countryData.country.name}. This is a solution to the Front End Mentors.io challenge. Contact Tony Young for more info.`}
          key="desc"
        ></meta>
      </Head>
      <Header heading="Where in the World?">
        <ToggleButton />
      </Header>
      <CountrySection country={countryData} borderCountries={borderCountries} />
    </>
  );
}

async function getCountry(param_id: string, name: string) {
  const res = await fetch(
    `https://restcountries.com/v2/name/${name.match(/(?<=^)\S[a-z]*/g)}`
  );

  const data = await res.json();

  if (data.length === 1) {
    const countryData = {
      country: {
        name: data[0].name,
        population: data[0].population,
        region: data[0].region,
        capital: data[0].capital ? data[0].capital : null,
        flag: data[0].flag,
        nativeName: data[0].nativeName,
        subregion: data[0].subregion,
        topLevelDomain: data[0].topLevelDomain,
        currencies: data[0].currencies ? data[0].currencies : null,
        languages: data[0].languages,
        borders: data[0].borders ? data[0].borders : null,
      },
    };

    return countryData;
  }

  for (let i = 0; i < data.length; i++) {
    if (
      param_id ===
        data[i].nativeName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "") || // United States
      param_id === data[i].name.match(/(?<=^)\S[a-z]*/g)[0] || // Iran - Islamic Republic of
      param_id === data[i].name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "") || // Åland Islands
      data[i].altSpellings.find(
        (altName) =>
          altName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "") === param_id
      ) || // DR Congo: common name from v3.1 is in altSpellings from v2
      name === data[i].name // Congo, Republic of
    ) {
      console.log("found it!", data[i]);

      const countryData = {
        country: {
          name: data[i].name,
          population: data[i].population,
          region: data[i].region,
          capital: data[i].capital ? data[i].capital : null,
          flag: data[i].flag,
          nativeName: data[i].nativeName,
          subregion: data[i].subregion,
          topLevelDomain: data[i].topLevelDomain,
          currencies: data[i].currencies ? data[i].currencies : null,
          languages: data[i].languages,
          borders: data[i].borders ? data[i].borders : null,
        },
      };

      return countryData;
    }
  }
}

async function getBorderCountryNames(country) {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${country.country.borders[0]},${country.country.borders[1]},${country.country.borders[2]}`
  );
  const data = await res.json();

  return data;
}

export async function getServerSideProps(context) {
  let param_id = context.params.country;

  let search_id = undefined;

  // Remove 'and' from Country Name if following 's', 'd', or 'a'
  if (param_id.match(/(?:dand)/gm))
    // Trinidad and Tobago
    search_id = param_id.replace(/(?<=d)and/gm, "");
  if (param_id.match(/(?:sand)/gm))
    // Wallis and Futuna
    search_id = param_id.replace(/(?<=s)and/gm, "");
  if (param_id.match(/(?:aand)/gm))
    // Antigua and Barbuda, Bosnia and Herzegovina
    search_id = param_id.replace(/(?<=a)and/gm, "");
  if (param_id.match(/(?:Republicofthe)/g)) {
    // Republic of the Congo
    search_id = param_id.replace(/(?:Republicofthe)/g, "");
  }

  let countryResponse = undefined;

  let query_id = undefined;

  // update query_id to param_id if search_id was never used
  search_id === undefined ? (query_id = param_id) : (query_id = search_id);

  const countryData = await getCountry(param_id, query_id);

  let borderCountries = undefined;

  if (countryData.country.borders) {
    borderCountries = await getBorderCountryNames(countryData);

    return {
      props: {
        countryData,
        borderCountries,
      },
    };
  }

  return { props: { countryData } };
}

export default Country;
