import rere, { deux } from '..';
import counter from './counter';

export const app = deux('app', [ counter ]);
export const reapp = rere(app);

export default app;
