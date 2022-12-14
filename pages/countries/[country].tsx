import React from "react";
import Header from "../../components/Header/Header.component";
import CountrySection from "../../components/CountrySection/CountrySection.component";
import dynamic from "next/dynamic";

const ToggleButton = dynamic(
  () => import("../../components/ToggleButton/ToggleButton.component"),
  {
    ssr: false,
  }
);

const Country: React.FC = () => {
  return (
    <>
      <Header heading="Where in the World?">
        <ToggleButton />
      </Header>
      <CountrySection />
    </>
  );
};

export default Country;
