import { assocPath, compose, identity, merge, propOr } from 'ramda';

import {
  NAME, TYPE, ACTION, REDUCER,
  ASYNC,
  PROMISE, THEN, CATCH,
} from './labels';

const util = require('util');
export const log = (obj) => {
  console.log(util.inspect(obj, false, null)); // eslint-disable-line
};

export const action = {
  empty   : () => ({}),
  error   : (error) => ({ error }),
  payload : (payload) => ({ payload }),
  type    : (type) => ({ type }),
};

export const thunk = {
  promise : (...args) => {
    switch (args.length) {

    case 1:
      return (...as) => dispatch =>
        args[0](...as).then(dispatch);

    case 2:
      return (p, ...as) => dispatch =>
        p(...as)
          .then(args[0], args[1])
          .then(dispatch);

    case 3:
      return (...as) => dispatch =>
        args[0](...as)
          .then(args[1], args[2])
          .then(dispatch);

    default: return action.empty;
    }
  },
};

export const reducer = {
  merge: compose(merge, propOr({}, 'payload')),
  async: {
    defer: (n, fn) =>
      (s,a) => assocPath([ASYNC, n], true, fn(s, a)),

    success: (n, fn) =>
      (s,a) => assocPath([ASYNC, n], false, fn(s, a)),

    failure: (n, fn) =>
      (s,a) => assocPath([ASYNC, n], false, fn(s, a)),
  },
};

export const expandDefers = (d) => {
  if (!d[PROMISE]) { return [d]; }
  const succ  = makeSuccess(d);
  const fail  = makeFailure(d);
  const defer = {
    [NAME]: d[NAME],
    [TYPE]: d[TYPE],
    [ACTION]: (...args) => (dispatch) =>
      d[PROMISE](...args)
        .then(succ[ACTION], fail[ACTION])
        .then(dispatch),
    [REDUCER]: reducer.async.defer(d[TYPE], d[REDUCER] || identity),
  };
  return [ defer, succ, fail ];
};

export const makeSuccess = (d) => ({
  [NAME]    : `${d[NAME]}Success`,
  [TYPE]    : `${d[TYPE] || d[NAME]}/success`,
  [ACTION]  : d[THEN] || action.payload,
  [REDUCER] : reducer.async.success(d[TYPE], d[REDUCER] || identity)
});

export const makeFailure = (d) => ({
  [NAME]    : `${d[NAME]}Failure`,
  [TYPE]    : `${d[TYPE] || d[NAME]}/failure`,
  [ACTION]  : d[CATCH] || action.error,
  [REDUCER] : reducer.async.failure(d[TYPE], d[REDUCER] || identity)
});
