import Phaser from 'phaser'

export default class BlastManager extends Phaser.Group {
  constructor(game) {
    super(game)
    this.game = game
    this.name = "BlastGroup"
  }

  create() {
    let blast = this.game.add.sprite(0, 0, 'explosion')
    blast.anchor.setTo(0.5, 0.5)
    this.add(blast)

    let animation = blast.animations.add('boom', [0,1,2,3], 25, false)
    animation.killOnComplete = true

    return blast
  }

  get(x, y, scale = 0.3, tint=0xffffff) {
    let blast = this.getFirstDead() || this.create()
    blast.reset(x, y)
    blast.tint = tint
    blast.scale.setTo(scale, scale)

    blast.angle = this.game.rnd.integerInRange(0, 360)
    blast.animations.play('boom')

    return blast
  }
}
