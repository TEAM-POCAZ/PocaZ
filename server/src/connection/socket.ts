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

    this.io.on('connection', (so: any) => {
      console.log('Socket connected :)!!');

      so.on('joinRoom', (obj: any, callback: any) => {
        const { roomId, socketId } = obj;

        console.log();
        if (this.io.sockets.adapter.rooms.get(roomId)) {
          console.log(
            socketId +
              'tried to join ' +
              roomId +
              'but the room does not exist.'
          );
        } else {
          so.join(roomId);
          console.log('room이 연결됨 :>>', roomId);
          // Socket.join is not executed, hence the room not created.
        }
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
