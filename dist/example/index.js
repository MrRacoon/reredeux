'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _src = require('../src');

var _src2 = _interopRequireDefault(_src);

var _counter = require('./counter');

var _counter2 = _interopRequireDefault(_counter);

var _todo = require('./todo');

var _todo2 = _interopRequireDefault(_todo);

var _phonebook = require('./phonebook');

var _phonebook2 = _interopRequireDefault(_phonebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _src2.default)('example', [_phonebook2.default, _counter2.default, (0, _src.deux)('tasks', [_todo2.default])]);