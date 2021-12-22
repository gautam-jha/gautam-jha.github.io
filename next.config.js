/** @type {import('next').NextConfig} */
const { server } = require("./config")

const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  assetPrefix: server,
}
