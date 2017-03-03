import {
  chain, concat, compose, curry, map, prop, reduce, toPairs
} from 'ramda';

import { expandDefers } from './tools';

import {
  INIT, SELECT, DUCKS,
  NAME, TYPE, ACTION, REDUCER,
  PROMISE, BOTTOM,
} from './labels';

const empty = {
  [INIT]: {},
  [SELECT]: {},
  [DUCKS]: [],
};

const deux = (obj) => {
  if (obj && typeof obj[INIT] !== 'undefined') { return obj; }
  return reduce(
    (acc, [name, value]) => {

      const cur = deux(value);

      return {

        // NAME
        [NAME]: name,

        // INIT
        [INIT]: {
          ...acc[INIT],
          [name]: cur[INIT],
        },

        // SELECT
        [SELECT]: {
          ...acc[SELECT],
          [name]: {
            ...selectorPatch(name, cur[SELECT]),
            [BOTTOM]: prop(name),
          },
        },

        // DUCKS
        [DUCKS]: compose(
          concat(acc[DUCKS]),
          map(patchReducer(name)),
          map(patchAction(name)),
          map(addType(name)),
          chain(expandDefers)
        )(cur[DUCKS]),

      };
    },
    empty,
    toPairs(obj)
  );
};

export default deux;

const selectorPatch = curry((n, sel) => {
  switch (typeof sel) {
  case 'object'   : return map(selectorPatch(n), sel);
  case 'function' : return state => sel(state[n]);
  default         : return sel;
  }
});

export const patchAction = curry((name, duck) => {
  if (duck[PROMISE]) return duck; // to be continued...
  return {
    ...duck,
    [ACTION]: (...args) => ({
      ...duck[ACTION](...args),
      [TYPE]: duck[TYPE],
    }),
  };
});

const addType = curry((name, duck) => {
  return {
    ...duck,
    [TYPE]: `${name}/${duck[TYPE] || duck[NAME]}`,
  };
});

const patchReducer = curry((name, duck) => {
  return {
    ...duck,
    [REDUCER]: (state, action) => {
      return {
        ...state,
        [name]: duck[REDUCER](state[name], action),
      };
    },
  };
});
