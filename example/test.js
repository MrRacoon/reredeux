import should from 'should';
import { createStore } from 'redux';
import reredeux from '../src';
import counter from './counter';

const app = reredeux('app', [ counter ]);

const newStore = (init = app.init) =>
  createStore(app.reducer, init);

describe('counter', () => {
  let store;
  let state;
  beforeEach(() => {
    store = newStore();
    state = store.getState();
  });
  describe('init', () => {
    it('is an object', () => {
      should.exist(state);
      state.should.be.instanceOf(Object);
    });
    describe('counter', () => {
      it('should be a number', () => {
        should.exist(state.counter);
        state.counter.should.be.instanceOf(Number);
      });
      it('== 0', () => {
        state.counter.should.be.eql(0);
      });
    });
  });
  describe('select', () => {
    describe('value', () => {
      it('works', () => {
        app.select.counter.value(state)
          .should.be.eql(state.counter);
      });
    });
    describe('succ', () => {
      it('works', () => {
        app.select.counter.succ(state)
          .should.be.eql(state.counter + 1);
      });
    });
    describe('pred', () => {
      it('works', () => {
        app.select.counter.pred(state)
          .should.be.eql(state.counter - 1);
      });
    });
  });
  describe('ducks', () => {
    describe('increment', () => {
      beforeEach(() => {
        store.dispatch(app.action.increment());
        state = store.getState();
      });
      it('pred', () => {
        app.select.counter.pred(state)
          .should.be.eql(0);
      });
      it('value', () => {
        app.select.counter.value(state)
          .should.be.eql(1);
      });
      it('succ', () => {
        app.select.counter.succ(state)
          .should.be.eql(2);
      });
    });
    describe('decrement', () => {
      beforeEach(() => {
        store.dispatch(app.action.decrement());
        state = store.getState();
      });
      it('pred', () => {
        app.select.counter.pred(state)
          .should.be.eql(-2);
      });
      it('value', () => {
        app.select.counter.value(state)
          .should.be.eql(-1);
      });
      it('succ', () => {
        app.select.counter.succ(state)
          .should.be.eql(0);
      });
    });
    describe('set', () => {
      beforeEach(() => {
        store.dispatch(app.action.set(42));
        state = store.getState();
      });
      it('pred', () => {
        app.select.counter.pred(state)
          .should.be.eql(41);
      });
      it('value', () => {
        app.select.counter.value(state)
          .should.be.eql(42);
      });
      it('succ', () => {
        app.select.counter.succ(state)
          .should.be.eql(43);
      });
    });
    describe('reset', () => {
      let s1;
      let s2;
      beforeEach(() => {
        store = newStore({ counter: 42 });
        s1 = store.getState();
        store.dispatch(app.action.reset());
        s2 = store.getState();
      });
      it('pred', () => {
        app.select.counter.pred(s1)
          .should.be.eql(41);
        app.select.counter.pred(s2)
          .should.be.eql(-1);
      });
      it('value', () => {
        app.select.counter.value(s1)
          .should.be.eql(42);
        app.select.counter.value(s2)
          .should.be.eql(0);
      });
      it('succ', () => {
        app.select.counter.succ(s1)
          .should.be.eql(43);
        app.select.counter.succ(s2)
          .should.be.eql(1);
      });
    });
  });
});
