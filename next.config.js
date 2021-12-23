/** @type {import('next').NextConfig} */
const dev = process.env.NODE_ENV !== "production";

const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  assetPrefix: dev ? "http://localhost:3000" : "https://gautam-jha.github.io",
}
