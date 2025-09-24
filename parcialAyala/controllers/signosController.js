import SignoModel from "../models/signoModel.js";

// Crear: Create()
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

    //Validacion = no debe repetir Nombre , fechaInicio y fechaFinal.
    const existeSigno = await SignoModel.findOne({ name });
    if (existeSigno) {
      return res.status(400).json({ msg: "El signo ya está registrado" });
    }
    const existeFechaInicio = await SignoModel.findOne({ fechaInicio });
    if (existeFechaInicio) {
      return res
        .status(400)
        .json({ msg: "La fecha de inicio ya está registrada en otro signo" });
    }

    const existeFechaFinal = await SignoModel.findOne({ fechaFinal });
    if (existeFechaFinal) {
      return res
        .status(400)
        .json({ msg: "La fecha final ya está registrada en otro signo" });
    }

    //si esta todo ok se guarda
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
    res.status(201).json({ msg: `ok, Signo ${name} Agregado con éxito`, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudo guardar el signo" });
  }
};

// Lista de signos: find()
const getSignos = async (req, res) => {
  try {
    const signos = await SignoModel.find();
    res.status(200).json({ msg: "ok, listado de Signos", data: signos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se puede mostrar listado de signo" });
  }
};

// Signo por ID: findById()
const getSignoById = async (req, res) => {
  try {
    const id = req.params.id;

    const signo = await SignoModel.findById(id);

    if (signo) {
      res
        .status(200)
        .json({
          msg: `Resultado de busqueda Signo:  ${signo.name} `,
          data: signo,
        });
    } else {
      res
        .status(404)
        .json({ msg: "No se encontro el signo que buscas", data: {} });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tenemos un error :( en el servidor ", data: {} });
  }
};
// Signo por name: findOne({ name: { $regex: `^${name}$`, $options: 'i' } })
const getSignoByName = async (req, res) => {
  try {
    const name = req.params.name;
    //busca por name del signo , uso la expresion para que de name que se pasa no distinga entre mayusculas y minusculas
    //$regex
    const signo = await SignoModel.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });

    if (signo) {
      res
        .status(200)
        .json({
          msg: `Resultado de busqueda Signo:  ${signo.name} `,
          data: signo,
        });
    } else {
      res
        .status(404)
        .json({ msg: "No se encontro el signo que buscas", data: {} });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tenemos un error :( en el servidor ", data: {} });
  }
};

//Signo por fecha
const getSignoByFecha = async (req, res) => {
  try {
    const { dia, mes } = req.body;
    if (!dia || !mes)
      return res.status(400).json({ msg: "Debes enviar mes y dia" });
    //Convertimos en un numero a mmdd = mes enviado * 100 + dia enviado
    const fechaNum = mes * 100 + dia;

    //aca tenemos el arreglo con de signos con sus fecha de inicio y fin
    const signos = await SignoModel.find();

    //Convertimos estos tambien en un numero mmdd para luego comparar
    //mes + 1(porque los meses van del 0 al 11) * 100 + dia = mmdd
    const signoEncontrado = signos.find((signo) => {
      const inicioNum =
        (signo.fechaInicio.getMonth() + 1) * 100 + signo.fechaInicio.getDate();
      const finNum =
        (signo.fechaFinal.getMonth() + 1) * 100 + signo.fechaFinal.getDate();

      // si cumple solo una será Capricornio.
      if (finNum < inicioNum) {
        return fechaNum >= inicioNum || fechaNum <= finNum;
      }
      // Si cumple las dos condeciones
      return fechaNum >= inicioNum && fechaNum <= finNum;
    });
    //devuelve el signo
    if (signoEncontrado) {
      return res.status(200).json({
        msg: "Tu signo es:",
        signo: signoEncontrado.name,
        data: signoEncontrado,
      });
    }

    res.status(404).json({ msg: "No se encontró un signo para esa fecha" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
};

//// Actualizar horoscopo por ID: findByIdAndUpdate()
const updateSignoById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      elemento,
      fechaInicio,
      fechaFinal,
      icono,
      caracteristicas,
      descripcion,
    } = req.body;
    const signo = await SignoModel.findByIdAndUpdate(id, {
      name,
      elemento,
      fechaInicio,
      fechaFinal,
      icono,
      caracteristicas,
      descripcion,
    });
    console.log({ signo });
    res.status(202).json({ msg: `Signo ${signo.name} Actualizado con éxito` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tenemos un error :( en el servidor ", data: {} });
  }
};
//Eliminar horoscopo por ID:findByIdAndDelete()
const deleteSignoById = async (req, res) => {
  try {
    const { id } = req.params;
    const signo = await SignoModel.findByIdAndDelete(id);
    if (signo) {
      res
        .status(200)
        .json({
          msg: `ok, Signo ${signo.name} Eliminado con éxito`,
          data: signo._id,
        });
    } else {
      res.status(404).json({ msg: "No se encontro el Signo", data: {} });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tenemos un error :( en el servidor ", data: {} });
  }
};

export {
  postSignos,
  getSignos,
  getSignoById,
  getSignoByName,
  getSignoByFecha,
  updateSignoById,
  deleteSignoById,
};
