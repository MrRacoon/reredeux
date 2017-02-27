'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _increment, _decrement, _set, _reset, _ref;

var _ramda = require('ramda');

var _src = require('../src');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INIT = _src.LABELS.INIT,
    SELECT = _src.LABELS.SELECT,
    DUCKS = _src.LABELS.DUCKS,
    NAME = _src.LABELS.NAME,
    ACTION = _src.LABELS.ACTION,
    REDUCER = _src.LABELS.REDUCER,
    VALUE = _src.LABELS.VALUE;
var action = _src.tools.action;

var init = 0;

var select = {};
select[VALUE] = function (s) {
  return s;
};
select.succ = (0, _ramda.compose)((0, _ramda.add)(1), select[VALUE]);
select.pred = (0, _ramda.compose)((0, _ramda.add)(-1), select[VALUE]);

var increment = (_increment = {}, _defineProperty(_increment, NAME, 'increment'), _defineProperty(_increment, ACTION, action.payload), _defineProperty(_increment, REDUCER, select.succ), _increment);

var decrement = (_decrement = {}, _defineProperty(_decrement, NAME, 'decrement'), _defineProperty(_decrement, ACTION, action.payload), _defineProperty(_decrement, REDUCER, select.pred), _decrement);

var set = (_set = {}, _defineProperty(_set, NAME, 'set'), _defineProperty(_set, ACTION, action.payload), _defineProperty(_set, REDUCER, function (s) {
  return (0, _ramda.pathOr)(s, 'payload');
}), _set);

var reset = (_reset = {}, _defineProperty(_reset, NAME, 'reset'), _defineProperty(_reset, ACTION, action.empty), _defineProperty(_reset, REDUCER, (0, _ramda.always)(init)), _reset);

exports.default = (0, _src.deux)('counter', [(_ref = {}, _defineProperty(_ref, INIT, init), _defineProperty(_ref, SELECT, select), _defineProperty(_ref, DUCKS, [increment, decrement, set, reset]), _ref)]);