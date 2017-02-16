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

One duck consists of a
* `name` - to id later on in maps
* `action` - the actionCreator (type is inferred by the name).
* `reducer` - to identify the actions and reducers.

notice the loss of type, they get inserted when you run `deux`.
* ~~`type`~~ - *the type is now inferred by the name*

```Haskell
Duck :: {
  name    :: String
  action  :: (Payload | Error) -> { type, Payload | Error }
  reducer :: (State, Action) -> State
}

AsyncDuck :: {
  name    :: String
  promise :: (...args) => Promise
  then    :: (State, ResolvePayload) => State
  catch   :: (State, RejectError) => State
}
```

#### Module

Use ducks to define "sections" of state.

* `name`   - name of the module
* `init`   - initial state
* `select` - selectors, for the module's state
* `ducks`  - a list of Duck objects (explained later)

```Haskell
Module :: {
  name   :: String, -- Name of the module
  init   :: { State }, -- The initial state
  select :: { selectorName : selector }, -- Modulse specific selectors
  ducks, :: [ Duck | AsyncDuck ] -- List of Ducks, for changing values in state
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
