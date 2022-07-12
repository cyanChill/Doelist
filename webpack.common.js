const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new InjectManifest({
      swSrc: "./src/base-sw.js",
      swDest: "service-worker.js",
    }),
  ],
  module: {
    rules: [{ test: /\.html$/, use: ["html-loader"] }],
  },
};
