import Melee from '../sprites/melee'

export default class Soldier extends Melee {
  constructor(game, x, y, key) {
    const opts = {
      baseDamage: 10,
      attackSound: 'small_crash_2',
      attackVolume: 0.2,
      baseHealth: 80,
      baseSpeed: 60,
      amount: 6,
      speedVariation: 15,
      healthVariation: 50,
      damageVariation: 5,
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    this.sizeX = 10
    this.sizeY = 15
    super.reset(x, y, direction)
    const scaling = this.game.rnd.integerInRange(1,6)/10 + 2.5
    this.scale.set(scaling * direction, scaling*0.9)
  }
}
