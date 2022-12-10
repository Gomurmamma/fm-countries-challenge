import React from "react";
import style from "./SearchResults.module.scss";

type ResultsProps = {
  result: object[];
};

const SearchResults: React.FC = ({ results }: ResultsProps) => {
  return <section className={style.SearchResults}>{results}</section>;
};

export default SearchResults;
