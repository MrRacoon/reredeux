import reducer from './reducer';
import lookup from './lookup';

import {
  DUCKS, ACTION, REDUCER,
} from './labels';

export default (deux) => {
  return {
    ...deux,
    [ACTION]: lookup(deux[DUCKS])[ACTION],
    [REDUCER]: reducer(deux),
    actions: lookup(deux[DUCKS]).actionByType
  };
};
