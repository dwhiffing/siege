import Unit from './unit'

const MIN_SPEED = 100 // 10
const MAX_SPEED = 120 // 30
const ANIMATIONS = {
  idle: [[0], 2],
  walk: [[0, 1, 0, 2], 2, true],
  attack: [[0, 3, 4], 5],
}

export default class Soldier extends Unit {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.addAnimations(ANIMATIONS)
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.animations.play('walk')
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
    if (this.body.velocity.x !== 0) {
      this.body.velocity.x = 0
      setTimeout(() => {
        if (!this.hasOverlapped) {
          this.body.velocity.x = this.speed
        }
      }, 500)
    }
  }

  overlap(soldier) {
    this.hasOverlapped = true
    if (soldier.direction !== this.direction) {
      this.stop()
      if (!this.isAttacking) {
        this.attack(soldier)
      }
    } else {
      if (this.direction === 1 && this.x < soldier.x || this.direction === -1 && this.x > soldier.x) {
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

  attack(soldier) {
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
    tween.onRepeat.addOnce(soldier.hit.bind(soldier))
    tween.onComplete.add(() => setTimeout(() => this.isAttacking = false, 300))
  }
}
