import React from "react";
import Header from "../components/Header/Header.component";
import SearchFeatures from "../components/SearchFeatures/SearchFeatures.component";
import SearchResults from "../components/SearchResults/SearchResults.component";

import dynamic from "next/dynamic";

const ToggleButton = dynamic(
  () => import("../components/ToggleButton/ToggleButton.component"),
  {
    ssr: false,
  }
);

const Homepage: React.FunctionComponent = () => {
  return (
    <>
      <Header heading="Where in the World?">
        <ToggleButton />
      </Header>
      <SearchFeatures />
      <SearchResults />
    </>
  );
};

export default Homepage;
