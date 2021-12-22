const dev = process.env.NODE_ENV !== "production";
const server = dev ? "http://localhost:3000" : "https://gautam-jha.github.io";

module.exports = {
  'process.env.BACKEND_URL': server,
}