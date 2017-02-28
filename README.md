reredeux
========

[![Build Status](https://travis-ci.org/MrRacoon/reredeux.svg?branch=master)](https://travis-ci.org/MrRacoon/reredeux)

Generate redux state trees, selectors, and actions.

**This API is Undergoing Active Development, DO NOT USE IN PRODUCTION**

## Tutorial

can be found [here](https://mrracoon.github.io/reredeux/)

## The Patterns

### Duck

`Ducks` describe state transitions. They should look familiar if you've used
duck-typing in redux. The goal is to isolate all code for every action in a
single place. Making it simple to maintain, and easy to manipulate in our state
tree.

Ducks are encoded as objects with various properties.

#### name :: String

This is typically what you would use for the name of your action creator. It
will be used for constructing the `type` field (done automatically); and as the
key in a map that will hold all of the dispatchable actions.

#### action :: (payload | error) -> { payload | error }

The action function to be invoked when you later call `actions[NAME]`.

#### reducer :: (state, action) -> state

You'll most often need a reducer function for your action. This function only
ever gets called if the action we're defining is actually dispatched.

### Module

Once you have all of your ducks all lined up, we'll need to describe some initial state, and a set of selectors for getting at that state.

#### init :: state

The initial state, associated with your set of ducks.

#### select :: { selector }

A map, of selectors for looking up and computing data for information stored in
the state.

#### ducks :: [ duck | asyncDuck ]

All of your ducks, all in a list.

## Usage

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

---

### Async Duck (Experimental api)

#### name :: String

same as before

#### promise :: (...a) -> Promise

A Promise creator, or, some function that returns a `Promise`.

#### then :: (resolved) -> (action | (dispatch, getState) -> Promise)
#### catch :: (rejected) -> (action | (dispatch, getState) -> Promise)

`then` and `catch`, will take a resovled/rejected value (respectively) passed
back by the promise, and will return either an action or a thunk.

There will be a whole new action created for each of these functions, whose
`name` property will end in `Success` or `Failure` concatenated to the end.

#### reducer :: (state, action) => state

The single reducer is called for each of the ducks actions, including those
created by the `then` and `catch` action creators.

---

### TODO

* [ ] Let the API settle down into a coherent thought.
* [ ] Provide examples, and step by step documentation w/ opinions.

---

### License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2017 Erik Sutherland. All rights reserved.
