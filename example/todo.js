import { filter, map, prop, propEq } from 'ramda';
import { LABELS } from '../dist';

const {
  NAME, INIT, SELECT, DUCKS,
  ACTION, REDUCER, PROMISE,
} = LABELS;

const init = [
  { name: 'brush teeth', complete: true },
  { name: 'dishes'     , complete: false },
];

const select = {};
select.titles    = map(prop('name')),
select.statuses  = map(prop('complete')),
select.completed = filter(
  propEq('complete', true)
);
select.pending   = filter(
  propEq('complete', false)
);

const addTodo = {
  [NAME]    : 'addTodo',
  [ACTION]  : (payload) => ({ payload }),
  [REDUCER] : (s, { payload }) => s.concat([payload]),
};

const remove = {
  [NAME]    : 'remove',
  [ACTION]  : (payload) => ({ payload }),
  [REDUCER] : (s, { payload }) =>
    s.filter(td => td.id !== payload),
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
  [DUCKS]  : [
    addTodo,
    loadTodos,
    remove
  ],
};
