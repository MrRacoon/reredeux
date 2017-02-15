import rere, { deux } from '..';
import counter from './counter';

export const app = deux('app', [ counter ]);

export default rere(app);
