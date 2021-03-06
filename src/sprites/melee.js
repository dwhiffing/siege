import Unit from './unit'

const change = (arr, key) => arr.map(n => ({ key, frame: n }))
const ANIMATIONS = {
  idle: {
    key: 'soldier_idle',
    frames: change([0], 'soldier'),
  },
  walk: {
    key: 'soldier_walk',
    frames: change([0, 1, 0, 2], 'soldier'),
    frameRate: 5,
    repeat: -1,
  },
  attack: {
    key: 'soldier_attack',
    frames: change([0, 3, 4], 'soldier'),
    frameRate: 5,
  },
}

export default class Melee extends Unit {
  constructor({
    game,
    x,
    y,
    key,
    baseDamage = 1,
    baseHealth = 10,
    baseSpeed = 100,
    attackSound = 'swipe',
    amount = 1,
  }) {
    super({ game, x, y, key })
    this.baseDamage = baseDamage
    this.baseHealth = baseHealth
    this.baseSpeed = baseSpeed
    this.amount = amount
    this.attackSound = game.sound.add(attackSound)
    this.addAnimations(ANIMATIONS)
  }

  reset(x, y, flipped) {
    super.reset(x, y, flipped)
    this.play('soldier_walk')
    this.isAttacking = false
    this.isStopped = false
    this.maxHealth = this.baseHealth
    this.health = this.maxHealth
    this.speed = this.baseSpeed * (flipped ? -1 : 1)
    this.damageAmount = this.baseDamage
    this.body.velocity.x = this.speed
  }

  update() {
    if (!this.active) {
      return
    }
    if (
      this.isStopped === false &&
      !this.isAttacking &&
      this.body.velocity.x === 0
    ) {
      this.play('soldier_walk')
      this.body.velocity.x = this.speed
    }

    if (this.x > 450) {
      this.game.castle2.damage(this.damageAmount)
      this.destroy()
    } else if (this.x < -50) {
      this.game.castle.damage(this.damageAmount)
      this.destroy()
    }
  }

  stop() {
    if (this.isStopped) {
      return
    }
    this.play('soldier_idle')
    this.body.velocity.x = 0
    this.isStopped = true
    this.game.time.addEvent({
      delay: 500,
      callback: () => {
        this.isStopped = false
      },
    })
  }

  overlap(unit) {
    if (!this.active) {
      return
    }
    if (unit.flipX !== this.flipX) {
      if (!this.isAttacking) {
        this.attack(unit)
      }
    } else {
      if ((!this.flipX && this.x < unit.x) || (this.flipX && this.x > unit.x)) {
        this.stop()
      }
    }
  }

  destroy() {
    this.setPosition(this.x, -200)
    this.setActive(false)
    this.setVisible(false)
  }

  hit(amount) {
    this.health -= amount
    if (this.health < 0) {
      this.destroy()
    }
  }

  attack(soldier) {
    this.play('soldier_attack')
    this.isAttacking = true
    this.body.velocity.x = 0
    soldier.hit(this.damageAmount)

    this.game.time.addEvent({
      delay: 500,
      callback: () => (this.isAttacking = false),
    })
  }
}
