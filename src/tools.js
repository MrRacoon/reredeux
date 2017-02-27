import { assocPath, curry, identity, merge, propOr } from 'ramda';

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
  empty   : ()        => ({}),
  error   : (error)   => ({ error }),
  payload : (payload) => ({ payload }),
  type    : (type)    => ({ type }),
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

const setAsyncFlag = curry((b, n, fn) =>
  (s,a) => assocPath([ASYNC, n], b, (fn || identity)(s, a))
);

export const reducer = {
  set   : (s, a) => propOr({}, 'payload')(a),
  merge : (s, a) => merge(s, propOr({}, 'payload', a)),
  async : {
    defer   : setAsyncFlag(true),
    success : setAsyncFlag(false),
    failure : setAsyncFlag(false),
  },
};

export const expandDefers = (d) => {
  if (!d[PROMISE]) { return [d]; }
  const succ  = makeSuccess(d);
  const fail  = makeFailure(d);
  const defer = {
    [NAME]: d[NAME],
    [TYPE]: d[TYPE] || d[NAME],
    [ACTION]: (...args) => (dispatch) =>
      d[PROMISE](...args)
        .then(succ[ACTION], fail[ACTION])
        .then(dispatch),
    [REDUCER]: reducer.async.defer(d[TYPE], d[REDUCER]),
  };
  return [ defer, succ, fail ];
};

export const makeSuccess = (d) => ({
  [NAME]    : `${d[NAME]}Success`,
  [TYPE]    : `${d[TYPE] || d[NAME]}/success`,
  [ACTION]  : d[THEN] || action.payload,
  [REDUCER] : reducer.async.success(d[TYPE], d[REDUCER])
});

export const makeFailure = (d) => ({
  [NAME]    : `${d[NAME]}Failure`,
  [TYPE]    : `${d[TYPE] || d[NAME]}/failure`,
  [ACTION]  : d[CATCH] || action.error,
  [REDUCER] : reducer.async.failure(d[TYPE], d[REDUCER])
});
