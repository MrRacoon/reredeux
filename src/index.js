import reducer from './reducer';
import lookup from './lookup';
import * as tools from './tools';
import LABELS from './labels';
import rere from './rere';
import redeux from './redeux';
const reredeux = (...args) => rere(redeux(...args));

export {
  LABELS,

  rere,
  redeux,
  reredeux,

  lookup,
  reducer,

  tools
};

export default reredeux;
