import { Router } from 'express';
import debug from 'debug';

const log = debug('express-server:router:notes');
const router = Router();

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
