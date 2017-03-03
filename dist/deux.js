'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchAction = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _empty;

var _ramda = require('ramda');

var _tools = require('./tools');

var _labels = require('./labels');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var empty = (_empty = {}, _defineProperty(_empty, _labels.INIT, {}), _defineProperty(_empty, _labels.SELECT, {}), _defineProperty(_empty, _labels.DUCKS, []), _empty);

var deux = function deux(obj) {
  if (obj && typeof obj[_labels.INIT] !== 'undefined') {
    return obj;
  }
  return (0, _ramda.reduce)(function (acc, _ref) {
    var _ref3;

    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    var cur = deux(value);

    return _ref3 = {}, _defineProperty(_ref3, _labels.NAME, name), _defineProperty(_ref3, _labels.INIT, _extends({}, acc[_labels.INIT], _defineProperty({}, name, cur[_labels.INIT]))), _defineProperty(_ref3, _labels.SELECT, _extends({}, acc[_labels.SELECT], _defineProperty({}, name, _extends({}, selectorPatch(name, cur[_labels.SELECT]), _defineProperty({}, _labels.BOTTOM, (0, _ramda.prop)(name)))))), _defineProperty(_ref3, _labels.DUCKS, (0, _ramda.compose)((0, _ramda.concat)(acc[_labels.DUCKS]), (0, _ramda.map)(patchReducer(name)), (0, _ramda.map)(patchAction(name)), (0, _ramda.map)(addType(name)), (0, _ramda.chain)(_tools.expandDefers))(cur[_labels.DUCKS])), _ref3;
  }, empty, (0, _ramda.toPairs)(obj));
};

exports.default = deux;


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

var patchAction = exports.patchAction = (0, _ramda.curry)(function (name, duck) {
  if (duck[_labels.PROMISE]) return duck;
  return _extends({}, duck, _defineProperty({}, _labels.ACTION, function () {
    return _extends({}, duck[_labels.ACTION].apply(duck, arguments), _defineProperty({}, _labels.TYPE, duck[_labels.TYPE]));
  }));
});

var addType = (0, _ramda.curry)(function (name, duck) {
  return _extends({}, duck, _defineProperty({}, _labels.TYPE, name + '/' + (duck[_labels.TYPE] || duck[_labels.NAME])));
});

var patchReducer = (0, _ramda.curry)(function (name, duck) {
  return _extends({}, duck, _defineProperty({}, _labels.REDUCER, function (state, action) {
    return _extends({}, state, _defineProperty({}, name, duck[_labels.REDUCER](state[name], action)));
  }));
});