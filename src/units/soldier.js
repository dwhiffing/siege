import Melee from '../sprites/melee'

export default class Soldier extends Melee {
  constructor(game, x, y, key) {
    const opts = {
      baseDamage: 4,
      attackSound: 'small_crash_2',
      attackVolume: 0.5,
      baseHealth: 30,
      baseSpeed: 40,
      speedVariation: 20,
      healthVariation: 10,
      damageVariation: 2,
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    this.sizeX = 10
    this.sizeY = 15
    super.reset(x, y, direction)
  }
}
