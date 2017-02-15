import { map } from 'ramda';
import { createStore } from 'redux';
import reducer from './reducer';
import lookup from './lookup';
import { ACTION, SELECT, DUCKS } from './labels';

export default (deux) => {
  const l       = lookup(deux[DUCKS]);
  const store   = createStore(reducer(deux));
  const actions = map(
    fn => (...args) => store.dispatch(fn(...args)),
    l[ACTION]
  );
  const selectors = deux[SELECT];
  return {
    store,
    actions,
    selectors,
    deux,
  };
};
