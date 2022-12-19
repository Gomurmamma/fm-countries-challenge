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
    capital: string;
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
// if there's no capital then don't render the list item

export async function getServerSideProps(context) {
  const id = context.params.country;
  console.log("Params ID is:", id);

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

  try {
    let url = `https://restcountries.com/v2/name/${id}`;
    console.log("here's the url:", url);

    let country_res = await axios.get(
      `https://restcountries.com/v2/name/${id}`
    );

    console.log("the country response v2:", country_res.data[0]);

    countryData = {
      country: {
        name: country_res.data[0].name,
        population: country_res.data[0].population,
        region: country_res.data[0].region,
        capital: country_res.data[0].capital,
        flag: country_res.data[0].flag,
        nativeName: country_res.data[0].nativeName,
        subregion: country_res.data[0].subregion,
        topLevelDomain: country_res.data[0].topLevelDomain,
        currencies: country_res.data[0].currencies,
        languages: country_res.data[0].languages,
        borders: country_res.data[0].borders
          ? country_res.data[0].borders
          : undefined,
      },
    };

    console.log("11111111111 country data object here", countryData.country);
  } catch (error) {
    console.log(error);
  }

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
