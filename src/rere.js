import { indexBy, map, pipe, prop, } from 'ramda';

import reducer from './reducer';
import lookup from './lookup';

import {
  NAME, DUCKS, ACTION, REDUCER,
} from './labels';

export default (deux) => {
  return {
    ...deux,
    [ACTION]: pipe(indexBy(prop(NAME)), map(prop(ACTION)))(deux[DUCKS]),
    // [ACTION]: lookup(deux[DUCKS])[ACTION],
    [REDUCER]: reducer(deux),
    actions: lookup(deux[DUCKS]).actionByType
  };
};

    // [NAME]        : fromTo(TYPE, NAME, ducks),
    // [TYPE]        : fromTo(NAME, TYPE, ducks),
    // [ACTION]      : fromTo(NAME, ACTION, ducks),
    // [REDUCER]     : fromTo(NAME, REDUCER, ducks),
    // reducerByType : fromTo(TYPE, REDUCER, ducks),
    // actionByType  : reduce(
    //   (acc, d) => assocPath(split('/', d[TYPE]), d[ACTION], acc),
    //   {},
    //   ducks
    // ),
