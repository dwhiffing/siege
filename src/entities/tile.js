import Phaser from 'phaser'

export default class Tile extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.game = game
    this.frame = this.randomType()
  }

  randomType() {
    return this.game.rnd.integerInRange(0, this.animations.frameTotal - 1)
  }

  reset(x, y, frame) {
    this.frame = frame || this.randomType()
    super.reset(x, y)
  }

  update() {}
}
