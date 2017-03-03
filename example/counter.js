import { add, always, compose, identity } from 'ramda';
import { LABELS, tools } from '../dist';

const { INIT, SELECT, DUCKS, NAME, ACTION, REDUCER, VALUE } = LABELS;
const { action, reducer } = tools;

// Initial state
const init = 0;

// Primitive selectors
const select = {};
select[VALUE] = identity,
select.succ   = compose(add(1), select[VALUE]);
select.pred   = compose(add(-1), select[VALUE]);

// Transforms
const increment = {
  [NAME]: 'increment',
  [ACTION]: action.empty,
  [REDUCER]: select.succ,
};

const decrement = {
  [NAME]: 'decrement',
  [ACTION]: action.empty,
  [REDUCER]: select.pred,
};

const set = {
  [NAME]: 'set',
  [ACTION]: action.payload,
  [REDUCER]: reducer.payload,
};

const reset = {
  [NAME]: 'reset',
  [ACTION]: action.empty,
  [REDUCER]: always(init),
};

export const counter = {
  // Thei initial state, which will be passed to redux.
  [INIT]: init,
  // Primitive selectors, that consumers of the module can use.
  [SELECT]: select,
  // Ducks, that describe the state transforms, which will later be used to
  // generate actions and reducers.
  [DUCKS]: [ increment, decrement, set, reset ],
};
