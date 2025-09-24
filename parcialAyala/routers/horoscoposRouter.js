import express from 'express';
import {
  getHoroscopo,
  getHoroscopoByName,
  getHoroscopoById,
  postHoroscopo,
  deleteHoroscopoById,
  updateHorosById,
}from '../controllers/horoscopoController.js';

/*Esta tarea le corresponde solamente al admin
por el momento esta echo para dar prediciones por dia , pero lo voy ampliar por semana y por mes 
*/
const router = express.Router();
router.get('/', getHoroscopo);
router.post('/', postHoroscopo);
router.get('/buscar/:name', getHoroscopoByName);
router.get('/:id', getHoroscopoById);
router.delete('/:id', deleteHoroscopoById);
router.put('/:id' , updateHorosById)

export default router;






