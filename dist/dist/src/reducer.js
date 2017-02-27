'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _lookup = require('./lookup');

var _lookup2 = _interopRequireDefault(_lookup);

var _labels = require('./labels');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (deux) {
  var lookup = (0, _lookup2.default)(deux[_labels.DUCKS]);
  return function (state, action) {
    return (0, _ramda.propOr)(_ramda.identity, action[_labels.TYPE], lookup.reducerByType)(state, action);
  };
};