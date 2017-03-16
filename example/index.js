import { identity } from 'ramda';
import { reredeux, tools, LABELS } from '../src';
import { counter } from './counter';
import { todo } from './todo';
import { phonebook } from './phonebook';

const {
  INIT, DUCKS, NAME, SELECT, ACTION, TYPE, REDUCER,
} = LABELS;

const app = reredeux({
  example: {
    phonebook,
    counter,
    todo
  },
}, (app) => ({
  [INIT]: {
    test: 'asdf',
  },
  [SELECT]: {
    count: app[SELECT].example.counter._,
  },
  [DUCKS]: [
    {
      [NAME]: 'removeTodo',
      [TYPE]: 'example/removeTodo', // is there a way to remove this?
      [ACTION]: (id) => (dispatch) => {
        dispatch(app.actions.counter.increment()); // these wont point to the
        dispatch(app.actions.todo.remove(id));     // right place in a deep nest
      },
      [REDUCER]: identity,
    },
  ],
}));

tools.log(app);

export default app;
