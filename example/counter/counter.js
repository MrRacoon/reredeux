// There are 'opinions' that aim to extract all the boilerplate from typical
// redux, duck typing.
import { LABELS, tools } from '../../src';

const {
  INIT, SELECT, DUCKS,
  NAME, ACTION, REDUCER,
} = LABELS;

const { action } = tools;

// Initial state
const COUNTER = 'counter';
const init = {
  [COUNTER]: 0
};

// Primitive selectors
const select = {};
select.value = s => s[COUNTER];
select.succ  = s => s[COUNTER] + 1;
select.pred  = s => s[COUNTER] - 1;

// Transforms
const increment = {
  [NAME]: 'increment',
  [ACTION]: action.payload,
  [REDUCER]: (s) => ({
    ...s,
    [COUNTER]: select.succ(s),
  }),
};

const decrement = {
  [NAME]: 'decrement',
  [ACTION]: action.payload,
  [REDUCER]: (s) => ({
    ...s,
    [COUNTER]: select.pred(s),
  }),
};

const set = {
  [NAME]: 'set',
  [ACTION]: action.payload,
  [REDUCER]: (s, { payload }) => ({
    ...s,
    [COUNTER]: payload,
  }),
};

const reset = {
  [NAME]: 'reset',
  [ACTION]: () => action.payload(init),
  [REDUCER]: (s, { payload }) => ({
    ...s,
    ...payload,
  }),
};

// Every module must export these four things
export default {
  // The name of the module, for scoping purposes
  [NAME]: COUNTER,
  // Thei initial state, which will be passed to redux.
  [INIT]: init,
  // Primitive selectors, that consumers of the module can use.
  [SELECT]: select,
  // Ducks, that describe the state transforms, which will later be used to
  // generate actions and reducers.
  [DUCKS]: [ increment, decrement, set, reset ],
};
