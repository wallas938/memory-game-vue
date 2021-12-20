export default class Player {

  constructor(playerNumber, points) {
    this.playerNumber = playerNumber;
    this.points = points;
  }

  /**
   * @returns {Number} player's number
   */
  get _playerNumber() {
    return this.playerNumber;
  }

  /**
   * @param {Number} playerNumber
   */
  set setPlayerNumber(playerNumber) {
    this.playerNumber = playerNumber;
  }

  /**
   * @returns {Number} player's points
   */
  get _points() {
    return this.points;
  }
  /**
   * @param {Number} points
   */
  set setPoints(points) {
    this.points = points
  }
}
