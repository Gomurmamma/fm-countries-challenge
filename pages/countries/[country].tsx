import React from "react";
import Header from "../../components/Header/Header.component";
import CountrySection from "../../components/CountrySection/CountrySection.component";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

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

function Country({ countryData }) {
  console.log("Here's country data object in the page", countryData);

  //const [countryDetails, setCountryDetails] = useState<CardProps>({
  //  country: {
  //    name: "",
  //    population: 0,
  //    region: "",
  //    capital: "",
  //    flag: "",
  //    nativeName: "",
  //    subregion: "",
  //    topLevelDomain: [],
  //    currencies: [],
  //    languages: [],
  //    borders: [],
  //  },
  //});

  //const router = useRouter();

  //useEffect(() => {
  //  const fetchCountryData = async () => {
  //    try {
  //      let res = await axios.get(
  //        `https://restcountries.com/v2/name/${router.query.slug}`
  //      );
  //      console.log("country request", res);
  //      setCountryDetails({
  //        country: {
  //          name: res[0].name,
  //          population: res[0].population,
  //          region: res[0].region,
  //          capital: res[0].capital,
  //          flag: res[0].flag,
  //          nativeName: res[0].nativeName,
  //          subregion: res[0].subregion,
  //          topLevelDomain: res[0].topLevelDomain,
  //          currencies: res[0].currencies,
  //          languages: res[0].languages,
  //          borders: res[0].borders,
  //        },
  //      });
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };
  //
  //  const fetchBorderData = async () => {
  //    try {
  //      let res: CardProps[] = await axios.get(
  //        `https://restcountries.com/v3.1/alpha?codes=${countryDetails.country.borders[0]},${countryDetails.country.borders[1]},${countryDetails.country.borders[2]}`
  //      );
  //      console.log("three border codes endpoint", res);
  //      setCountryDetails({
  //        country: {
  //          name: countryDetails.country.name,
  //          population: countryDetails.country.population,
  //          region: countryDetails.country.region,
  //          capital: countryDetails.country.capital,
  //          flag: countryDetails.country.flag,
  //          nativeName: countryDetails.country.nativeName,
  //          subregion: countryDetails.country.subregion,
  //          topLevelDomain: countryDetails.country.topLevelDomain,
  //          currencies: countryDetails.country.currencies,
  //          languages: countryDetails.country.languages,
  //          borders: res,
  //        },
  //      });
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };
  //
  //  fetchCountryData();
  //  fetchBorderData();
  //}, []);

  return (
    <>
      <Header heading="Where in the World?">
        <ToggleButton />
      </Header>
      <CountrySection country={countryData} />
    </>
  );
}

//TODO
// split at the first space !!!!!!!!!
// if there's no capital then don't render the list item - Overview

export async function getServerSideProps(context) {
  let param_id = context.params.country;
  console.log("Params ID is:", param_id);

  console.log("Removing 'and':", param_id.replace(/(?<=d)and/gm, ""));

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

  console.log("verifying search_id", search_id);
  console.log("verifying param_id", param_id);

  let countryData: CardProps = {
    country: {
      name: "",
      population: 0,
      region: "",
      capital: "",
      flag: "",
      nativeName: "",
      subregion: "",
      topLevelDomain: [],
      currencies: [],
      languages: [],
    },
  };

  //  TODO: Typing for countryResponse
  let countryResponse = undefined;

  try {
    let query_id = undefined;

    // update query_id with search_id or param_id
    search_id === undefined ? (query_id = param_id) : (query_id = search_id);

    let url = `https://restcountries.com/v2/name/${query_id.match(
      /(?<=^)\S[a-z]*/g
    )}`;
    console.log("here's the url:", url);
    console.log("Here's the used id", query_id);

    countryResponse = await axios.get(
      `https://restcountries.com/v2/name/${query_id.match(/(?<=^)\S[a-z]*/g)}`
    );

    console.log("the country response v2:", countryResponse.data);

    // The correct country from the response id === response[i].name.match(/removed spaces/)

    console.log(
      "11111111111 country data object here",
      countryResponse.data[0]
    );
  } catch (error) {
    console.log(error);
  }

  console.log("Before the loop", countryResponse);

  for (let i = 0; i < countryResponse.data.length; i++) {
    console.log("matching loop: id", param_id);
    console.log(
      "matching loop: name",
      countryResponse.data[i].name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "")
    );

    if (
      param_id ===
      countryResponse.data[i].name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "")
    ) {
      console.log("found it!", countryResponse.data[i]);

      countryData = {
        country: {
          name: countryResponse.data[i].name,
          population: countryResponse.data[i].population,
          region: countryResponse.data[i].region,
          capital: countryResponse.data[i].capital
            ? countryResponse.data[i].capital
            : null,
          flag: countryResponse.data[i].flag,
          nativeName: countryResponse.data[i].nativeName,
          subregion: countryResponse.data[i].subregion,
          topLevelDomain: countryResponse.data[i].topLevelDomain,
          currencies: countryResponse.data[i].currencies,
          languages: countryResponse.data[i].languages,
          borders: countryResponse.data[i].borders
            ? countryResponse.data[i].borders
            : null,
        },
      };
    }
  }

  console.log("And the country data!", countryData);

  //try {
  //  let border_res = await axios.get(
  //    `https://restcountries.com/v3.1/alpha?codes=${countryData.country.borders[0]},${countryData.country.borders[1]},${countryData.country.borders[2]}`
  //  );
  //
  //  countryData = {
  //    country: {
  //      name: countryData.country.name,
  //      population: countryData.country.population,
  //      region: countryData.country.region,
  //      capital: countryData.country.capital,
  //      flag: countryData.country.flag,
  //      nativeName: countryData.country.nativeName,
  //      subregion: countryData.country.subregion,
  //      topLevelDomain: countryData.country.topLevelDomain,
  //      currencies: countryData.country.currencies,
  //      languages: countryData.country.languages,
  //      borders: border_res.data,
  //    },
  //  };
  //} catch (error) {
  //  console.log(error);
  //}

  return { props: { countryData } };
}

export default Country;
