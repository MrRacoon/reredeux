// import should from 'should';
import { createStore } from 'redux';
import reredeux, { deux, LABELS } from '../src';
const { INIT, ACTION, REDUCER } = LABELS;

import todo from './todo';
import counter from './counter';
import phonebook from './phonebook';

const app = reredeux('example', [
  counter,
  todo,
  deux('nest', [ phonebook ])
]);
let store;
let state;

describe('app', () => {
  beforeEach(() => {
    store = createStore(app[REDUCER], app[INIT]);
    state = store.getState();
  });
  describe(INIT, () => {
    describe('example', () => {
      describe('counter', () => {
        it('eql to 0', () => {
          state.example.counter
            .should.be.eql(0);
        });
      });
    });
  });
  describe(ACTION, () => {
    it('increment', () => {
      app[ACTION].increment()
        .should.have.property('type');
      app[ACTION].increment()
        .should.have.property('payload');
    });
  });
  describe(REDUCER, () => {
    describe('counter', () => {
      it('increment', () => {
        store.dispatch(app[ACTION].increment());
        state = store.getState();
        state.example.counter
          .should.be.eql(1);
      });
      it('decrement', () => {
        store.dispatch(app[ACTION].decrement());
        state = store.getState();
        state.example.counter
          .should.be.eql(-1);
      });
    });
  });
});
