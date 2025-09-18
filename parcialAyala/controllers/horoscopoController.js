import HoroscopoModel from "../models/horoscopoModel.js";

const portHoroscopo = aync (req, res) => {
    try {
        const { name, prediccion } = req.body;

        if (!name || !prediccion) {
            return res.status(400).json({ msg: 'falta completar campos'});
        }
        const existeHoroscopo = await HoroscopoModel.findOne({name});
        if(existeHoroscopo){
            return res.status(400).json({ msg: 'El horoscopo ya fue cargado'});
        }

    } catch (error) {
        
    }
}