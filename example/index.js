import { reredeux, tools } from '../src';
import { counter } from './counter';
import { todo } from './todo';
import { phonebook } from './phonebook';

const app = reredeux({
  example: {
    phonebook,
    counter,
    todo
  },
});

tools.log(app);

export default app;
