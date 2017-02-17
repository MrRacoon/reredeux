import should from 'should';
import { curry, mapObjIndexed } from 'ramda';

const util = require('util');

export const log = (obj) => {
  console.log(util.inspect(obj, false, null)); // eslint-disable-line
};

export const testSelector = curry((state, name, currVal) => {
  switch (typeof curr) {
  case 'function':
    it(`${name} selects existing data`, () => {
      should.exist(currVal(state));
    });
    break;
  case 'object':
    mapObjIndexed((nextVal, nextName) => {
      describe(name, () => {
        testSelector(state, nextName, nextVal);
      });
    }, currVal);
    break;
  default: true.should.be.false;
  }
});
