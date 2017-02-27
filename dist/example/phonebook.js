'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addEntry, _ref2;

var _ramda = require('ramda');

var _src = require('../src');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NAME = _src.LABELS.NAME,
    INIT = _src.LABELS.INIT,
    SELECT = _src.LABELS.SELECT,
    DUCKS = _src.LABELS.DUCKS,
    ACTION = _src.LABELS.ACTION,
    REDUCER = _src.LABELS.REDUCER;


var PB = 'phonebook';
var init = [{ name: 'person1', number: '1(222)333-4444' }, { name: 'person2', number: '1(333)444-5555' }];

var select = {};
select.value = (0, _ramda.memoize)(function (state) {
  return state;
});
select.nameToNumber = (0, _ramda.memoize)(function (state) {
  return (0, _ramda.indexBy)((0, _ramda.prop)('name'), select.value(state));
});
select.numberToName = (0, _ramda.memoize)(function (state) {
  return (0, _ramda.indexBy)((0, _ramda.prop)('number'), select.value(state));
});

var addEntry = (_addEntry = {}, _defineProperty(_addEntry, NAME, 'addEntry'), _defineProperty(_addEntry, ACTION, _src.tools.action.payload), _defineProperty(_addEntry, REDUCER, function (state, _ref) {
  var payload = _ref.payload;
  return select.value(state).concat([payload]);
}), _addEntry);

exports.default = (0, _src.deux)(PB, [(_ref2 = {}, _defineProperty(_ref2, INIT, init), _defineProperty(_ref2, SELECT, select), _defineProperty(_ref2, DUCKS, [addEntry]), _ref2)]);