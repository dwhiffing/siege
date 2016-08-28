import Phaser from 'phaser'

export default class Unit extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.anchor.x = 0.5
    this.anchor.y = 1
    this.game = game
    this.scale.set(3,3)
  }

  addAnimations(animations) {
    Object.keys(animations).forEach(key => {
      this.animations.add(key, ...animations[key])
    })
  }

  reset(x, y, direction=1) {
    super.reset(x, y, 10)
    this.direction = direction
    this.scale.x = direction * 3
    this.tint = direction === 1 ? 0xff9999 : 0x9999ff
  }

  update() {
    //
  }

  render() {
    // this.game.debug.body(this)
  }
}
