import should from 'should';
import { createStore } from 'redux';
import { curry, mapObjIndexed } from 'ramda';

import state from '../example';
import { LABELS } from '../src';

const {
  INITIAL_STATE, SELECT, DUCKS,
  NAME, TYPE, ACTION, REDUCER,
  PROMISE,
} = LABELS;

let store;

const util = require('util');
console.log(util.inspect(state, false, null)); // eslint-disable-line

const testSelector = curry((name, nx) => {
  switch (typeof nx) {
  case 'object':
    mapObjIndexed((v, k) => {
      describe(name, () => {
        testSelector(k, v);
      });
    }, nx);
    break;
  case 'function':
    it(`${name} selects existing data`, () => {
      should.exist(nx(store.getState()));
    });
    break;
  default:
    true.should.be.false;
  }
});

describe(state[NAME], () => {
  beforeEach(() => {
    store = createStore(state[REDUCER], state[INITIAL_STATE]);
  });
  describe(NAME, () => {
    it('exists', () => {
      should(state[NAME]).toBeDefined;
      state[NAME].should.be.instanceOf(String);
    });
  });
  describe(INITIAL_STATE, () => {
    it('exists', () => {
      should(state[INITIAL_STATE]).toBeDefined;
      state[INITIAL_STATE].should.be.instanceOf(Object);
    });
  });
  describe(SELECT, () => {
    it('exists', () => {
      should(state[SELECT]).toBeDefined;
      state[SELECT].should.be.instanceOf(Object);
    });
    testSelector(state[NAME], state[SELECT]);
  });
  describe(DUCKS, () => {
    it('exists', () => {
      should(state[DUCKS]).toBeDefined;
      state[DUCKS].should.be.instanceOf(Array);
    });
    state[DUCKS].map(d => {
      describe(d[TYPE], () => {
        describe(NAME, () => {
          it('exists', () => {
            should.exist(d[NAME]);
          });
        });
        describe(TYPE, () => {
          it('exists', () => {
            should.exist(d[TYPE]);
          });
        });
        describe(ACTION, () => {
          it('exists', () => {
            should.exist(d[ACTION]);
          });
          it(`includes ${TYPE}`, () => {
            if (d[PROMISE]) return;
            const action = d[ACTION]();
            if (typeof action === 'object') {
              action[TYPE].should.be.eql(d[TYPE]);
            }
          });
        });
        describe(REDUCER, () => {
          it('exists', () => {
            should.exist(d[REDUCER]);
            d[REDUCER].should.be.instanceOf(Function);
          });
          it('minds the canary', () => {
            if (d[REDUCER]) {
              const CANARY = 'asdfhhh299dhwnxa0a0d9822bbslsiaaudo28000al';
              const s = {
                ...state[INITIAL_STATE],
                [CANARY]: 'canary',
              };
              d[REDUCER](s, d[ACTION]()).should.have.property(CANARY);
            }
          });
        });
      });
    });
  });
});
