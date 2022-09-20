// socket connection 작성파일

import { Server } from 'socket.io';

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
      //   so.on('message', (ee: any) => {
      //     console.log(ee);
      //   });
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
