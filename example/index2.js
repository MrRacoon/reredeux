import { redeux, tools } from '../dist';
import { counter } from './counter';
import todo from './todo';
import phonebook from './phonebook';

const tree = redeux({
  counter,
  user: {
    phonebook,
    todo,
    counter,
    thing: { counter },
  },
});

tools.log(tree);

export default tree;
