import { io } from 'socket.io-client'

interface INewMsg {
  user: string
  message: string | number
  chatRoom: string
}

export default class Socket {
  private io
  constructor(baseURL: string) {
    this.io = io(baseURL)

    // this.io.on('connect_error', (err) => {
    //   console.log('socket error', err.message)
    // })
  }

  onSync(e: any, cb: any) {
    if (!this.io.connected) {
      console.log('this.io :>> ', this.io)
      this.io.connect()
    }

    this.io.on(e, (message: any) => {
      // console.log(message)
      cb(message)
    })

    // return () => this.io.off(e)
  }

  emitSync(e: string, newMsg: INewMsg) {
    console.log('this.io :>> ', this.io)
    this.io.emit(e, newMsg)
  }

  joinRoom(val: any) {
    // if (this.io.connected) {
    //   console.log('this.io 이미됨 :>> ', this.io)
    //   return
    // }
    this.io.emit('joinRoom', val)
  }
}
