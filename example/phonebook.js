import { indexBy } from 'ramda';
import { LABELS, tools } from '../src';

const {
  NAME, INIT, SELECT, DUCKS,
  ACTION, REDUCER,
} = LABELS;

const PB   = 'phonebook';
const init = {
  [PB]: []
};

const select = {};
select.value        = state => state[PB];
select.nameToNumber = state => indexBy('name', select.value(state));
select.numberToName = state => indexBy('number', select.value(state));

const addEntry = {
  [NAME]: 'addEntry',
  [ACTION]: tools.action.payload,
  [REDUCER]: (state, { payload }) => ({
    ...state,
    [PB]: select.value(state).concat([payload]),
  }),
};

export default {
  [NAME]   : PB,
  [INIT]   : init,
  [SELECT] : select,
  [DUCKS]  : [
    addEntry,
  ],
};
