import Phaser from 'phaser'

export default class Ground {
  constructor(game, x, y) {
    this.sprite = game.add.sprite(x, y, 'ground')
    this.game = game
    game.physics.arcade.enable(this.sprite)
  }
}
