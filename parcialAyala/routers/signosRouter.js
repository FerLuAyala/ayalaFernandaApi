import express from 'express';
import {
    getSignoById,
    getSignos,
    postSignos,
    updateSignoById,
    deleteSignoById,
   
} from '../controllers/signosController.js';

/*Esta tarea le corresponde solamente al admin*/
const router = express.Router();
router.get('/', getSignos);
router.post('/', postSignos);
router.get('/:id', getSignoById);
router.put('/:id', updateSignoById);
router.delete('/:id', deleteSignoById);


export default router;
