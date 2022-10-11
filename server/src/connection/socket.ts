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
      so.on('joinRoom', (a: any) => {
        console.log(a);
        so.join(a);

        // this.io.to(a).emit('test', '123123123');
      });
      // so.join('1');

      // so.to('1').emit('tt', 'hihihihihhi');

      // so.on('disconnect', () => {
      //   console.log('out!!');
      //   so.leave('1');
      // });
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
