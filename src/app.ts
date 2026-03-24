import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { customLogger } from './middleware/custom-logger.ts';
import { errorHandler } from './middleware/error-handler.ts';
import { HttpError } from './errors/http-error.ts';

const log = debug('express-server:app');

export const app = express();
log('Express app created');

app.use(customLogger());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

app.get('/', (_req, res) => {
    res.send('Hello World!');
    return;
});

app.get('/patata', (_req, _res, next) => {
    next(new HttpError(401, 'Unauthorized', 'Patatas not allowed'));
    return;
});

app.post('/', (req, res) => {
    log(req.body);
    log(req.params);
    log(req.query);
    res.statusCode = 201;
    res.send('Hello POST');
    return;
});

app.get('/api', (_req, res) => {
    res.send('API Rest');
    return;
});

app.get('/api/notes', (_req, res) => {
    const notes = [{ id: 1 }, { id: 2 }];
    res.json(notes);
    return;
});

app.use(errorHandler);
