import { map } from 'ramda';
import { createStore } from 'redux';
import reducer from './reducer';
import lookup from './lookup';
import { NAME, SELECT } from './labels';

export default (deux) => {
  const store     = createStore(reducer(deux));
  const actions   = map(fn => store.dispatch.bind(null, fn), lookup(deux)[NAME]);
  const selectors = deux[SELECT];
  return {
    store,
    actions,
    selectors,
    deux,
  };
};
