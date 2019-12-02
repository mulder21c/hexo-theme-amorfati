const sass = require("node-sass");
const autoprefixer = require('autoprefixer');
const postcss  = require('postcss');
const path = require("path");
const pkgConfig = require("../package.json");
const fs = require("hexo-fs");

/**
 * @description create menu list from theme config (_config.yml)
 * @param {Object} menus you should use `theme.menu` as value of this parameter
 * @param {String} currPath you should use `page.path` as value of this parameter
 * @param {Object} [options]
 * @param {String} [options.wrapperEl=ul] The tag name wrapping menu list
 * @param {String} [options.wrapperClass=menu-list] The class name used for wrapper element
 * @param {String} [options.itemClass=menu-item] The class name used for each menu
 * @param {String} [options.currClass=current] The class name to indicate that this is the current page
 * @param {Boolean} [options.showCurrent=false] Whether to indicate that this is the current page
 * @return {String} HTML String
 * @example
 *    list_menu(theme.menu, page.path [, {showCurrent: true} ])
 */
hexo.extend.helper.register('list_menu', (menus, currPath, options) => {
  const opts = Object.assign({
    wrapperEl: 'ul',
    wrapperClass: 'menu-list',
    itemClass: 'menu-item',
    currClass: 'current',
    showCurrent: false,
  }, options);

  let html = `<${opts.wrapperEl} class="${opts.wrapperClass}">`;
  for(menu in menus) {
    let isCurrent = currPath.replace(/\/*index.html$/, '') === menus[menu].replace(/^\/|index\.html$/g,'');
    html += `
    <li class="${opts.itemClass + (isCurrent ? ' ' + opts.currClass : '') }" >
      <a href="${hexo.extend.helper.store['url_for'].call(hexo, menus[menu])}" ${isCurrent ? 'aria-current="page"' : '' }>
        ${menu.toLowerCase()}
      </a>
    </li>`;
  }
  html += `</${opts.wrapperEl}>`;
  return html;
});


/**
 * @decription create list of links to use for navigation from theme config(_config.yml)
 * @param {Array} links you should use `theme.links` as value of this parameter
 * @param {Object} [options]
 * @param {String} [options.wrapperEl=ul] The tag name wrapping external link list
 * @param {String} [options.wrapperClass=link-list] The class name used for wrapper element
 * @param {String} [options.itemClass=link-item] The class name used for each menu
 * @return {String} HTML String
 * @example
 *    list_external_links(theme.links)
 */
hexo.extend.helper.register('list_external_links', (links, options) => {
  const opts = Object.assign({
    wrapperEl: 'ul',
    wrapperClass: 'link-list',
    itemClass: 'link-item',
  }, options);

  return links.reduce((html, item) => {
    html += `
      <li>
        <a href="${hexo.extend.helper.store['resolve_url'].call(hexo, item.url)}" target="_blank" class="${opts.itemClass}">${item.name}</a>
      </li>
    `;
    return html;
  }, `<${opts.wrapperEl} class="${opts.wrapperClass}">`) + `</${opts.wrapperEl}>`;
});

/**
 * @decription give hero image's information. if there is oen for page then use that, otherwise use theme's one.
 * @param {Object} page you should use `page` as value of this parameter
 * @param {Object} theme you should use `theme` as value of this parameter
 * @return {{hasHero: Boolean, url: String, width: Number, height: Number, style: String}}
 */
hexo.extend.helper.register('get_hero', (page, theme) => {
  const defaults = {
    url: null,
    width: null,
    height: null,
    position: null,
    size: null,
  };

  let hero = !!page.__post
    ? !!page.hero && typeof page.hero === 'object' ? page.hero : Object.assign({}, defaults, {url: page.hero})
    : defaults;

  hero = hero.url
    ? hero
    : !!theme.hero && typeof theme.hero === 'object' ? theme.hero : Object.assign({}, defaults, {url: theme.hero});

  if(!!hero.url) {
    style = `background-image: url(${hexo.extend.helper.store['url_for'].call(hexo, hero.url)});`;
    style += hero.position ? `background-position: ${hero.position};` : ``;
    style += hero.size ? `background-size: ${hero.size};` : ``;
  }else {
    style = ``;
  }

  return {
    hasHero: !!hero.url,
    url: hero && hero.url,
    width: hero && hero.width,
    height: hero && hero.height,
    style,
  }
});

/**
 * @decription return css from front-matter for post-specific style
 * @param {String} scss
 * @return {String} processed css text through scss-renderer and autoprefixer
 */
hexo.extend.helper.register('scss_post', (scss) => {
  if(!scss) return ``;

  const mixin = fs.readFileSync(path.join(__dirname, "../source/css/helpers/_mixin.scss"));
  const placeholder = fs.readFileSync(path.join(__dirname, "../source/css/helpers/_placeholder.scss"));
  const functions = fs.readFileSync(path.join(__dirname, "../source/css/modules/_functions.scss"));
  const variables = fs.readFileSync(path.join(__dirname, "../source/css/modules/_variables.scss"));

  scss = `
    ${mixin}
    ${functions}
    ${placeholder}
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

/**
 * @descript return full url from relative/absolute URL
 * @param {String} url
 * @return {String}
 */
hexo.extend.helper.register('full_url', (url) => {
  if (!url) return;
  const {origin, protocol} = new URL(hexo.config.url);

  if(/^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(url)) {
    return url;
  }
  if(url.substring(0,2) == '//') {
    url = hexo.extend.helper.store['url_for'].call(hexo, url);
    return protocol + url;
  }

  return origin + url;
})

/**
 * @descript return info of representive image
 * @param {Object} seoImage seo data for the post
 * @param {Object} hero hero data for the post
 * @return {Object}
 */
hexo.extend.helper.register('get_represent_image', (seoImage, hero) => {
  let obj = {};
  const defaults = {
    url: null,
    width: null,
    height: null,
  };

  if (!seoImage && !hero.hasHero) return null;

  if(!seoImage) {
    obj = typeof hero === 'string' ? Object.assign({}, defaults, {url: hero}) : Object.assign({}, defaults, hero);
  }else {
    obj = typeof seoImage === 'string' ? Object.assign({}, defaults, {url: seoImage}) : Object.assign({}, defaults, seoImage);
  }

  return obj;
});

hexo.extend.helper.register('resolve_url', (url) => {
  const hasProtocol = /^http|\/\//.test(url);

  return hasProtocol ? url : url = hexo.extend.helper.store['url_for'].call(hexo, url);
});
