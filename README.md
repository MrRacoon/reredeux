reredeux
========

[![Build Status](https://travis-ci.org/MrRacoon/reredeux.svg?branch=master)](https://travis-ci.org/MrRacoon/reredeux)

Generate redux state trees, selectors, and actions.

**Under Active Development, Not for Production**

`npm install reredux --save`

### The Patterns

#### Duck

`Ducks` describe state transitions. They should look familiar if you've used
duck-typing in redux, and even more if you've used thunks, There are two types available.

```Haskell
Duck :: {
  -- Identification in action map
  name    :: String
  -- Redux Action creator, that returns a promise
  action  :: (Payload | Error) -> { type, Payload | Error }
  -- Redux reducer function
  reducer :: (State, Action) -> State
}

AsyncDuck :: {
  -- Name of the duck, for identification in lookup tables
  name    :: String
  -- Redux Action creator, that returns a promise, rather than object
  promise :: (...args) => Promise
  -- Redux Reducer for the Promise.resolve case
  then    :: (State, PayloadAction) => State
  -- Redux Reducer for the Promise.reject case
  catch   :: (State, ErrorAction) => State
}
```

#### Module

Use ducks to define "sections" of state called `modules`.

```Haskell
Module :: {
  name   :: String,              -- Name of the module
  init   :: State,               -- The initial state
  select :: { state => a },      -- Module specific selectors
  ducks, :: [ Duck | AsyncDuck ] -- List of Ducks
}
```

#### Usage

To combine modules, give the `deux` function a `name` string, and a **list** of
`modules`. This will produce a new module. The new module can then be included
in a new module list passed to `deux` to create branching in your state tree.

The root of your tree should then get passed to the `rere` function, which is
responsible for adding two things:

* A map called `action`, that maps each duck's `name`, to it's `action` creator.
* A `reducer` function, that calls the appropriate duck's `reducer` for the given `action` type.

For convenience, there is a `reredeux` function that is equivalent to calling
`(...args) => rere(deux(...args))`. So that you can remove the parens.

You should now have most of the parts you need to own and operate your very own
modular redux store!

#### Example

```javascript
const counter = {
  name: 'counter',
  init: { counter: 0 },
  select: {
    value: state => state.counter,
  },
  ducks: [
    {
      name: 'increment',
      action: payload => ({ payload }),
      reducer: (s, { payload }) => ({
        ...s,
        counter: s.counter += 1,
      }),
    },
    {
      name: 'decrement',
      action: payload => ({ payload }),
      reducer: (s, { payload }) => ({
        ...s,
        counter: s.counter -= 1,
      }),
    },
  ],
};

     // or: reredeux('app', [ counter ]);
const app = rere(deux('app', [ counter ]));

const store = createStore(app.reducer, app.init);

const state = store.getState();

store.dispatch(app.action.counter.increment());
store.dispatch(app.action.counter.increment());
store.dispatch(app.action.counter.increment());
store.dispatch(app.action.counter.increment());

console.log(app.select.counter.value(store.getState()))
// 4
```

### License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2017 Erik Sutherland. All rights reserved.
