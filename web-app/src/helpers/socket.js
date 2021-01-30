import socketIOClient from 'socket.io-client';
import config from '../config.json';

let socketIO = null;

if (localStorage.getItem('userToken')) {
  socketIO = socketIOClient(config.WSpath[process.env.NODE_ENV] + config.WSPrefixServer, {
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    path: config.WSServerPath,
    transports: ['polling', 'websocket'],
    query: {
      gate: localStorage.getItem('userToken'),
    },
  });

  socketIO.on('disconnect', () => {
    socketIO.connect();
    socketIO.emit(5, localStorage.getItem('userToken'));
    socketIO.emit(6, localStorage.getItem('userToken'));
  });
  socketIO.on('connect', () => {
    socketIO.emit(6, localStorage.getItem('userToken'));
    if (socketIO.disconnected) {
      socketIO.connect();
    }
  });
  socketIO.on('reconnect_attempt', () => {
    socketIO.connect();
    socketIO.emit(6, localStorage.getItem('userToken'));
    socketIO.io.opts.query = {
      gate: localStorage.getItem('userToken'),
    };
  });

  socketIO.connect();
}

export default socketIO;
