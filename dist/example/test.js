'use strict';

var _redux = require('redux');

var _src = require('../src');

var _src2 = _interopRequireDefault(_src);

var _todo = require('./todo');

var _todo2 = _interopRequireDefault(_todo);

var _counter = require('./counter');

var _counter2 = _interopRequireDefault(_counter);

var _phonebook = require('./phonebook');

var _phonebook2 = _interopRequireDefault(_phonebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INIT = _src.LABELS.INIT,
    SELECT = _src.LABELS.SELECT,
    ACTION = _src.LABELS.ACTION,
    REDUCER = _src.LABELS.REDUCER,
    VALUE = _src.LABELS.VALUE;


var app = (0, _src2.default)('example', [_counter2.default, _todo2.default, (0, _src.deux)('nest', [_phonebook2.default])]);

var store = void 0;
var state = void 0;

describe('app', function () {
  beforeEach(function () {
    store = (0, _redux.createStore)(app[REDUCER], app[INIT]);
    state = store.getState();
  });
  describe(INIT, function () {
    describe('example', function () {
      describe('counter', function () {
        it('eql to 0', function () {
          state.example.counter.should.be.eql(0);
        });
      });
      describe('todo', function () {
        it('', function () {
          state.example.todo.should.be.eql([{ name: 'brush teeth', complete: true }, { name: 'dishes', complete: false }]);
        });
      });
      describe('nest', function () {
        describe('phonebook', function () {
          it('== []', function () {
            state.example.nest.phonebook.should.be.eql([{ name: 'person1', number: '1(222)333-4444' }, { name: 'person2', number: '1(333)444-5555' }]);
          });
        });
      });
    });
  });
  describe(SELECT, function () {
    describe('example', function () {
      describe('counter', function () {
        describe(VALUE, function () {
          it('== 0', function () {
            app[SELECT].example.counter[VALUE](state).should.be.eql(0);
          });
        });
        describe('succ', function () {
          it('== 1', function () {
            app[SELECT].example.counter.succ(state).should.be.eql(1);
          });
        });
        describe('pred', function () {
          it('== -1', function () {
            app[SELECT].example.counter.pred(state).should.be.eql(-1);
          });
        });
      });
      describe('todo', function () {
        describe('value', function () {
          it('returns all the data', function () {
            app[SELECT].example.todo.value(state).should.be.eql([{ name: 'brush teeth', complete: true }, { name: 'dishes', complete: false }]);
          });
        });
        describe('titles', function () {
          it('returns a list of todo titles', function () {
            app[SELECT].example.todo.titles(state).should.be.eql(['brush teeth', 'dishes']);
          });
        });
        describe('statuses', function () {
          it('returns a list of completion status', function () {
            app[SELECT].example.todo.statuses(state).should.be.eql([true, false]);
          });
        });
        describe('completed', function () {
          it('returns only complete todos', function () {
            app[SELECT].example.todo.completed(state).should.be.eql([{ name: 'brush teeth', complete: true }]);
          });
        });
        describe('pending', function () {
          it('returns only incomplete todos', function () {
            app[SELECT].example.todo.pending(state).should.be.eql([{ name: 'dishes', complete: false }]);
          });
        });
      });
      describe('nest', function () {
        describe('phonebook', function () {
          describe('value', function () {
            it('returns the list of entries', function () {
              app[SELECT].example.nest.phonebook.value(state).should.be.eql([{ name: 'person1', number: '1(222)333-4444' }, { name: 'person2', number: '1(333)444-5555' }]);
            });
          });
          describe('nameToNumber', function () {
            it('returns the map from name to number', function () {
              app[SELECT].example.nest.phonebook.nameToNumber(state).should.be.eql({
                'person1': { name: 'person1', number: '1(222)333-4444' },
                'person2': { name: 'person2', number: '1(333)444-5555' }
              });
            });
          });
          describe('numberToName', function () {
            it('returns the map from number to name', function () {
              app[SELECT].example.nest.phonebook.numberToName(state).should.be.eql({
                '1(222)333-4444': { name: 'person1', number: '1(222)333-4444' },
                '1(333)444-5555': { name: 'person2', number: '1(333)444-5555' }
              });
            });
          });
        });
      });
    });
  });
  describe(ACTION, function () {
    it('increment', function () {
      app[ACTION].increment().should.have.property('type');
      app[ACTION].increment().should.have.property('payload');
    });
    it('decrement', function () {
      app[ACTION].decrement().should.have.property('type');
      app[ACTION].decrement().should.have.property('payload');
    });
  });
  describe(REDUCER, function () {
    describe('counter', function () {
      it('increment', function () {
        store.dispatch(app[ACTION].increment());
        state = store.getState();
        state.example.counter.should.be.eql(1);
      });
      it('decrement', function () {
        store.dispatch(app[ACTION].decrement());
        state = store.getState();
        state.example.counter.should.be.eql(-1);
      });
    });
  });
});