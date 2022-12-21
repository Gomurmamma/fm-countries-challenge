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

function Country({ countryData, borderCountries }) {
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
      <CountrySection country={countryData} borderCountries={borderCountries} />
    </>
  );
}

async function getCountry(param_id: string, name: string) {
  console.log("&&&&&&& the name", name);

  const res = await fetch(
    `https://restcountries.com/v2/name/${name.match(/(?<=^)\S[a-z]*/g)}`
  );

  const data = await res.json();

  console.log("getCountry response", data);

  if (data.length === 1) {
    console.log("Only one result!", data[0]);

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

  console.log("before the loop data", data);

  for (let i = 0; i < data.length; i++) {
    console.log("matching loop: id", param_id);
    console.log(
      "native name match:",
      data[i].nativeName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "")
    );
    //console.log(
    //  "matching loop name regex:",
    //  data[0].name.match(/(?<=^)\S[a-z]*/g)[0]
    //);
    console.log("name unedited for country:", data[i].name);
    console.log("Check out altSpellings:", data[i].altSpellings);
    //console.log(
    //  "matching loop name regex:",
    //  data[0].name.match(/(?<=^)\S[a-z]*/g)[0]
    //);
    //console.log(
    //  "matching loop: name",
    //  data[i].name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "")
    //);

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

  console.log("border countries response", data);
  return data;
}

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
  if (param_id.match(/(?:Republicofthe)/g)) {
    // Republic of the Congo
    search_id = param_id.replace(/(?:Republicofthe)/g, "");
  }

  console.log("verifying search_id", search_id);
  console.log("verifying param_id", param_id);

  //let countryData: CardProps = {
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
  //  },
  //};

  //  TODO: Typing for countryResponse
  let countryResponse = undefined;

  let query_id = undefined;

  // update query_id to param_id if search_id was never used
  search_id === undefined ? (query_id = param_id) : (query_id = search_id);

  console.log("Final query ID:", query_id);
  console.log("Final param_id:", param_id);

  const countryData = await getCountry(param_id, query_id);

  let borderCountries = undefined;

  if (countryData.country.borders) {
    borderCountries = await getBorderCountryNames(countryData);

    console.log(
      "Here are the bordering countries you asked for boss:",
      borderCountries
    );

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
