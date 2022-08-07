import { Router } from 'express';
import { countFiles, removeFiles } from '../modifiers/cleanup.js';
const router = Router();

router.get('/', (req, res) => {
    let count = countFiles();
    res.send(count);
});

router.post('/', (req, res) => {
    removeFiles();

    let count = countFiles();
    res.send(count);
});


export default router;