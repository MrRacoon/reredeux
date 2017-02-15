import { createStore } from 'redux';
import reducer from './reducer';
import lookup from './lookup';
import { ACTION, SELECT, DUCKS } from './labels';

export default (deux) => {
  const store     = createStore(reducer(deux));
  const actions   = lookup(deux[DUCKS])[ACTION];
  const selectors = deux[SELECT];
  return {
    store,
    actions,
    selectors,
    deux,
  };
};
