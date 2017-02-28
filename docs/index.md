### Ducks

Ducks are objects that describe redux duck-typed actions.

```javascript
const duck = {
  name: 'increment',
  action: payload => ({ payload }),
  reducer: (s, { payload }) =>
    payload
      ? s + payload
      : s + 1
}
```

<hr>
<br>
### Modules
Ducks get organized into modules. Each module needs an initial state, and a
few selectors for extracting info from state. To construct a module, we call
`deux` on it. The first parameter will be the name of the module,
while the second will be an object with the following properties:

* init
* select
* ducks

```javascript
import { deux } from 'reredeux';

const increment = {
  name: 'increment',
  action: payload => ({ payload }),
  reducer: (s, { payload }) =>
    payload
      ? s + payload
      : s + 1
}

const decrement = {
  name: 'decrement',
  action: payload => ({ payload }),
  reducer: (s, { payload }) =>
    payload
      ? s - payload
      : s - 1
}

const module = deux('counter', [
  {
    init: 0,
    select: { val: s => s },
    ducks: [ increment, decrement ]
  }
]);
```

<hr>
<br>
### Deux

The deux function is very powerful. It has the ability to merge modules and
and organize branches of state. Notice that we can call deux, inside of
another deux's list of modules.

```javascript
const module =
  deux('app', [
    deux('tasks', [
      toDeuxList,
    ])
    deux('cooking', [
      fonDeuxRecipes
    ])
  ]);
```

<hr>
<br>
### Rere

Once we have a state declared the way we want, we'll call `rere`
on it to extract everything we'll need to plug it in to a view.

```javascript
const module = deux('counter', [
  {
    init: 0,
    select: { val: s => s },
    ducks: [ increment, decrement ]
  }
]);

const app = rere(module);

const store = createStore(app.reducer, app.init);

console.log(store.getState()); // { counter: 0 }

// all actions can be found in `app.actions`. they are all organized
// according to the structure of your state tree.
store.dispatch(store.actions.counter.increment());
store.dispatch(store.actions.counter.increment());

store.getState(); // { counter: 2 }

store.dispatch(store.actions.counter.decrement());

store.getState(); // { counter: 1 }

// our selectors can all be found in `app.select`. they are all organized
// according to the structure of your state tree.
app.select.counter.val(store.getState()) // 1

// There is a convinience selector at each level of the state tree, know as
// `_`. This is a special selector that returns all the state at that level.
app.select.counter._(store.getState()) // 1
```
