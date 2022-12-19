/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["fr", "zh"],
    defaultLocale: "fr",
    localeDetection: false,
  },
};

module.exports = nextConfig;
