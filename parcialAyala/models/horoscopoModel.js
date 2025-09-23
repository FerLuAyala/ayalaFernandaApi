import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  prediccion: {
    type: String,
    required: true,
    unique: true,
  },

  fecha:{
    type: Date,
    required: true,
    default: Date.now
  }
});

const HoroscopoModel = mongoose.model("Horoscopo", mySchema);
export default HoroscopoModel;
