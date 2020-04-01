import io from 'socket.io-client';



function joinGame() {
  const socket = io();

  socket.on('connect', function() {
    console.log('Connected to server.');
  });

  socket.on('GameStarted', () => {
    console.log('Game Started');
  });
}


(function() {
  console.log('Hello World');

  joinGame();
})();

