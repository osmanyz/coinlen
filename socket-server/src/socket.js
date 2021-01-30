const env = require('dotenv');
env.config();

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const rdb = require('./connect/rdb');
// const BSON = require('bson');
// const Long = BSON.Long;
// socket.to(room).emit('realtime coins', BSON.serialize({ long: Long.fromNumber(coins.length), coins: coins }));

/**
 * Socket Server
 *
 * CODE MEANS
 * 5: disconnect from realtime server
 * 6: connect to realtime server     # it disabled
 * 7: realtime coins
 * 8: connect to realtime coins format
 * c4: realtime coins format
 *
 * 72352181: private listener from provider server
 */
class SocketServer {
  constructor() {
    this.server = http.createServer(express());
    this.io = socketIO(this.server, {
      path: process.env.SOCKET_PATH,
    });
    this.rooms = new Map();
  }

  async _serverSocketConnection() {
    let rooms = this.rooms;

    this.io.set('origins', [process.env.APP_DOMAIN, 'localhost:*', '127.0.0.1:*']);

    this.io.of(process.env.SOCKET_NAMESPACE).use((socket, next) => {
      if (typeof socket.handshake.query === 'object' || typeof socket.handshake.query.gate !== 'undefined') {
        let gate = socket.handshake.query.gate;

        jwt.verify(gate, process.env.JWT_SECRET, (error, decoded) => {
          console.log('USER IS CONNECTING TO THE SERVER');
          if (error) {
            rooms.delete(gate);
            socket.leave(gate);

            return next(new Error('Authentication error!'));
          }

          if (typeof decoded === "object" && typeof decoded.email !== "undefined") {
            if (rooms.get(gate)) {
              rooms.delete(gate);
              socket.leave(gate);
            }

            socket.room = gate;
            socket.join(gate);
            rooms.set(gate, false);

            console.log('USER TRY TO CONNECT TO SERVER');
            return next();
          }
        });
      }

      if (typeof socket.handshake.query === 'object' || typeof socket.handshake.query.worker !== 'undefined') {
        if (socket.handshake.query.worker === (process.env.JWT_SECRET + process.env.JWT_ALGORITHM).toString()) {
          return next();
        }
      }

      return next(new Error('Authentication error!'));
    });

    let timerIndex = 0;
    let loop;

    // The function startStreaming starts streaming data to all the users
    const startStreaming = () => {
      loop = setInterval(() => {
        if (rooms.size > 0) {
          rdb.tickerCoins()
            .then((coins) => {
              for (let room of rooms.keys()) {
                if (rooms.get(room)) {
                  this.io.of(process.env.SOCKET_NAMESPACE).to(room).emit(7, coins);
                }
              }
            })
            .catch((error) => console.error(error));
        }
        timerIndex++;
      }, 1000);
    };

    // The function stopStreaming stops streaming data to all the users
    function stopStreaming() {
      clearInterval(loop);
    }

    this.io.of(process.env.SOCKET_NAMESPACE).on('connection', (socket) => {
      socket.on(6, (payload) => {
        console.log('SOCKET OPENS');
        if (rooms.has(payload)) {
          rooms.set(payload, true);
        }
      });

      socket.on(5, (payload) => {
        console.log('socket closed by number 5');
        rooms.delete(payload);
        socket.leave(payload);

        if (rooms.size === 0) {
          rooms.clear();
        }
      });

      /**
       * Tip: if you want to be sure for the long-time connection trigger the listeners you can added event fire by some cron
       */
      let nspSockets = this.io.of(process.env.SOCKET_NAMESPACE).sockets;
      if (Object.keys(nspSockets).length === 1) {
        console.log('STREAMING STARTED');
        startStreaming();
      }

      socket.on('disconnect', () => {
        console.log('server client disconnected');
        if (Object.keys(nspSockets).length === 0) {
          console.log('STREAMING STOPPED');
          stopStreaming();
        }
      });
    });
  }

  async run() {
    await this._serverSocketConnection();
  }

  async runServer() {
    this.server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
  }
}

// get server
const server = new SocketServer();

// then run socket
server.run().then(r => {});

// run server
server.runServer().then(r => {});
