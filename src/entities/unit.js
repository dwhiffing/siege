import Phaser from 'phaser'

export default class Unit extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.game = game
    this.width = 15
    this.height = 30
    this.kill()
  }

  randomType() {
    return this.game.rnd.integerInRange(0, this.animations.frameTotal - 1)
  }

  reset(x, y, frame) {
    this.frame = frame || this.randomType()
    this.speed = this.game.rnd.integerInRange(100, 400) / 100
    super.reset(x, y)
  }

  update() {
    if (!this.alive) {
      return
    }

    if (this.x > 800) {
      this.kill()
    }
    this.x += this.speed
  }
}
