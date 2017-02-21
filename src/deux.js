import {
  assoc, chain, compose, curry, map, mergeAll, prop,
} from 'ramda';

import { expandDefers } from './tools';

import {
  NAME, INITIAL_STATE, SELECT, DUCKS,
  TYPE, ACTION,
  PROMISE
} from './labels';

export default (name, mods) => {

  const init = compose(
    mergeAll,
    map(prop(INITIAL_STATE))
  )(mods);

  const select = compose(
    mergeAll,
    map(m => ({ [m[NAME]]: m[SELECT] }))
  )(mods);

  const ducks = compose(
    map(injectTypeAction),
    map(prependNameType(name)),
    map(defaultType),
    chain(expandDefers),
    chain(prop(DUCKS))
  )(mods);

  return {
    [NAME]          : name,
    [INITIAL_STATE] : init,
    [SELECT]        : select,
    [DUCKS]         : ducks,
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

const reducerPatch = curry((n, red) => {
  switch (typeof sel) {
  case 'object':
    return map(reducerPatch(n), red);
  case 'function':
    return (state, action) => ({
      ...state,
      [state[n]]: red(state[n], action),
    });
  default:
    return red;
  }
});
