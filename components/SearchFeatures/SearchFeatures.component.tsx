import React, { useState } from "react";
import axios from "axios";

import style from "./SearchFeatures.module.scss";
import { RxMagnifyingGlass } from "react-icons/rx";
import SearchResults from "../SearchResults/SearchResults.component";

const SearchFeatures: React.FC = () => {
  const [country, setCountry] = useState("");
  const [countryResults, setCountryResults] = useState([]);
  const [region, setRegion] = useState("");

  const countrySearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );
      setCountryResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const countryFilter = () => {
    if (region === "") {
      const filteredCountryResults = countryResults;
      console.log(filteredCountryResults);
    } else if (region !== "") {
      const filteredCountryResults = countryResults.filter(
        (country) => country.region === `${region}`
      );
      console.log(filteredCountryResults);
    }
  };

  return (
    <section className={style.SearchFeatures}>
      <form className={style.SearchInput} onSubmit={countrySearch}>
        <div className={style.SearchInput__inputContainer}>
          <button
            type="submit"
            onClick={countrySearch}
            className={style.SearchInput__button}
          >
            <RxMagnifyingGlass className={style.SearchInput__magnifyingGlass} />
          </button>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Search for a country..."
            title="Search for a country"
            className={style.SearchInput__input}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              console.log(country);
            }}
          ></input>
        </div>
        <select
          id="region"
          name="region"
          value={region}
          onChange={(e) => {
            console.log(e.target.value);
            setRegion(e.target.value);
            countryFilter();
          }}
        >
          <option value="">
            {region === "" ? "Filter by Region" : `Current Region: ${region}`}
          </option>
          {region !== "" ? <option value="">No filter</option> : <></>}
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </form>
      <SearchResults />
    </section>
  );
};

export default SearchFeatures;
