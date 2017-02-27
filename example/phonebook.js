import { indexBy, prop } from 'ramda';
import { LABELS, tools, deux } from '../src';

const {
  NAME, INIT, SELECT, DUCKS,
  ACTION, REDUCER,
} = LABELS;

const PB   = 'phonebook';
const init = [
  { name: 'person1', number: '1(222)333-4444'},
  { name: 'person2', number: '1(333)444-5555'},
];

const select = {};
select.value        = state => state;
select.nameToNumber = state => indexBy(prop('name'), select.value(state));
select.numberToName = state => indexBy(prop('number'), select.value(state));

const addEntry = {
  [NAME]    : 'addEntry',
  [ACTION]  : tools.action.payload,
  [REDUCER] : (state, { payload }) =>
    select.value(state).concat([payload]),
};

export default deux(PB, [{
  [INIT]   : init,
  [SELECT] : select,
  [DUCKS]  : [ addEntry ],
}]);
