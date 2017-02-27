'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addTodo, _loadTodos, _ref3;

var _ramda = require('ramda');

var _src = require('../src');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NAME = _src.LABELS.NAME,
    INIT = _src.LABELS.INIT,
    SELECT = _src.LABELS.SELECT,
    DUCKS = _src.LABELS.DUCKS,
    ACTION = _src.LABELS.ACTION,
    REDUCER = _src.LABELS.REDUCER,
    PROMISE = _src.LABELS.PROMISE;


var init = [{ name: 'brush teeth', complete: true }, { name: 'dishes', complete: false }];

var select = {};
select.value = function (state) {
  return state;
};
select.titles = function (state) {
  return (0, _ramda.map)((0, _ramda.prop)('name'), select.value(state));
};
select.statuses = function (state) {
  return (0, _ramda.map)((0, _ramda.prop)('complete'), select.value(state));
};
select.completed = function (state) {
  return (0, _ramda.filter)((0, _ramda.propEq)('complete', true), select.value(state));
};
select.pending = function (state) {
  return (0, _ramda.filter)((0, _ramda.propEq)('complete', false), select.value(state));
};

var addTodo = (_addTodo = {}, _defineProperty(_addTodo, NAME, 'addTodo'), _defineProperty(_addTodo, ACTION, function (payload) {
  return { payload: payload };
}), _defineProperty(_addTodo, REDUCER, function (s, _ref) {
  var payload = _ref.payload;
  return s.concat([payload]);
}), _addTodo);

var loadTodos = (_loadTodos = {}, _defineProperty(_loadTodos, NAME, 'loadTodos'), _defineProperty(_loadTodos, PROMISE, Promise.resolve), _defineProperty(_loadTodos, REDUCER, function (s, _ref2) {
  var payload = _ref2.payload,
      error = _ref2.error;

  if (error) return s;
  return s.concat([payload]);
}), _loadTodos);

exports.default = (0, _src.deux)('todo', [(_ref3 = {}, _defineProperty(_ref3, INIT, init), _defineProperty(_ref3, SELECT, select), _defineProperty(_ref3, DUCKS, [addTodo, loadTodos]), _ref3)]);