// There are 'opinions' that aim to extract all the boilerplate from typical
// redux, duck typing.
import { LABELS, tools } from '../src';

const {
  INITIAL_STATE, SELECT, DUCKS,
  NAME, ACTION, REDUCER,
} = LABELS;

const { action, reducer } = tools;

// Initial state
const COUNTER = 'counter';
const init = {
  [COUNTER]: 0
};

// Primitive selectors
const select = {};
select.data = s => s[COUNTER];

// Transforms
const increment = {
  [NAME]: 'increment',
  [ACTION]: action.payload,
  [REDUCER]: (s) => ({
    ...s,
    [COUNTER]: select.data(s) + 1,
  }),
};

const decrement = {
  [NAME]: 'decrement',
  [ACTION]: action.payload,
  [REDUCER]: (s) => ({
    ...s,
    [COUNTER]: select.data(s) - 1,
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
  [REDUCER]: reducer.merge,
};

// Every module must export these four things
export default {
  // The name of the module, for scoping purposes
  [NAME]: COUNTER,
  // Thei initial state, which will be passed to redux.
  [INITIAL_STATE]: init,
  // Primitive selectors, that consumers of the module can use.
  [SELECT]: select,
  // Ducks, that describe the state transforms, which will later be used to
  // generate actions and reducers.
  [DUCKS]: [ increment, decrement, set, reset ],
};
