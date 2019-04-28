import io from 'socket.io-client'

export default function () {
  if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
    return io.connect('127.0.0.1:3000')
  } else if (window.location.href.includes('https://letsdraw.me')) {
    return io.connect('https://server.letsdraw.me')
  } else {
    return io.connect('https://devserver.letsdraw.me')
  }
}
