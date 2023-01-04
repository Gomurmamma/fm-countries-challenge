import React, { useState } from "react";
import Header from "../components/Header/Header.component";
import SearchFeatures from "../components/SearchFeatures/SearchFeatures.component";

import dynamic from "next/dynamic";

type Props = {
  countriesData: Country[];
};

type Country = {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
};

const ToggleButton = dynamic(
  () => import("../components/ToggleButton/ToggleButton.component"),
  {
    ssr: false,
  }
);

const Homepage: React.FunctionComponent = ({ countriesData }: Props) => {
  return (
    <>
      <Header heading="Where in the World?">
        <ToggleButton />
      </Header>
      <SearchFeatures countriesData={countriesData} />
    </>
  );
};
export async function getServerSideProps(context) {
  const res = await fetch("https://restcountries.com/v2/all");
  const countriesData: Country[] = await res.json();

  return { props: { countriesData } };
}

export default Homepage;
