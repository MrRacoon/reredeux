import should from 'should';
import { createStore } from 'redux';

import reredeux, { LABELS } from '../../src';
import todo from './todo';

const {
  NAME, TYPE, INIT, SELECT, DUCKS,
} = LABELS;

const app = reredeux('app', [ todo ]);

describe(todo[NAME], () => {
  let store;
  let state;
  beforeEach(() => {
    store = createStore(app.reducer, app.init);
    state = store.getState();
  });
  describe(INIT, () => {
    it('exists', () => {
      should.exist(todo[INIT]);
    });
  });
  describe(SELECT, () => {
    it('value', () => {
      todo[SELECT].value(state)
        .should.be.eql(app[INIT].todo);
      todo[SELECT].value(state)
        .should.be.eql(state.todo);
    });
    it('titles', () => {
      todo[SELECT].titles(state).map(t => {
        // this is giving a false positive
        t.should.be.type('string');
      });
    });
    it('statuses', () => {
      todo[SELECT].statuses(state).map(s => {
        // this is giving a false positive
        s.should.be.type('string');
      });
    });
    it('completed', () => {
      todo[SELECT].completed(state).map(s =>
        s.should.have.property('status', 'complete')
      );
    });
    it('pending', () => {
      todo[SELECT].completed(state).map(s =>
        s.should.have.property('status', 'pending')
      );
    });
  });
  describe(DUCKS, () => {
    app[DUCKS].map((d) =>
      describe(d[TYPE], () => {
        it(NAME, () => {
          d.should.have.property(NAME);
        });
      })
    );
  });
});
