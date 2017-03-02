import reredeux, { rere, deux, redeux, tools } from '../dist';
import { counter } from './counter';
import todo from './todo';
import phonebook from './phonebook';

const app = rere(redeux({
  example: {
    phonebook,
    counter,
    tasks: { todo },
  },
}));

tools.log(app);

const old = reredeux('example', [
  phonebook,
  deux('counter', counter),
  deux('tasks', [ todo ]),
]);

tools.log(old);

export default old;
