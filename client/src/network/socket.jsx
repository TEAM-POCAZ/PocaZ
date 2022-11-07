import { io } from "socket.io-client";

export default class Socket {
    constructor(baseURL) {
        this.io = io(baseURL);

        // this.io.on('connect_error', (err) => {
        //   console.log('socket error', err.message)
        // })
    }

    onSync(e, cb) {
        if (!this.io.connected) {
            this.io.connect();
        }

        this.io.on(e, (message) => {
            cb(message);
        });

        // return () => this.io.off(e)
    }

    emitSync(e, newMsg) {
        this.io.emit(e, newMsg);
    }

    joinRoom(roomId, cb = null) {
        const socketId = this.io.id;
        this.io.emit("joinRoom", { roomId, socketId }, cb);
    }

    /**
     *
     * @param {object} chatInfo sellerId와 userId를 보냄
     */
    createRoom(chatInfo, cb) {
        this.io.emit("createRoom", chatInfo, cb);
    }
}
