import Phaser from 'phaser'

// const MIN_SPEED = 10
// const MAX_SPEED = 30

const MIN_SPEED = 100
const MAX_SPEED = 120

export default class Unit extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.anchor.x = 0.5
    this.anchor.y = 1
    this.scale.set(3,3)
    this.game = game
    this.animations.add('idle', [0], 2, true)
    this.animations.add('walk', [0, 1, 0, 2], 2, true)
    this.animations.add('attack', [0, 3, 4], 5)
  }

  reset(x, y, frame, direction=1) {
    super.reset(x, y, 10)
    this.frame = frame || this.game.rnd.integerInRange(0, this.animations.frameTotal - 1)
    this.animations.play('walk')
    this.direction = direction
    this.scale.x = direction * 3
    this.tint = direction === 1 ? 0xff9999 : 0x9999ff
    this.body.setSize(10, 15, direction === 1 ? 0 : -5, 0);
    this.speed = this.game.rnd.integerInRange(MIN_SPEED,MAX_SPEED) * direction
    this.body.velocity.x = this.speed
  }

  update() {
    if (!this.alive) {
      return
    }
    this.hasOverlapped = false

    if (this.x > 1400 || this.x < -40) {
      if (this.x > 1400) {
        this.game.castle2.damage(20)
      } else {
        this.game.castle.damage(20)
      }
      this.kill()
    }
  }

  kill() {
    this.body.x = -10
    this.body.y = -300
    super.kill()
  }

  stop() {
    // this.animations.play('idle')
    if (this.body.velocity.x !== 0) {
      this.body.velocity.x = 0
      setTimeout(() => {
        if (!this.hasOverlapped) {
          // this.animations.play('walk')
          this.body.velocity.x = this.speed
        }
      }, 500)
    }
  }

  overlap(unit) {
    this.hasOverlapped = true
    if (unit.direction !== this.direction) {
      this.stop()
      if (!this.isAttacking) {
        this.attack(unit)
      }
    } else {
      if (this.direction === 1 && this.x < unit.x || this.direction === -1 && this.x > unit.x) {
        this.stop()
      }
    }
  }

  hit() {
    this.damage(2)
    return this.game.add.tween(this).to({
        alpha: 0.8,
      },
      100,
      Phaser.Easing.Quadratic.InOut,
      true,
      0,
      1,
      true
    )
  }

  attack(unit) {
    this.animations.play('attack')
    this.isAttacking = true
    const tween = this.game.add.tween(this)
    tween.to({
        angle: 5 * this.direction,
      },
      200,
      Phaser.Easing.Quadratic.InOut,
      true,
      0,
      0,
      true
    )
    tween.onRepeat.addOnce(unit.hit.bind(unit))
    tween.onComplete.add(() => setTimeout(() => this.isAttacking = false, 300))
  }

  render() {
    // this.game.debug.body(this)
  }
}
