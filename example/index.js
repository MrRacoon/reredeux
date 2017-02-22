import reredeux, { deux } from '../src';
import counter from './counter';
import todo from './todo';
import phonebook from './phonebook';

export default reredeux('example', [
  phonebook,
  counter,
  deux('tasks', [
    todo,
  ])
]);
