import reredeux from '../src';
import counter from './counter';
import todo from './todo';

export default reredeux('example', [
  counter,
  todo
]);
