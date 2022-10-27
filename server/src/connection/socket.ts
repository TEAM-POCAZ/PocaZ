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

      so.on('joinRoom', (a: any, callback) => {
        so.join(a);
        console.log('a "가 연결됨" :>>', a);
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
