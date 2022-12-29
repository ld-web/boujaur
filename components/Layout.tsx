import React from "react";
import Head from "next/head";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>BOUJAUR</title>
        <meta name="description" content="Boujaur - 關於台灣" />
        <link rel="icon" href="/taiwan_flag.png" />
        <meta property="og:title" content="Boujaur - 關於台灣" />
        <meta property="og:description" content="台灣冒險" />
        <meta property="og:image" content="/images/preview.jpg" />
      </Head>

      <main className="grid place-content-center mx-2.5 sm:mx-0">
        {children}
      </main>
    </>
  );
};

export default Layout;
