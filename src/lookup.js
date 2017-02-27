import {
  assocPath, indexBy, map, pipe, prop, reduce, split,
} from 'ramda';

import { NAME, TYPE, ACTION, REDUCER } from './labels';

const fromTo = (key, value, ducks) => pipe(
  indexBy(prop(key)),
  map(prop(value))
)(ducks);

export default (ducks) => {
  return {
    [NAME]        : fromTo(TYPE, NAME, ducks),
    [TYPE]        : fromTo(NAME, TYPE, ducks),
    [ACTION]      : fromTo(NAME, ACTION, ducks),
    [REDUCER]     : fromTo(NAME, REDUCER, ducks),
    reducerByType : fromTo(TYPE, REDUCER, ducks),
    actionByType  : reduce(
      (acc, d) => assocPath(split('/', d[TYPE]), d[ACTION], acc),
      {},
      ducks
    ),
  };
};
