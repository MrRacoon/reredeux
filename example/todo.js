import { filter, map, prop, propEq } from 'ramda';
import { LABELS, deux } from '../dist';

const {
  NAME, INIT, SELECT, DUCKS,
  ACTION, REDUCER, PROMISE,
} = LABELS;

const init = [
  { name: 'brush teeth', complete: true },
  { name: 'dishes'     , complete: false },
];

const select = {};
select.value     = state => state;
select.titles    = state => map(prop('name'), select.value(state));
select.statuses  = state => map(prop('complete'), select.value(state));
select.completed = state =>
  filter(
    propEq('complete', true),
    select.value(state)
  );
select.pending = state =>
  filter(
    propEq('complete', false),
    select.value(state)
  );

const addTodo = {
  [NAME]    : 'addTodo',
  [ACTION]  : (payload) => ({ payload }),
  [REDUCER] : (s, { payload }) => s.concat([payload]),
};

const loadTodos = {
  [NAME]    : 'loadTodos',
  [PROMISE] : Promise.resolve,
  [REDUCER] : (s, { payload, error }) => {
    if (error) return s;
    return s.concat([payload]);
  },
};

export const todo = {
  [INIT]   : init,
  [SELECT] : select,
  [DUCKS]  : [ addTodo, loadTodos ],
};

export default deux('todo', [todo]);
