import React, { useState } from "react";
import Header from "../components/Header/Header.component";
import SearchFeatures from "../components/SearchFeatures/SearchFeatures.component";
import Head from "next/head";

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
      <Head>
        <title>REST Countries API Challenge - Tony Young</title>
        <meta
          name="description"
          content="This is a solution to the Front End Mentors .io challenge. Contact Tony Young for more info."
          key="desc"
        ></meta>
      </Head>
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
