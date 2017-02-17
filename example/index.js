import reredeux from '../src';
import counter from './counter';

export const app = reredeux('app', [ counter ]);

export default app;
