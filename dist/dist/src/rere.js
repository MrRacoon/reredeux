'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _lookup = require('./lookup');

var _lookup2 = _interopRequireDefault(_lookup);

var _labels = require('./labels');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

exports.default = function (deux) {
  var _extends2;

  return _extends({}, deux, (_extends2 = {}, _defineProperty(_extends2, _labels.ACTION, (0, _lookup2.default)(deux[_labels.DUCKS])[_labels.ACTION]), _defineProperty(_extends2, _labels.REDUCER, (0, _reducer2.default)(deux)), _defineProperty(_extends2, 'actions', (0, _lookup2.default)(deux[_labels.DUCKS]).actionByType), _extends2));
};