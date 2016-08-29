import Unit from './unit'

const MIN_SPEED = 100 // 10
const MAX_SPEED = 120 // 30
const ANIMATIONS = {
  idle: [[0], 2],
  walk: [[0, 1, 0, 2], 2, true],
  attack: [[0, 3, 4], 5],
}

export default class Melee extends Unit {
  constructor(game, x, y, key, { baseDamage=1, baseHealth=10, baseSpeed=100, speedVariation=20, healthVariation=20, damageVariation=5, attackSound="swipe", attackVolume=1, amount=1 }) {
    super(game, x, y, key)
    this.baseDamage = baseDamage
    this.baseHealth = baseHealth
    this.baseSpeed = baseSpeed
    this.amount = amount
    this.speedVariation = speedVariation
    this.healthVariation = healthVariation
    this.damageVariation = damageVariation
    this.attackSound = game.add.audio(attackSound)
    this.attackSound.volume = attackVolume
    this.addAnimations(ANIMATIONS)
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.animations.play('walk')
    this.maxHealth = this.baseHealth + this.game.rnd.integerInRange(-this.healthVariation, this.healthVariation)
    this.heal(this.maxHealth)
    this.speed = (this.baseSpeed + this.game.rnd.integerInRange(-this.speedVariation, this.speedVariation)) * direction
    this.damageAmount = this.baseDamage + this.game.rnd.integerInRange(-this.damageVariation, this.damageVariation)
    this.body.setSize(this.sizeX, this.sizeY, direction === 1 ? 0 : -5, 0)
    this.body.velocity.x = this.speed
  }

  update() {
    if (!this.alive) {
      return
    }
    this.hasOverlapped = false

    if (this.x > 1400 || this.x < -40) {
      if (this.x > 1400) {
        this.game.castle2.damage(this.damageAmount)
      } else {
        this.game.castle.damage(this.damageAmount)
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

  overlap(unit) {
    this.hasOverlapped = true
    if (unit.direction !== this.direction) {
      this.stop()
      if (!this.isAttacking) {
        this.attack(unit)
      }
    } else {
      if (this.direction === 1 && this.x < unit.x || this.direction === -1 && this.x > unit.x) {
        if (unit.isAttacking) {
          this.stop()
        }
      }
    }
  }

  hit(amount) {
    this.damage(amount)
    this.stop()
    if (this.tweening) {
      return
    }
    this.tweening = true
    setTimeout(() => this.tweening = false, 500)
    return this.game.add.tween(this).to({
        alpha: 0.2,
      },
      250,
      Phaser.Easing.Quadratic.InOut,
      true,
      0,
      0,
      true
    )
  }

  attack(soldier) {
    if (this.game.rnd.integerInRange(0,10) === 1) {
      this.animations.play('attack')
    }
    this.attackSound.play()
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
    tween.onRepeat.addOnce(soldier.hit.bind(soldier, this.damageAmount))
    tween.onComplete.add(() => setTimeout(() => this.isAttacking = false, 300))
  }
}
