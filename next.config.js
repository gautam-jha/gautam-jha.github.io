/** @type {import('next').NextConfig} */
const dev = process.env.NODE_ENV !== "production";
const server = dev ? "http://localhost:3000" : "https://gautam-jha.github.io";

const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  assetPrefix: server,
}
