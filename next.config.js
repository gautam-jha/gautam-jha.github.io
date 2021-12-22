/** @type {import('next').NextConfig} */
const path = require('path');
const debug = process.env.NODE_ENV !== 'production'


module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  assetPrefix: !debug ? 'https://gautam-jha.github.io/' : '',
}
