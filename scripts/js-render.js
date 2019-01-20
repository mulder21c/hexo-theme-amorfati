const uglifyJS = require("uglify-js");
const babel = require("@babel/core");
const path = require("path");

hexo.extend.filter.register('after_render:js', (str, data) => {
  if(/webfontloader\.js$/.test(data.path)) return str;

  const babelOpt = {
    cwd: path.join(__dirname, '../'),
    sourceMaps: false,
    sourceType: 'script',
    minified: false,
    comments: false,
    babelrcRoots: '../',
  };

  const transformed = babel.transformSync(str, babelOpt);

  const result = uglifyJS.minify(transformed.code, {
    compress: {
      dead_code: false,
      unused: false,
    },
    mangle: {
      toplevel: true
    }
  });

  return result.code;
});