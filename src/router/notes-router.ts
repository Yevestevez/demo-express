import { Router } from 'express';
import debug from 'debug';
import { NotesRepoJson } from '../services/note-repo-json.ts';
import { resolve, join } from 'node:path';

const log = debug('express-server:router:notes');
export const router = Router();

const __dirname = resolve('.');
const file = join(__dirname, 'src', 'data', 'db.json');
const repo = new NotesRepoJson(file);

log('Notes router created');

router.get('/', async (_req, res) => {
    const notes = await repo.read();
    res.json(notes);
    return;
});

router.get('/search', (req, res) => {
    const query = req.query;
    // Código de búsqueda
    res.json(query);
    return;
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const note = await repo.readById(id);
    res.json(note);
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
