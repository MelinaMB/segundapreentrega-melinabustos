import multer from 'multer';
import { connect } from 'mongoose';
import { Server } from 'socket.io';

// ----------------multer-------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/public');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

// ------------_dirname-------------

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export async function connectMongo() {
  try {
    await connect('mongodb+srv://melinambustos:jq7wYzhXfWRZtGpe@backend-coder.rpukb6t.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('plug to mongo!');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

// ------------actualizacion automatica de productos con socket----------
export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);
  /*socket del servidor se usa socket.on para escuchar la conexion
  de un nuevo socket en este caso escuchar al socket del front */
  socketServer.on('connection', (socket) => {
    // recibimos lo del front
    socket.on('msg_front_to_back', (data) => {
      console.log(JSON.stringify(data));
      socketServer.emit('msg_back_to_front', data);
    });
  });
}

// -----------------------actulizacion de chat con socket----------------------------
import { MsgModel } from './DAO/models/messages.model.js';
export function connectSocketChat(httpServer) {
  const socketServer = new Server(httpServer);
  
  // BACK
  // socket es un front conectado, le mandamos al front
  socketServer.on('connection', (socket) => {
    // recibimos lo del front
    socket.on('msg_front_to_back', async (msg) => {
      console.log(msg);
      const msgCreated = await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      // enviamos al front todos los mensajes que tenemos guardados
      socketServer.emit('msg_back_to_front', msgs);
    });
  });
}
