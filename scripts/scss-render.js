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

hexo.extend.helper.register('scss_post', (scss) => {
  if(!scss) return ``;

  const mixin = fs.readFileSync(path.join(__dirname, "../source/css/helpers/_mixin.scss"));
  const functions = fs.readFileSync(path.join(__dirname, "../source/css/modules/_functions.scss"));
  const variables = fs.readFileSync(path.join(__dirname, "../source/css/modules/_variables.scss"));

  scss = `
    ${mixin}
    ${functions}
    ${variables}
  ` + scss;

  const renderedCss = sass.renderSync({
    data: scss,
    outputStyle: "compressed",
  });

  const result = postcss([ autoprefixer({browsers: pkgConfig.browserslist}) ])
  .process(renderedCss.css.toString(), { browsers: pkgConfig.browserslist })
  .css;

  return result;
});