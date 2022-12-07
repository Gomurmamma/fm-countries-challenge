import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/global.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta httpEquiv="X-UA-Compatible" content="IE-Edge" />
        <title>Countries Here, Get Your Countries Here!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
