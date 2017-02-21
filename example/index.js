import reredeux from '../src';
import counter from './counter';
import todo from './todo';
import phonebook from './phonebook';

export default reredeux('example', [
  phonebook,
  counter,
  todo,
]);
