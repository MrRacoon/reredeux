'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tools = exports.reducer = exports.lookup = exports.reredeux = exports.deux = exports.rere = exports.LABELS = undefined;

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _lookup = require('./lookup');

var _lookup2 = _interopRequireDefault(_lookup);

var _tools = require('./tools');

var tools = _interopRequireWildcard(_tools);

var _labels = require('./labels');

var _labels2 = _interopRequireDefault(_labels);

var _rere = require('./rere');

var _rere2 = _interopRequireDefault(_rere);

var _deux = require('./deux');

var _deux2 = _interopRequireDefault(_deux);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reredeux = function reredeux() {
  return (0, _rere2.default)(_deux2.default.apply(undefined, arguments));
};

exports.LABELS = _labels2.default;
exports.rere = _rere2.default;
exports.deux = _deux2.default;
exports.reredeux = reredeux;
exports.lookup = _lookup2.default;
exports.reducer = _reducer2.default;
exports.tools = tools;
exports.default = reredeux;