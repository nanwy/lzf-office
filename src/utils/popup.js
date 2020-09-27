import Vue from 'vue';
// import merge from 'element-ui/src/utils/merge';
import PopupManager from './popup-manager';
// import getScrollBarWidth from '../scrollbar-width';
// import { getStyle, addClass, removeClass, hasClass } from '../dom';

let idSeed = 1;

let scrollBarWidth;

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};


function getScrollBarWidth() {
  if (Vue.prototype.$isServer) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};


function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};
const isServer = Vue.prototype.$isServer;
const ieVersion = isServer ? 0 : Number(document.documentMode);

const getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    PopupManager.register(this._popupId, this);
  },

  beforeDestroy() {
    PopupManager.deregister(this._popupId);
    PopupManager.closeModal(this._popupId);

    this.restoreBodyStyle();
  },

  data() {
    return {
      opened: false,
      bodyPaddingRight: null,
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false
    };
  },

  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          Vue.nextTick(() => {
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },

  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true;
      }

      const props = merge({}, this.$props || this, options);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },

    doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;

      this._opening = true;

      const dom = this.$el;

      const modal = props.modal;

      const zIndex = props.zIndex;
      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._popupId);
          this._closing = false;
        }
        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade);
        if (props.lockScroll) {
          this.withoutHiddenClass = !hasClass(document.body, 'el-popup-parent--hidden');
          if (this.withoutHiddenClass) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 20);
          }
          scrollBarWidth = getScrollBarWidth();
          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          let bodyOverflowY = getStyle(document.body, 'overflowY');
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
            document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px';
          }
          addClass(document.body, 'el-popup-parent--hidden');
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      dom.style.zIndex = PopupManager.nextZIndex();
      this.opened = true;

      this.onOpen && this.onOpen();

      this.doAfterOpen();
    },

    doAfterOpen() {
      this._opening = false;
    },

    close() {
      if (this.willClose && !this.willClose()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);

      const closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },

    doClose() {
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }

      this.opened = false;

      this.doAfterClose();
    },

    doAfterClose() {
      PopupManager.closeModal(this._popupId);
      this._closing = false;
    },

    restoreBodyStyle() {
      if (this.modal && this.withoutHiddenClass) {
        document.body.style.paddingRight = this.bodyPaddingRight;
        removeClass(document.body, 'el-popup-parent--hidden');
      }
      this.withoutHiddenClass = true;
    }
  }
};

export {
  PopupManager
};
