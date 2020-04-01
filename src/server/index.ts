import appRoot from 'app-root-path';
import express from 'express';
import http from 'http';
import { resolve } from 'path';
import webSocket from 'socket.io';

class Game {

  tick(): void {

  }
}

const app = express();
const server = http.createServer(app);
const io = webSocket(http);

const port = process.env.PORT || '3000';

app.use(
  express.static(resolve(appRoot.path, 'dist', 'public'))
);

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(port, function(){
  console.log('Listening on *:3000');
});
