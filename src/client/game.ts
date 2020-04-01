import { Socket } from 'socket.io';

interface Player {
  socket: Socket;
}

export default class Game {
  private players: Player[] = [];

  addPlayer(socket: Socket): void {
    this.players.push({ socket });
  }

  start(): void {
    let timestamp = Date.now();

    this.broadcast('GameStarted');

    const loop = () => {
      const deltaTime = (Date.now() - timestamp) / 1000;

      timestamp = Date.now();

      this.tick(deltaTime);

      setTimeout(() => {
        loop();
      }, 12);
    };

    loop();
  }

  private broadcast(type: string, payload: { [ index: string ]: any } = {}): void {
    this.players.forEach(player => player.socket.emit(type, payload));
  }

  private tick(deltaTime: number): void {

  }
}
