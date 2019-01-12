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
      <a href="${menus[menu]}" ${isCurrent ? 'aria-current="page"' : '' }>
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
 * @param {Obejct} [options]
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
        <a href="${item.url}" target="_blank" class="${opts.itemClass}">${item.name}</a>
      </li>
    `;
    return html;
  }, `<${opts.wrapperEl} class="${opts.wrapperClass}">`) + `</${opts.wrapperEl}>`;
});

/**
 * @decription give hero image's information. if there is oen for page then use that, otherwise use theme's one.
 * @param {Object} page you should use `page` as value of this parameter
 * @parem {Obejct} theme you should use `theme` as value of this parameter
 * @return {{hasHero: Boolean, imageUrl: String, style: String}}
 */
hexo.extend.helper.register('get_hero', (page, theme) => {
  let res = {};
  let context = page && page.hero || theme.hero;
  let style = null;

  if(!!context) {
    style = `background-image: url(${context.url || context});`;
    style += context.position ? `background-position: ${context.position};` : ``;
    style += context.size ? `background-size: ${context.size};` : ``;
  }

  return {
    hasHero: !!context,
    imageUrl: context && context.url,
    style,
  }
});