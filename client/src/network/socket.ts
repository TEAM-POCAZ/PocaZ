import socket from 'socket.io-client'

export default class Socket {
  private io
  constructor(baseURL: string) {
    this.io = socket(baseURL)

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message)
    })

    this.io.emit('ss', '1')
  }

  onSync(e: any, cb: any) {
    if (!this.io.connected) {
      this.io.connect()
    }

    this.io.on(e, (message: any) => {
      console.log(message)
      cb(message)
    })

    return () => this.io.off(e)
  }
}
