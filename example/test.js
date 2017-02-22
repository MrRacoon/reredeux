import should from 'should';
import { createStore } from 'redux';
import reredeux, { LABELS } from '../src';
const { INIT, REDUCER } = LABELS;

import todo from './todo';

const app = reredeux('example', [ todo ]);
let store;
let state;

console.log('app', app); // eslint-disable-line

describe('example', () => {
  beforeEach(() => {
    store = createStore(app[REDUCER], app[INIT]);
    state = store.getState();
  });
  describe('todo', () => {
    it('has the correct init state', () => {
      should.exist(app[INIT].example.todo);
      app[INIT].example.todo.should.be.type('object');
      state.example.todo
        .should.be.eql(todo[INIT].todo);
    });
  });
});
