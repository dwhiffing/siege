import Unit from './unit'

const ANIMATIONS = {
  idle: [[0], 2],
  shoot: [[1], 2],
}

export default class Ranged extends Unit {
  constructor(game, x, y, key, {boomSound='small_crash_1', boomVolume=1}) {
    super(game, x, y, key)
    this.addAnimations(ANIMATIONS)
    this.bullets = game.add.group(undefined, 'bullets', false, true)
    this.bullets.createMultiple(15, 'bullet')
    this.bullets.callAll('kill')
    this.attackSound = game.add.audio('pick')
    this.boomSound = game.add.audio(boomSound)
    this.boomSound.volume = boomVolume
    this.bullets.forEach(bullet => {
      bullet.explode = () => {
        this.boomSound.play()
        this.game.blasts.get(bullet.x, bullet.y, Math.pow(bullet.size, 3)/7)
        bullet.kill()
      }
    })
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.x = this.game.rnd.integerInRange(1, 3) * 20 * direction + x
    this.direction = direction
    this.animations.play('idle')
  }

  shoot(numShots=1, size=1, minVelocityX, maxVelocityX, minVelocityY, maxVelocityY, minShotTime, maxShotTime) {
    setTimeout(() => {
      this.animations.play('shoot')
      for (let i = 0; i < numShots; i++) {
        let bullet = this.bullets.getFirstDead()
        this.attackSound.play()
        this.lifespan = this.game.rnd.integerInRange(2500, 3000)
        bullet.reset(this.x + 20 * this.direction, this.y - 70)
        bullet.size = size
        bullet.scale.set(size)
        bullet.body.gravity.y = 200
        bullet.body.velocity.x = this.game.rnd.integerInRange(minVelocityX, maxVelocityX) * this.direction
        bullet.body.velocity.y = this.game.rnd.integerInRange(minVelocityY, maxVelocityY)
      }
    }, this.game.rnd.integerInRange(minShotTime, maxShotTime))
  }

  update() {
    this.game.physics.arcade.overlap(
      this.bullets, this.game.ground,
      (one, two) => {
        if (one.explode) {
          one.explode()
        } else if (two.explode) {
          two.explode()
        }
      }, null, this
    )
  }
}
