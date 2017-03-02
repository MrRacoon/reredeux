import {
  concat, compose, curry, map, prop, reduce, toPairs
} from 'ramda';

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

const redeux = (obj) => {
  if (obj && typeof obj[INIT] !== 'undefined') { return obj; }

  return reduce(
    (acc, [name, value]) => {

      const cur = redeux(value);

      return {
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
            [BOTTOM]: prop(name),
            ...selectorPatch(name, cur[SELECT]),
          },
        },

        // DUCKS
        [DUCKS]: compose(
          map(patchAction(name)),
          map(patchReducer(name)),
          map(addType(name)),
          concat(cur[DUCKS])
        )(acc[DUCKS]),

      };
    },
    empty,
    toPairs(obj)
  );
};

export default redeux;

const selectorPatch = curry((n, sel) => {
  switch (typeof sel) {
  case 'object'   : return map(selectorPatch(n), sel);
  case 'function' : return state => sel(state[n]);
  default         : return sel;
  }
});

const patchSelect = curry((name, sel) => {
  if (typeof sel === 'object') {
    return map(patchSelect(name), sel);
  } else if (typeof sel === 'function') {
    return state => sel(state[NAME]);
  }
  return sel;
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
    [REDUCER]: (state, action) => ({
      ...state,
      [name]: duck[REDUCER](state[NAME], action),
    }),
  };
});
