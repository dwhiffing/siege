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

  get(x, y, scale = 0.3, direction) {
    let blast = this.getFirstDead() || this.create()
    blast.reset(x, y)
    blast.tint = 0xffffff
    blast.scale.setTo(scale, scale)

    blast.angle = this.game.rnd.integerInRange(0, 360)
    blast.animations.play('boom')
    this.getInRangeForDamage(blast, Math.floor(scale * 100), this.game.spawner.getTargets()).forEach((r) => {
      if (r.direction !== direction) {
        r.hit(scale * 50)
      }
    })

    return blast
  }

  getInRangeForDamage(source, range, array) {
    return array.filter((thing) => {
      const _range = this.getDist(source, thing)
      return _range < range
    })
  }

  getDist(source, thing) {
    return this.game.math.distance(source.x, source.y, thing.x, thing.y);
  }
}
