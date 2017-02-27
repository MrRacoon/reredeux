// import should from 'should';
import { createStore } from 'redux';
import reredeux, { deux, LABELS } from '../src';
const { INIT, SELECT, ACTION, REDUCER, VALUE } = LABELS;

import todo from './todo';
import counter from './counter';
import phonebook from './phonebook';

const app = reredeux('example', [
  counter,
  todo,
  deux('nest', [
    phonebook
  ])
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
      describe('todo', () => {
        it('', () => {
          state.example.todo
            .should.be.eql([
              { name: 'brush teeth', complete: true },
              { name: 'dishes'     , complete: false },
            ]);
        });
      });
      describe('nest', () => {
        describe('phonebook', () => {
          it('== []', () => {
            state.example.nest.phonebook
              .should.be.eql([
                { name: 'person1', number: '1(222)333-4444'},
                { name: 'person2', number: '1(333)444-5555'},
              ]);
          });
        });
      });
    });
  });
  describe(SELECT, () => {
    describe('example', () => {
      describe('counter', () => {
        describe(VALUE, () => {
          it('== 0', () => {
            app[SELECT].example.counter[VALUE](state)
              .should.be.eql(0);
          });
        });
        describe('succ', () => {
          it('== 1', () => {
            app[SELECT].example.counter.succ(state)
              .should.be.eql(1);
          });
        });
        describe('pred', () => {
          it('== -1', () => {
            app[SELECT].example.counter.pred(state)
              .should.be.eql(-1);
          });
        });
      });
      describe('todo', () => {
        describe('value', () => {
          it('returns all the data', () => {
            app[SELECT].example.todo.value(state)
              .should.be.eql([
                { name: 'brush teeth', complete: true },
                { name: 'dishes'     , complete: false },
              ]);
          });
        });
        describe('titles', () => {
          it('returns a list of todo titles', () => {
            app[SELECT].example.todo.titles(state)
              .should.be.eql(['brush teeth', 'dishes']);
          });
        });
        describe('statuses', () => {
          it('returns a list of completion status', () => {
            app[SELECT].example.todo.statuses(state)
              .should.be.eql([true, false]);
          });
        });
        describe('completed', () => {
          it('returns only complete todos', () => {
            app[SELECT].example.todo.completed(state)
              .should.be.eql([
                { name: 'brush teeth', complete: true },
              ]);
          });
        });
        describe('pending', () => {
          it('returns only incomplete todos', () => {
            app[SELECT].example.todo.pending(state)
              .should.be.eql([
                { name: 'dishes'     , complete: false },
              ]);
          });
        });
      });
      describe('nest', () => {
        describe('phonebook', () => {
          describe('value', () => {
            it('returns the list of entries', () => {
              app[SELECT].example.nest.phonebook.value(state)
                .should.be.eql([
                  { name: 'person1', number: '1(222)333-4444'},
                  { name: 'person2', number: '1(333)444-5555'},
                ]);
            });
          });
          describe('nameToNumber', () => {
            it('returns the map from name to number', () => {
              app[SELECT].example.nest.phonebook.nameToNumber(state)
                .should.be.eql({
                  'person1': { name: 'person1', number: '1(222)333-4444'},
                  'person2': { name: 'person2', number: '1(333)444-5555'},
                });
            });
          });
          describe('numberToName', () => {
            it('returns the map from number to name', () => {
              app[SELECT].example.nest.phonebook.numberToName(state)
                .should.be.eql({
                  '1(222)333-4444': { name: 'person1', number: '1(222)333-4444'},
                  '1(333)444-5555': { name: 'person2', number: '1(333)444-5555'},
                });
            });
          });
        });
      });
    });
  });
  describe(ACTION, () => {
    it('increment', () => {
      app[ACTION].increment()
        .should.have.property('type');
      app[ACTION].increment()
        .should.not.have.property('payload');
    });
    it('decrement', () => {
      app[ACTION].decrement()
        .should.have.property('type');
      app[ACTION].decrement()
        .should.not.have.property('payload');
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
