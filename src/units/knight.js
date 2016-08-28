import Melee from '../sprites/melee'

const MIN_SPEED = 200 // 10
const MAX_SPEED = 300 // 30

export default class Knight extends Melee {
  reset(x, y, direction) {
    this.speed = this.game.rnd.integerInRange(MIN_SPEED,MAX_SPEED) * direction
    super.reset(x, y, direction)
    this.scale.set(4 * direction, 4)
  }
}
