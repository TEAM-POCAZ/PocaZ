import { Server } from 'socket.io';
import { createChat } from './../controller/chat';
import { getCheckChatRoom } from './../controller/chat';

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
          '채팅방 확인>>>>>>>>>>',
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

      so.on('createRoom', async (chatInfo: any, callback: any) => {
        if (chatInfo) {
          const res = await getCheckChatRoom(chatInfo);
          const newRoom = String(res);
          so.join(newRoom);
          callback(newRoom);
        }
      });

      so.on('disconnect', () => {
        console.log('클라이언트 접속 해제', so.id);
        clearInterval(so.interval);
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
