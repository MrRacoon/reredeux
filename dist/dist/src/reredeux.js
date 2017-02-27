'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rere = require('./rere');

var _rere2 = _interopRequireDefault(_rere);

var _deux = require('./deux');

var _deux2 = _interopRequireDefault(_deux);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (name, modules) {
  return (0, _rere2.default)((0, _deux2.default)(name, modules));
};