import { indexBy, memoize, prop } from 'ramda';
import { LABELS, tools } from '../dist';

const {
  NAME, INIT, SELECT, DUCKS,
  ACTION, REDUCER,
} = LABELS;

const init = {
  entries: [
    { name: 'person1', number: '1(222)333-4444'},
    { name: 'person2', number: '1(333)444-5555'},
  ],
};

const select = {};
select.value        = memoize(state => state.entries);
select.nameToNumber = memoize(state => indexBy(
  prop('name'),
  select.value(state)
));
select.numberToName = memoize(state => indexBy(
  prop('number'),
  select.value(state)
));

const addEntry = {
  [NAME]    : 'addEntry',
  [ACTION]  : tools.action.payload,
  [REDUCER] : (state, { payload }) => {
    return {
      entries: [ ...state.entries, payload ],
    };
  },
};

export const phonebook = {
  [INIT]   : init,
  [SELECT] : select,
  [DUCKS]  : [ addEntry ],
};
