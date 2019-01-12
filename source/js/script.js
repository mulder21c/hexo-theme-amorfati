/**
 * polyfill for Element.matches
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

const debounce = (fn, wait) => {
  let timer;
  return function() {
    const fnCall = () => fn.apply(this, arguments);
    clearTimeout(timer);
    timer = setTimeout(fnCall, wait)
  }
};

((doc) => {
  const menuBtn = doc.getElementsByClassName('nav-toggle')[0];
  const panel = doc.getElementsByClassName('nav')[0];
  const rootEl = doc.documentElement;
  const tabbable = panel.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstTabbable = tabbable[0];
  const lastTabbable = tabbable[tabbable.length - 1];

  function isVisible() {
    return panel.classList.contains('nav--animate');
  }

  function openPanel() {
    rootEl.classList.add('sidebar-opened');
    debounce(() => {
      panel.classList.add('nav--animate');
      panel.setAttribute('aria-hidden', 'false');
      menuBtn.lastChild.textContent = `close`;
      menuBtn.setAttribute('aria-expanded', 'true');
      setIntertness(panel);
    }, 50)();
  }

  function closePanel() {
    unsetInertness();
    panel.classList.remove('nav--animate');
  }

  function bindKeyEvt(event) {
    event = event || windows.event;
    const {keyCode, which, target, srcElement, shiftKey} = event;
    const keycode = keyCode || which;
    const el = target || srcElement;
    switch (keycode) {
      case 27:
        if(isVisible()) closePanel();
        break;
      case 9:
        if(isVisible() && el === menuBtn && shiftKey) {
          event.preventDefault();
          event.stopPropagation();
          lastTabbable.focus();
        }else if (isVisible() && el === menuBtn && !shiftKey) {
          event.preventDefault();
          event.stopPropagation();
          firstTabbable.focus();
        }else if(el === firstTabbable && shiftKey) {
          event.preventDefault();
          event.stopPropagation();
          menuBtn.focus();
        }else if(el === lastTabbable && !shiftKey) {
          event.preventDefault();
          event.stopPropagation();
          menuBtn.focus();
        }
    }
  }

  function toggleNavigation() {
    if(isVisible()) closePanel();
    else openPanel();
  }

  function setIntertness(panel) {
    const ommits = ['.gnb', 'style', 'meta', 'link', 'base', 'script', '.nav'];
    for(let i = -1, node; node = panel.parentNode.children[++i];) {
      if(node === panel || node.matches(ommits.join(',')))
        continue;
      node.setAttribute('aria-hidden', 'true');
      node.setAttribute('inert', '');
    }
  }

  function unsetInertness() {
    const nodes = doc.querySelectorAll('[inert]');
    for(let i = -1, node; node = nodes[++i];){
      node.removeAttribute('aria-hidden');
      node.removeAttribute('inert');
    }
  }

  panel.addEventListener('transitionend', () => {
    debounce(() => {
      if(isVisible()) {
        firstTabbable.focus();
      }else{
        menuBtn.lastChild.textContent = `menu`;
        menuBtn.setAttribute('aria-expanded', 'false');
        rootEl.classList.remove('sidebar-opened');
        panel.setAttribute('aria-hidden', 'true');
        menuBtn.focus();
      }
    }, 20)();
  } ,false);

  menuBtn.addEventListener('click', toggleNavigation, false);
  document.addEventListener('keydown', bindKeyEvt, false);
})(document);