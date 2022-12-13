import React from "react";
import Head from "next/head";

const Layout = ({ children }: { children?: React.ReactNode }) => (
  <>
    <Head>
      <title>BOUJAUR</title>
      <meta name="description" content="Boujaur - 關於台灣" />
      <link rel="icon" href="/taiwan_flag.png" />
    </Head>

    <main className="grid place-content-center mx-2.5 sm:mx-0 text-justify">
      {children}
    </main>
  </>
);

export default Layout;
