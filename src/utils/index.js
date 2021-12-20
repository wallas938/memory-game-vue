import Player from '../models/Player';

export function setPlayers(playerNumber) {
  const players = [new Player(1, 0)];
  switch (playerNumber) {
    case "two":
      players.push(new Player(2, 0));
      break;
    case "three":
      players.push(new Player(2, 0), new Player(3, 0));
      break;
    case "four":
      players.push(new Player(2, 0), new Player(3, 0), new Player(4, 0));
      break;
  }
  return players;
}
