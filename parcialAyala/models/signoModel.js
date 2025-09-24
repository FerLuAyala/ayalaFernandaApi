import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,   
  },
  elemento: {
    type: String,
    required: true,
  },

  fechaInicio: {
    type: Date,
    required: true,   
    
  },
  fechaFinal: {
    type: Date,
    required: true,    
  },
  icono:{
     type: String,
    required: true,
  },
  caracteristicas:{
     type: String,
    required: true,
  },
  descripcion:{
     type: String,
    required: true,
  },
});

const SignoModel = mongoose.model("Signos" , mySchema);
export default SignoModel;
