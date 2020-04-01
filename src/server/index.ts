import appRoot from 'app-root-path';
import express from 'express';
import http from 'http';
import { resolve } from 'path';
import webSocket from 'socket.io';

import Game from '../client/game';

const games = [];

const app = express();
const server = http.createServer(app);
const io = webSocket(server);

const port = process.env.PORT || '3000';

app.use(
  express.static(resolve(appRoot.path, 'dist', 'public'))
);

io.on('connection', function(socket){
  const game = new Game();

  game.addPlayer(socket);

  game.start();

  games.push(game);
});

server.listen(port, function(){
  console.log('Listening on *:3000');
});
