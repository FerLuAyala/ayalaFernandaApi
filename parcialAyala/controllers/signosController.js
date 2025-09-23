import SignoModel from "../models/signoModel.js";

const postSignos = async (req, res) => {
  try {
    const {
      
      name,
      elemento,
      fechaInicio,
      fechaFinal,
      icono,
      caracteristicas,
      descripcion,
    } = req.body;

    if (
      
      !name ||
      !elemento ||
      !fechaInicio ||
      !fechaFinal ||
      !icono ||
      !caracteristicas ||
      !descripcion
    ) {
      return res.status(400).json({ msg: "Faltan campos por completar" });
    }
    const existeSigno = await SignoModel.findOne({ name });
    if (existeSigno) {
      return res.status(400).json({ msg: "El signo ya está registrado" });
    }
    const signo = new SignoModel({
      name,
      elemento,
      fechaInicio,
      fechaFinal,
      icono,
      caracteristicas,
      descripcion,
    });
    const data = await signo.save();
    res.status(201).json({ msg: 'ok, Signo Agregado con éxito', data });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo guardar el signo' });
  }
};

const getSignos =async (req, res) => {
    try {
        const signos = await SignoModel.find();
        res.status(200).json({msg:'ok, listado de Signos', data:signos});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se puede mostrar listado de signo'})
    }
};

const getSignoById = async (req, res) =>{
    try {
        const id = req.params.id;
        //busca por name del signo , uso la expresion para que de name que se pasa no distinga entre mayusculas y minusculas
        const signo = await SignoModel.findById(id);

        if (signo) {
            res.status(200).json({msg:'el Id del Signo' , data: signo});
        } else {
            res.status(404).json({msg:'No se encontro el signo que buscas', data: {}})
        }
    } catch (error) {
         console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});
    }
}
const updateSignoById = async (req, res) => {
    try {
        const { id } = req.params;
        const {  name,elemento,fechaInicio,fechaFinal,icono,caracteristicas,descripcion,} = req.body;       
        const signo = await SignoModel.findByIdAndUpdate(id, { name,elemento,fechaInicio,fechaFinal,icono,caracteristicas,descripcion,});
        console.log({signo});
        res.status(202).json({msg: 'Signo Actualizado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});
    }
}


export { postSignos, getSignos, getSignoById ,updateSignoById}