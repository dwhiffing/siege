import Melee from '../sprites/melee'

export default class Knight extends Melee {
  constructor(game, x, y, key) {
    const opts = {
      baseDamage: 2,
      baseHealth: 5,
      baseSpeed: 300,
      speedVariation: 100,
      healthVariation: 5,
      damageVariation: 2,
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    this.sizeX = 10
    this.sizeY = 15
    super.reset(x, y, direction)
    this.scale.set(4 * direction, 4)
  }
}
