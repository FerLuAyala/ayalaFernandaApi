import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routerAPI from "./routers/index.js";
dotenv.config();
const port =process.env.PORT;
const URI_DB = process.env.URI_DB;

//console.log("PORT:", port);
//console.log("URI_DB:", URI_DB);

//conexion con mDB
mongoose.connect(URI_DB);
const db= mongoose.connection;

db.on('error', ()=> 
    { console.error('NO se pudo conectar')});

db.once('open', () => 
    {console.info('Conexión correcta de DB')});

const app = express();

app.use(express.json());
app.use('/', express.static('public'));


app.use((req, res, next) => {
  console.log("Estoy interceptando todo 🚨", req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Servidor activo');
});


routerAPI(app); 


app.listen(port, () => {
    
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
