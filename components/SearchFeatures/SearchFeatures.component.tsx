import React, { useState, useEffect } from "react";
import axios from "axios";

import style from "./SearchFeatures.module.scss";
import { RxMagnifyingGlass } from "react-icons/rx";
import SearchResults from "../SearchResults/SearchResults.component";

const SearchFeatures: React.FC = () => {
  // Value from Search input
  const [searchField, setSearchField] = useState("");
  // Unfiltered Country Data from API
  const [countryResults, setCountryResults] = useState([]);
  // Region filter
  const [regionFilter, setRegionFilter] = useState("");
  // Filtered country data
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Data request
  const countrySearch = async (e) => {
    e.preventDefault();

    try {
      // If no value in Search, return all countries on Enter
      if (!searchField) {
        const response = await axios.get(`https://restcountries.com/v2/all`);
        setCountryResults(response.data);
      }

      // Search contains value to query
      const response = await axios.get(
        `https://restcountries.com/v2/name/${searchField}`
      );
      setCountryResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter countryResults against chosen regionFilter
  const filterByRegion = (countryResults) => {
    if (!regionFilter || regionFilter === "") {
      return countryResults;
    }

    const filteredCountries = countryResults.filter(
      (country) => country.region === regionFilter
    );
    return filteredCountries;
  };

  // Region 'Select' event handler
  const handleRegionChange = (event) => {
    setRegionFilter(event.target.value);
  };

  // Request data to display on first visit
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v2/all`);
        setCountryResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Update display if new Search request or Filter applied
  useEffect(() => {
    let filteredData = filterByRegion(countryResults);
    setFilteredCountries(filteredData);
  }, [countryResults, regionFilter]);

  return (
    <section className={style.SearchFeatures}>
      <form className={style.SearchInput} onSubmit={countrySearch}>
        <div className={style.SearchInput__inputContainer}>
          <button
            type="submit"
            onChange={countrySearch}
            className={style.SearchInput__button}
            title="Enter search"
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
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
            }}
          ></input>
        </div>
        <select
          id="region"
          name="region"
          value={regionFilter}
          onChange={handleRegionChange}
          className={style.SearchFilter}
        >
          <option value="">
            {regionFilter === ""
              ? "Filter by Region"
              : `Current Region: ${regionFilter}`}
          </option>
          {regionFilter !== "" ? <option value="">No filter</option> : <></>}
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </form>
      <SearchResults countries={filteredCountries} />
    </section>
  );
};

export default SearchFeatures;
