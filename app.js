// app.js
require('dotenv').config();  // Carga las variables de entorno del archivo .env
const Server = require('./models/server');  // Importa el modelo del servidor
const { db } = require('./db/configure');  // Importa la conexión a la base de datos (ajusta la ruta según tu proyecto)

const server = new Server();

// Sincroniza la base de datos antes de iniciar el servidor
async function start() {
  try {
    await db.sync({alter:true});  // Sincroniza los modelos con la base de datos (crea las tablas si no existen)
    console.log('Base de datos sincronizada correctamente.');

    // Inicia el servidor una vez que la base de datos esté sincronizada
    server.listen();
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

start();  // Llama a la función que sincroniza y luego inicia el servidor
