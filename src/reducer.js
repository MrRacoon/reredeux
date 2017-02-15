import { identity, propOr } from 'ramda';
import lkp from './lookup';
import { TYPE, DUCKS } from './labels';

export default (deux) => {
  const lookup = lkp(deux[DUCKS]);
  return (state, action) =>
    propOr(
      identity,
      action[TYPE],
      lookup.reducerByType
    )(state, action);
};
