import express from 'express';
import {
    getSignoById,
    getSignos,
    postSignos
} from '../controllers/signosController.js';

const router = express.Router();
router.get('/', getSignos);
router.post('/', postSignos);
router.get('/:name', getSignoById);

export default router;
