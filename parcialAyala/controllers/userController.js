import UserModel from "../models/userModel.js";


const postUser = async (req, res) => {
  try {
    const { name, email, password, rol, fechaNac } = req.body;

    if (!name || !email || !password ||!fechaNac) {
      return res.status(400).json({ msg: 'Faltan campos' });
    }

    // Verificar si existe el email en db
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'El email ya está registrado' });
    }

    const user = new UserModel({ name, email, password, rol, fechaNac });
    const data = await user.save();

    res.status(201).json({ msg: 'ok', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo guardar el usuario' });
  }
};


const getUsers =  async ( req, res ) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ msg: 'ok', data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo obtener los usuarios'})
    }
};

const getUserById = async ( req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if( user){
            res.status(200).json({msg:'Usuario por ID ', data: user});
        } else {
            res.status(404).json({msg:'No se encontro el usuario', data: {}});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});

    }
};

const deleteUserById = async ( req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if( user){
            res.status(200).json({msg:'Usuario Eliminado ', data: user._id});
        } else {
            res.status(404).json({msg:'No se encontro el usuario', data: {}});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});
    }

}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, rol, fechaNac} = req.body;
        if( !name || !email || !password || !rol ||!fechaNac){
            res.status(400).json({ msg: 'Faltan campos obligatorios'})
            return;
        }
        const user = await UserModel.findByIdAndUpdate(id, {name, password, rol, fechaNac});
        console.log({user});
        res.status(202).json({msg: 'Usuario Actualizado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});
    }
}



export { postUser, getUsers,getUserById,deleteUserById, updateUserById}