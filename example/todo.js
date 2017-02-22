import { filter, map, prop, propEq } from 'ramda';
import { LABELS } from '../src';

const {
  NAME, INIT, SELECT, DUCKS,
  ACTION, REDUCER, PROMISE,
} = LABELS;

const name = 'todo';

const init = {
  [name]: [{
    title: 'brush teeth',
    status: 'pending',
  }]
};

const select = {};
select.value    = state => state[name];
select.titles   = state => map(prop('title'), select.value(state));
select.statuses = state => map(prop('status'), select.value(state));
select.completed = state =>
  filter(
    propEq('status', 'complete'),
    select.value(state)
  );
select.pending = state =>
  filter(
    propEq('status', 'pending'),
    select.value(state)
  );

const addTodo = {
  [NAME]: 'addTodo',
  [ACTION]: (payload) => ({ payload }),
  [REDUCER]: (s, { payload }) => ({
    ...s,
    [name]: s[name].concat([payload]),
  }),
};

const loadTodos = {
  [NAME]: 'loadTodos',
  [PROMISE]: Promise.resolve,
  [REDUCER]: (s, { payload, error }) => {
    if (error) return s;
    return ({
      ...s,
      [name]: s[name].concat([payload]),
    });
  },
};

export default {
  [NAME]: name,
  [INIT]: init,
  [SELECT]: select,
  [DUCKS]: [ addTodo, loadTodos ],
};
