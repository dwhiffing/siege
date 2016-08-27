import Phaser from 'phaser'

export default class Unit extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.anchor.x = 0.5
    this.anchor.y = 1
    this.game = game
    // this.kill()
  }

  reset(x, y, frame, direction=1) {
    super.reset(x, y, 10)
    this.frame = frame || this.game.rnd.integerInRange(0, this.animations.frameTotal - 1)
    this.direction = direction
    this.body.setSize(40, 50, direction === 1 ? 0 : -20, 0);
    this.speed = 200 * direction
    this.body.velocity.x = this.speed
  }

  update() {
    if (!this.alive) {
      return
    }
    this.hasOverlapped = false

    if (this.x > 1400 || this.x < -40) {
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
    this.isAttacking = true
    const tween = this.game.add.tween(this)
    tween.to({
        angle: 20 * this.direction,
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
