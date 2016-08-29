import Melee from '../sprites/melee'

export default class Knight extends Melee {
  constructor(game, x, y, key) {
    const opts = {
      baseDamage: 15,
      attackSound: 'medium_crash_7',
      attackVolume: 0.2,
      baseHealth: 50,
      baseSpeed: 130,
      amount: 3,
      speedVariation: 30,
      healthVariation: 10,
      damageVariation: 5,
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    this.sizeX = 10
    this.sizeY = 15
    super.reset(x, y, direction)
    this.scale.set(4.6 * direction, 4)
  }
}
