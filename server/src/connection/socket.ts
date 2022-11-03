import { Server } from 'socket.io';
import { createChat } from './../controller/chat';

class Socket {
  private io;
  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.on('connection', (so) => {
      console.log('Socket connected :)!!');

      so.on('joinRoom', (roomId: any, callback) => {
        so.join(roomId);
        // this.io.to(roomId).emit('new-message', "기존 담겨있던 메세지");
        // console.log("room이 연결됨" :>>', roomId);
      });

      so.on('message', createChat);
    });
  }
}

let socket: any;
export function initSocket(server: any) {
  if (!socket) {
    socket = new Socket(server);
  }
  return socket;
}
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
