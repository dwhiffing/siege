import Melee from '../sprites/melee'

export default class Elephant extends Melee {
  constructor(game, x, y, key) {
    const opts = {
      baseDamage: 20,
      attackSound: 'medium_crash_1',
      attackVolume: 0.3,
      baseHealth: 170,
      baseSpeed: 20,
      speedVariation: 5,
      healthVariation: 50,
      damageVariation: 2,
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    this.sizeX = 10
    this.sizeY = 15
    super.reset(x, y, direction)
    this.scale.set(7 * direction, 7)
  }
}
