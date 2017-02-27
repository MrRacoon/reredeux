'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _labels = require('./labels');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var fromTo = function fromTo(key, value, ducks) {
  return (0, _ramda.pipe)((0, _ramda.indexBy)((0, _ramda.prop)(key)), (0, _ramda.map)((0, _ramda.prop)(value)))(ducks);
};

exports.default = function (ducks) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, _labels.NAME, fromTo(_labels.TYPE, _labels.NAME, ducks)), _defineProperty(_ref, _labels.TYPE, fromTo(_labels.NAME, _labels.TYPE, ducks)), _defineProperty(_ref, _labels.ACTION, fromTo(_labels.NAME, _labels.ACTION, ducks)), _defineProperty(_ref, _labels.REDUCER, fromTo(_labels.NAME, _labels.REDUCER, ducks)), _defineProperty(_ref, 'reducerByType', fromTo(_labels.TYPE, _labels.REDUCER, ducks)), _defineProperty(_ref, 'actionByType', (0, _ramda.reduce)(function (acc, d) {
    return (0, _ramda.assocPath)((0, _ramda.split)('/', d[_labels.TYPE]), d[_labels.ACTION], acc);
  }, {}, ducks)), _ref;
};