import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  fechaNac:{
    type: Date,
     required: true,
  },

  email: {
    type: String,
    required: true,
     unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
});

const UserModel = mongoose.model("Usuarios", mySchema);
export default UserModel; 
