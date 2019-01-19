"use strict";

const sass = require("node-sass");
const autoprefixer = require('autoprefixer');
const postcss  = require('postcss');
const path = require("path");
const pkgConfig = require("../package.json");
const fs = require("hexo-fs");

hexo.extend.renderer.register("scss", "css", (data, options) => {
  const renderedCss = sass.renderSync({
    data: data.text,
    includePaths: [
      path.join(__dirname, "../source/css"),
    ],
    outputStyle: "compressed",
  });

  const result = postcss([ autoprefixer({browsers: pkgConfig.browserslist}) ])
  .process(renderedCss.css.toString(), { browsers: pkgConfig.browserslist })
  .css;

  return result;
}, true);