import {
  __, assoc, chain, compose, curry, map, mergeAll, prop,
} from 'ramda';

import { expandDefers } from './tools';

import {
  NAME, INIT, SELECT, DUCKS,
  TYPE, ACTION, REDUCER,
  PROMISE
} from './labels';

export default (name, mods) => {

  const init = compose(
    assoc(name, __, {}),
    mergeAll,
    map(prop(INIT))
  )(mods);

  const select = compose(
    selectorPatch(name),
    assoc(name, __, {}),
    mergeAll,
    map(prop(SELECT))
  )(mods);

  const ducks = compose(
    reducerPatch(name),
    map(injectTypeAction),
    map(prependNameType(name)),
    map(defaultType),
    chain(expandDefers),
    chain(prop(DUCKS))
  )(mods);

  return {
    [NAME]   : name,
    [INIT]   : init,
    [SELECT] : select,
    [DUCKS]  : ducks,
  };
};

const injectTypeAction = (obj) => obj[PROMISE]
  ? obj
  : {
    ...obj,
    [ACTION]: (...args) => assoc(TYPE, obj[TYPE], obj[ACTION](...args)),
  };

const prependNameType = curry((n, obj) => ({
  ...obj,
  [TYPE]: `${n}/${obj[TYPE]}`,
}));

const defaultType = (obj) => ({
  ...obj,
  [TYPE]: obj[TYPE] || obj[NAME],
});

const selectorPatch = curry((n, sel) => {
  switch (typeof sel) {
  case 'object'   : return map(selectorPatch(n), sel);
  case 'function' : return state => sel(state[n]);
  default         : return sel;
  }
});

const reducerPatch = curry((n, ducks) =>
  map(duck => ({
    ...duck,
    [REDUCER]: (state, action) => ({
      ...state,
      [n]: duck[REDUCER](state[n], action),
    }),
  }), ducks)
);
