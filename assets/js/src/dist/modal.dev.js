"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./util/index.js");

var _eventHandler = _interopRequireDefault(require("./dom/event-handler.js"));

var _selectorEngine = _interopRequireDefault(require("./dom/selector-engine.js"));

var _scrollbar = _interopRequireDefault(require("./util/scrollbar.js"));

var _baseComponent = _interopRequireDefault(require("./base-component.js"));

var _backdrop = _interopRequireDefault(require("./util/backdrop.js"));

var _focustrap = _interopRequireDefault(require("./util/focustrap.js"));

var _componentFunctions = require("./util/component-functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NAME = 'modal';
var DATA_KEY = 'bs.modal';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var ESCAPE_KEY = 'Escape';
var EVENT_HIDE = "hide".concat(EVENT_KEY);
var EVENT_HIDE_PREVENTED = "hidePrevented".concat(EVENT_KEY);
var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
var EVENT_SHOW = "show".concat(EVENT_KEY);
var EVENT_SHOWN = "shown".concat(EVENT_KEY);
var EVENT_RESIZE = "resize".concat(EVENT_KEY);
var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY);
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss".concat(EVENT_KEY);
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss".concat(EVENT_KEY);
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY).concat(DATA_API_KEY);
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var OPEN_SELECTOR = '.modal.show';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
var Default = {
  backdrop: true,
  focus: true,
  keyboard: true
};
var DefaultType = {
  backdrop: '(boolean|string)',
  focus: 'boolean',
  keyboard: 'boolean'
};
/**
 * Class definition
 */

var Modal =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(Modal, _BaseComponent);

  function Modal(element, config) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this, element, config));
    _this._dialog = _selectorEngine["default"].findOne(SELECTOR_DIALOG, _this._element);
    _this._backdrop = _this._initializeBackDrop();
    _this._focustrap = _this._initializeFocusTrap();
    _this._isShown = false;
    _this._isTransitioning = false;
    _this._scrollBar = new _scrollbar["default"]();

    _this._addEventListeners();

    return _this;
  } // Getters


  _createClass(Modal, [{
    key: "toggle",
    // Public
    value: function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this2 = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      var showEvent = _eventHandler["default"].trigger(this._element, EVENT_SHOW, {
        relatedTarget: relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._isTransitioning = true;

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._backdrop.show(function () {
        return _this2._showElement(relatedTarget);
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = _eventHandler["default"].trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;
      this._isTransitioning = true;

      this._focustrap.deactivate();

      this._element.classList.remove(CLASS_NAME_SHOW);

      this._queueCallback(function () {
        return _this3._hideModal();
      }, this._element, this._isAnimated());
    }
  }, {
    key: "dispose",
    value: function dispose() {
      for (var _i = 0, _arr = [window, this._dialog]; _i < _arr.length; _i++) {
        var htmlElement = _arr[_i];

        _eventHandler["default"].off(htmlElement, EVENT_KEY);
      }

      this._backdrop.dispose();

      this._focustrap.deactivate();

      _get(_getPrototypeOf(Modal.prototype), "dispose", this).call(this);
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate() {
      this._adjustDialog();
    } // Private

  }, {
    key: "_initializeBackDrop",
    value: function _initializeBackDrop() {
      return new _backdrop["default"]({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
  }, {
    key: "_initializeFocusTrap",
    value: function _initializeFocusTrap() {
      return new _focustrap["default"]({
        trapElement: this._element
      });
    }
  }, {
    key: "_showElement",
    value: function _showElement(relatedTarget) {
      var _this4 = this;

      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      var modalBody = _selectorEngine["default"].findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      (0, _index.reflow)(this._element);

      this._element.classList.add(CLASS_NAME_SHOW);

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._focustrap.activate();
        }

        _this4._isTransitioning = false;

        _eventHandler["default"].trigger(_this4._element, EVENT_SHOWN, {
          relatedTarget: relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this5 = this;

      _eventHandler["default"].on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
        if (event.key !== ESCAPE_KEY) {
          return;
        }

        if (_this5._config.keyboard) {
          event.preventDefault();

          _this5.hide();

          return;
        }

        _this5._triggerBackdropTransition();
      });

      _eventHandler["default"].on(window, EVENT_RESIZE, function () {
        if (_this5._isShown && !_this5._isTransitioning) {
          _this5._adjustDialog();
        }
      });

      _eventHandler["default"].on(this._element, EVENT_MOUSEDOWN_DISMISS, function (event) {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        _eventHandler["default"].one(_this5._element, EVENT_CLICK_DISMISS, function (event2) {
          if (_this5._element !== event.target || _this5._element !== event2.target) {
            return;
          }

          if (_this5._config.backdrop === 'static') {
            _this5._triggerBackdropTransition();

            return;
          }

          if (_this5._config.backdrop) {
            _this5.hide();
          }
        });
      });
    }
  }, {
    key: "_hideModal",
    value: function _hideModal() {
      var _this6 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);

        _this6._resetAdjustments();

        _this6._scrollBar.reset();

        _eventHandler["default"].trigger(_this6._element, EVENT_HIDDEN);
      });
    }
  }, {
    key: "_isAnimated",
    value: function _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE);
    }
  }, {
    key: "_triggerBackdropTransition",
    value: function _triggerBackdropTransition() {
      var _this7 = this;

      var hideEvent = _eventHandler["default"].trigger(this._element, EVENT_HIDE_PREVENTED);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      var initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      this._queueCallback(function () {
        _this7._element.classList.remove(CLASS_NAME_STATIC);

        _this7._queueCallback(function () {
          _this7._element.style.overflowY = initialOverflowY;
        }, _this7._dialog);
      }, this._dialog);

      this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */

  }, {
    key: "_adjustDialog",
    value: function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      var scrollbarWidth = this._scrollBar.getWidth();

      var isBodyOverflowing = scrollbarWidth > 0;

      if (isBodyOverflowing && !isModalOverflowing) {
        var property = (0, _index.isRTL)() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = "".concat(scrollbarWidth, "px");
      }

      if (!isBodyOverflowing && isModalOverflowing) {
        var _property = (0, _index.isRTL)() ? 'paddingRight' : 'paddingLeft';

        this._element.style[_property] = "".concat(scrollbarWidth, "px");
      }
    }
  }, {
    key: "_resetAdjustments",
    value: function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static

  }], [{
    key: "jQueryInterface",
    value: function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config](relatedTarget);
      });
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME;
    }
  }]);

  return Modal;
}(_baseComponent["default"]);
/**
 * Data API implementation
 */


_eventHandler["default"].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  var _this8 = this;

  var target = _selectorEngine["default"].getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  _eventHandler["default"].one(target, EVENT_SHOW, function (showEvent) {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }

    _eventHandler["default"].one(target, EVENT_HIDDEN, function () {
      if ((0, _index.isVisible)(_this8)) {
        _this8.focus();
      }
    });
  }); // avoid conflict when clicking modal toggler while another one is open


  var alreadyOpen = _selectorEngine["default"].findOne(OPEN_SELECTOR);

  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }

  var data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});

(0, _componentFunctions.enableDismissTrigger)(Modal);
/**
 * jQuery
 */

(0, _index.defineJQueryPlugin)(Modal);
var _default = Modal;
exports["default"] = _default;