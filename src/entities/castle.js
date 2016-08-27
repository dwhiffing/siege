import Phaser from 'phaser'

export default class Castle {
  constructor(game, x, y) {
    this.sprite = game.add.sprite(x, y, 'castle')
    this.game = game
  }
}
