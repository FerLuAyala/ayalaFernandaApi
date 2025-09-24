import HoroscopoModel from "../models/horoscopoModel.js";
// Crear: Create()
const postHoroscopo = async (req, res) => {
  try {
    const { name, prediccion } = req.body;

    if (!name || !prediccion) {
      return res.status(400).json({ msg: "falta completar campos" });
    }
    const existeHoroscopo = await HoroscopoModel.findOne({ name });
    if (existeHoroscopo) {
      return res.status(400).json({ msg: "El horoscopo ya fue cargado" });
    }

    const horos = new HoroscopoModel({ name, prediccion });
    const data = await horos.save();
    res.status(200).json({ msg: 'ok, Horoscopo agregado', data:{ id: data._id, created: data.created} });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudo guardar el Horoscopo" });
  }
};
// Lista de horóscopo: find()
const getHoroscopo = async (req, res) => {
  try {
    const horoscopos = await HoroscopoModel.find();
    res.status(200).json({ msg: "ok", data: horoscopos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de Horoscopos" });
  }
};
// Horoscopo por ID: findById()
const getHoroscopoById = async (req, res) => {
  try {
    const { id } = req.params;
    const horos = await HoroscopoModel.findById(id);
    if (horos) {
      res.status(200).json({ msg: "Horoscopo por ID", data: horos });
    } else
      res
        .status(404)
        .json({ msg: "No se encontro Horoscopo que esta buscando", data: {} });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tenemos un error :( en el servidor ", data: {} });
  }
};
// Horoscopo por name: findOne({ name: { $regex: `^${name}$`, $options: 'i' } })
const getHoroscopoByName = async (req, res) =>{
    try {
        const name = req.params.name;
        //busca por name del signo , uso la expresion para que de name que se pasa no distinga entre mayusculas y minusculas
        //$regex $options
         const signo = await HoroscopoModel.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });

        if (signo) {
            res.status(200).json({msg:`Resultado de busqueda Signo:  ${signo.name} ` , data: signo});
        } else {
            res.status(404).json({msg:'No se encontro el signo que buscas', data: {}})
        }
    } catch (error) {
         console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});
    }
}
//Eliminar horoscopo por ID:findByIdAndDelete()
const deleteHoroscopoById = async (req, res) => {
  try {
    const { id } = req.params;
    const horos = await HoroscopoModel.findByIdAndDelete(id);
    if (horos) {
      res.status(200).json({ msg: "Horoscopo Eliminado", data: horos._id });
    } else {
      res.status(404).json({ msg: "No se encontro horoscopo", data: {} });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Tenemos un error :( en el servidor ", data: {} });
  }
};
// Actualizar horoscopo por ID: findByIdAndUpdate()
const updateHorosById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, prediccion } = req.body;
    if (!name || !prediccion) {
      res.status(400).json({ msg: "Falta completar campos obligatorios" });
    }
    const horos = await HoroscopoModel.findByIdAndUpdate(id, {
      name,
      prediccion,
    });
    res.status(202).json({ msg: "horoscopo actualizado" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tenemos un error :( en el servidor ", data: {} });
  }
};
export {
  postHoroscopo,
  getHoroscopo,
  getHoroscopoById,
  getHoroscopoByName,
  deleteHoroscopoById,
  updateHorosById,
};
