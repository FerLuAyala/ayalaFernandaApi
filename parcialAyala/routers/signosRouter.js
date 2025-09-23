import express from 'express';
import {
    getSignoById,
    getSignos,
    postSignos,
    updateSignoById
} from '../controllers/signosController.js';

const router = express.Router();
router.get('/', getSignos);
router.post('/', postSignos);
router.get('/:id', getSignoById);
router.put('/:id', updateSignoById)

export default router;
