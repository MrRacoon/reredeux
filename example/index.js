import { rere, redeux, tools } from '../src';
import { counter } from './counter';
import { todo } from './todo';
import { phonebook } from './phonebook';

const app = rere({
  ...redeux({
    example: {
      phonebook,
      counter,
      tasks: {
        todo
      },
    },
  }),
});

tools.log(app);

// const old = reredeux('example', [
//   deux('phonebook', phonebook),
//   deux('counter', counter),
//   deux('tasks', [
//     deux('todo', todo)
//   ]),
// ]);
//
// tools.log(old);

export default app;
