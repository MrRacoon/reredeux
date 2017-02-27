'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _ramda = require('ramda');

var _tools = require('./tools');

var _labels = require('./labels');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

exports.default = function (name, mods) {
  var _ref;

  var init = void 0;
  if (!Array.isArray(mods)) {
    init = (0, _ramda.compose)((0, _ramda.assoc)(name, _ramda.__, {}), (0, _ramda.prop)(_labels.INIT))(mods);
  } else if (mods.length === 1) {
    init = (0, _ramda.compose)((0, _ramda.assoc)(name, _ramda.__, {}), _ramda.head, (0, _ramda.map)((0, _ramda.prop)(_labels.INIT)))(mods);
  } else {
    init = (0, _ramda.compose)((0, _ramda.assoc)(name, _ramda.__, {}), _ramda.mergeAll, (0, _ramda.map)((0, _ramda.prop)(_labels.INIT)))(mods);
  }

  var select = (0, _ramda.compose)(selectorPatch(name), (0, _ramda.assoc)(name, _ramda.__, {}), addValueSelector, _ramda.mergeAll, (0, _ramda.map)((0, _ramda.prop)(_labels.SELECT)))(mods);

  var ducks = (0, _ramda.compose)(reducerPatch(name), (0, _ramda.map)(injectTypeAction), (0, _ramda.map)(prependNameType(name)), (0, _ramda.chain)(_tools.expandDefers), (0, _ramda.chain)((0, _ramda.prop)(_labels.DUCKS)))(mods);

  return _ref = {}, _defineProperty(_ref, _labels.NAME, name), _defineProperty(_ref, _labels.INIT, init), _defineProperty(_ref, _labels.SELECT, select), _defineProperty(_ref, _labels.DUCKS, ducks), _ref;
};

var injectTypeAction = function injectTypeAction(obj) {
  return obj[_labels.PROMISE] ? obj : _extends({}, obj, _defineProperty({}, _labels.ACTION, function () {
    return (0, _ramda.assoc)(_labels.TYPE, obj[_labels.TYPE], obj[_labels.ACTION].apply(obj, arguments));
  }));
};

var prependNameType = (0, _ramda.curry)(function (n, obj) {
  return _extends({}, obj, _defineProperty({}, _labels.TYPE, n + '/' + (obj[_labels.TYPE] || obj[_labels.NAME])));
});

var addValueSelector = (0, _ramda.merge)(_defineProperty({}, _labels.VALUE, _ramda.identity));

var selectorPatch = (0, _ramda.curry)(function (n, sel) {
  switch (typeof sel === 'undefined' ? 'undefined' : _typeof(sel)) {
    case 'object':
      return (0, _ramda.map)(selectorPatch(n), sel);
    case 'function':
      return function (state) {
        return sel(state[n]);
      };
    default:
      return sel;
  }
});

var reducerPatch = (0, _ramda.curry)(function (n, ducks) {
  return (0, _ramda.map)(function (duck) {
    return _extends({}, duck, _defineProperty({}, _labels.REDUCER, function (state, action) {
      return _extends({}, state, _defineProperty({}, n, duck[_labels.REDUCER](state[n], action)));
    }));
  }, ducks);
});