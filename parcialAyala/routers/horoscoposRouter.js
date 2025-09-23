import express from 'express';
import {
  getHoroscopo,
  getHoroscopoById,
  postHoroscopo,
  deleteHoroscopoById,
  updateHorosById,
}from '../controllers/horoscopoController.js';

const router = express.Router();
router.get('/', getHoroscopo);
router.post('/', postHoroscopo);
router.get('/:id', getHoroscopoById);
router.delete('/:id', deleteHoroscopoById);
router.put('/:id' , updateHorosById)

export default router;






