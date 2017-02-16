import reredeux, { deux } from '../src';
import counter from './counter';

export const app = reredeux('app', [
  deux('internal', [
    counter,
    deux('double', [
      counter
    ])
  ]),
  deux('outer', [
    counter
  ])
]);

export default app;
