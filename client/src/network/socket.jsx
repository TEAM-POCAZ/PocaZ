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
            console.log("this.io :>> ", this.io);
            this.io.connect();
        }

        this.io.on(e, (message) => {
            // console.log(message);
            cb(message);
        });

        // return () => this.io.off(e)
    }

    emitSync(e, newMsg) {
        this.io.emit(e, newMsg);
    }

    joinRoom(val) {
        this.io.emit("joinRoom", val);
    }

    /**
     *
     * @param {object} value sellerId와 userId를 보냄
     */
    createRoom(Ids) {
        this.io.emit("createRoom", Ids);
    }
}
