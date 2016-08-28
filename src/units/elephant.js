import Melee from '../sprites/melee'

export default class Elephant extends Melee {
  constructor(game, x, y, key) {
    const opts = {
      baseDamage: 20,
      baseHealth: 100,
      baseSpeed: 30,
      speedVariation: 5,
      healthVariation: 10,
      damageVariation: 2,
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    this.sizeX = 10
    this.sizeY = 15
    super.reset(x, y, direction)
    this.scale.set(6 * direction, 6)
  }
}
