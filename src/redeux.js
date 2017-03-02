import {
  assoc, concat, compose, curry, map, prop, reduce, toPairs
} from 'ramda';

import {
  INIT, SELECT, DUCKS,
  NAME, TYPE, REDUCER,
  VALUE,
} from './labels';

const empty = {
  [INIT]: {},
  [SELECT]: {},
  [DUCKS]: [],
};

// redeux :: { obj } -> (init, select, action)
const redeux = (obj) => {
  if (obj && typeof obj[INIT] !== 'undefined') {
    return obj;
  }

  return reduce(
    (acc, [name, value]) => {

      const cur = redeux(value);

      return {
        // INIT
        [INIT]: compose(
          assoc(name, cur[INIT])
        )(acc[INIT]),

        // SELECT
        [SELECT]: {
          ...acc[SELECT],
          [name]: {
            [VALUE]: prop(name),
            ...selectorPatch(name, cur[SELECT]),
          },
        },

        // DUCKS
        [DUCKS]: compose(
          map(patchReducer(name)),
          map(addType(name)),
          concat(cur[DUCKS])
        )(acc[DUCKS]),

      };
    }, empty, toPairs(obj));
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
