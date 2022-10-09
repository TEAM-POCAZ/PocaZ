import socket from 'socket.io-client'

export default class Socket {
  private io
  constructor(baseURL: string) {
    this.io = socket(baseURL)

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message)
    })
  }
}
