const pkgConfig = require("./package.json");

const presets = [
  [
    "@babel/env",
    {
      targets: {
        browsers: pkgConfig.browserlist,
      }
    },
  ],
];

const plugins = [];

module.exports = { presets, plugins };