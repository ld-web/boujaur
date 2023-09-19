import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ThemeProvider>
  );
}
