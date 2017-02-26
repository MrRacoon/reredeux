reredeux
========

[![Build Status](https://travis-ci.org/MrRacoon/reredeux.svg?branch=master)](https://travis-ci.org/MrRacoon/reredeux)

Generate redux state trees, selectors, and actions.

**This API is Undergoing Active Development, DO NOT USE IN PRODUCTION**

### The Patterns

#### Duck

`Ducks` describe state transitions. They should look familiar if you've used
duck-typing in redux. There are two patterns offered by this library.

```Haskell
Duck :: {
  -- Identification in action map
  name :: String
  -- Redux Action creator, that returns a promise
  action :: (payload | error) -> { type, payload | error }
  -- Redux reducer function
  reducer :: (State, Action) -> State
}

AsyncDuck :: {
  -- Name of the duck, for identification in lookup tables
  name :: String
  -- Promise constructor
  promise :: (...args) => Promise
  -- Redux Action creator, called on Promise.resolve
  then :: (a) => Action | Thunk
  -- Redux Action creator, called on Promise.reject
  catch :: (a) => Action | Thunk
  -- Redux reducer function, called for both resolved and rejected values
  reducer :: (State, { payload | error }) => State
}
```

#### Modules

Use ducks to define sections of state we'll call `modules` for now.

```Haskell
Module :: {
  init   :: State,               -- The initial state
  select :: { State => a },      -- Module specific selectors
  ducks, :: [ Duck | AsyncDuck ] -- List of Ducks
}
```

### Usage

To combine modules, give the `deux` function a `name` string, and a **list** of
`modules`. This will produce a new module. The new module can then be included
in a new module list passed to `deux` to create branching in your state tree.

The root of your tree should then get passed to the `rere` function, which is
responsible for adding two things:

* A map called `action`, that maps each duck's `name`, to it's `action` creator.
* A redux `reducer` function, that calls the appropriate duck's `reducer` for a given `action`.

For convenience, there is a `reredeux` function that is equivalent to calling
`(...args) => rere(deux(...args))`. So that you can remove the extra parens.

You should now have most of the parts you need to own and operate your very own
modular redux store!

### TODO

* [ ] Let the API settle down into a coherent thought.
* [ ] Provide examples, and step by step documentation w/ opinions.

### License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2017 Erik Sutherland. All rights reserved.
