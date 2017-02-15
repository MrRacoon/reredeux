reredeux
========

[![Build Status](https://travis-ci.org/MrRacoon/reredeux.svg?branch=master)](https://travis-ci.org/MrRacoon/reredeux)

Generate redux state trees, selectors, and actions.

#### Install

```shell
npm install reredux --save
```

#### Usage

This lib allows you to write redux modules like so:

```javascript
const init = {
  counter: 0
};

const select = {};
const select.data = state => state.counter;

const inc = {
  name: 'inc',
  action: payload => ({ payload }),
  reducer: (s, a) => ({
    ...s,
    counter: select.data(s) + 1,
  }),
};

const dec = {
  name: 'dec',
  action: payload => ({ payload }),
  reducer: (s, a) => ({
    ...s,
    counter: select.data(s) - 1,
  }),
};

export default {
  name          : 'counter',
  initial_state : init,
  selectors     : select,
  ducks         : [ inc, dec ],
};
```

### License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2017 Erik Sutherland. All rights reserved.
