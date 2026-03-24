import { createServer } from 'node:http';
import debug from 'debug';
import { app } from './app.ts';

const log = debug('express-server:index');
const port = process.env.PORT || 3040;

const server = createServer(app);
log('Server created');

server.listen(port, () => {
    log(`Server listening on port ${port}`);
});
