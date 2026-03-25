import { Router } from 'express';
import debug from 'debug';

const log = debug('express-server:router:notes');
export const router = Router();

log('Notes router created');

router.get('/', (_req, res) => {
    const notes = [{ id: 1 }, { id: 2 }];
    res.json(notes);
    return;
});

router.get('/search', (req, res) => {
    const query = req.query;
    // Código de búsqueda
    res.json(query);
    return;
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const notes = [{ id: 1 }, { id: 2 }];
    res.json(notes.find((note) => note.id === Number(id)));
    return;
});

router.post('/', (req, res) => {
    res.statusCode = 201;
    const result = {
        ...req.body,
        id: crypto.randomUUID(),
    };
    res.json(result);
    return;
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const result = {
        ...req.body,
        id,
    };
    res.json(result);
    return;
});

router.put('/:id', (_req, res) => {
    res.status(405);
    res.statusMessage = 'Method Not Allowed';
    res.end();
    return;
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    log(id);
    res.status(204);
    res.statusMessage = 'No Content';
    res.end();
    return;
});

export default router;
