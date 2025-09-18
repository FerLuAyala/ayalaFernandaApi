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
});

const HoroscopoModel = mongoose.model("Horoscopo", mySchema);
export default HoroscopoModel;
