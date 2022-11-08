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
        if (!obj) callback('join에서 에러가 발생했어요.');
        const { roomId, socketId } = obj;
        const isRoom = this.io.sockets.adapter.rooms.get(roomId)?.size ?? 1;

        console.log(
          '확인>>>>>>>>>>',
          this.io.sockets.adapter.rooms.get(roomId)?.has(socketId)
        );
        // console.log(this.io.sockets.adapter.rooms);
        // console.log('위에서 찍히나요', isRoom);

        if (
          isRoom &&
          isRoom < 2 &&
          !this.io.sockets.adapter.rooms.get(roomId)?.has(socketId)
        ) {
          so.join(roomId);
          callback(roomId);
          console.log('room이 연결됨 :>>', roomId);
        } else {
          console.log(
            socketId + 'tried to join roomNumber : ' + roomId + ' already join'
          );

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
