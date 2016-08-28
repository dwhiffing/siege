import Unit from './unit'

const MIN_SHOT_TIME = 200
const MAX_SHOT_TIME = 800
const MIN_SHOT_VELOCITY_X = 350
const MAX_SHOT_VELOCITY_X = 450
const MIN_SHOT_VELOCITY_Y = -150
const MAX_SHOT_VELOCITY_Y = -200
const ANIMATIONS = {
  idle: [[0], 2],
  shoot: [[1], 2],
}

export default class Archer extends Unit {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.addAnimations(ANIMATIONS)
    this.bullets = game.add.group(undefined, 'bullets', false, true)
    this.bullets.createMultiple(5, 'bullet')
    this.bullets.callAll('kill')
  }

  kill() {
    super.kill()
    this.bullets.callAll('kill')
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.x = this.game.rnd.integerInRange(1, 3) * 40 * direction + x
    this.direction = direction
    this.animations.play('idle')
    this.shoot(5)
  }

  shoot(numShots=1) {
    setTimeout(() => {
      this.animations.play('shoot')
      for (let i = 0; i < numShots; i++) {
        let bullet = this.bullets.getFirstDead()
        this.lifespan = this.game.rnd.integerInRange(2500, 3000)
        bullet.reset(this.x + 20 * this.direction, this.y - 70)
        bullet.body.gravity.y = 200
        bullet.body.velocity.x = this.game.rnd.integerInRange(MIN_SHOT_VELOCITY_X, MAX_SHOT_VELOCITY_X) * this.direction
        bullet.body.velocity.y = this.game.rnd.integerInRange(MIN_SHOT_VELOCITY_Y, MAX_SHOT_VELOCITY_Y)
      }
    }, this.game.rnd.integerInRange(MIN_SHOT_TIME, MAX_SHOT_TIME))
  }

  update() {
    this.game.physics.arcade.overlap(
      this.bullets, this.game.ground.sprite,
      (one, two) => {
        if (one.key !== 'ground') {
          one.kill()
        } else {
          two.kill()
        }
      }, null, this
    )
  }
}
