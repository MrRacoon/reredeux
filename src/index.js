import reducer from './reducer';
import lookup from './lookup';
import * as tools from './tools';
import LABELS from './labels';
import rere from './rere';
import deux from './deux';
const reredeux = (...args) => rere(deux(...args));

export {
  LABELS,

  rere,
  deux,
  reredeux,

  lookup,
  reducer,

  tools
};

export default reredeux;
