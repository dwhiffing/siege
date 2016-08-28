import Melee from '../sprites/melee'

const MIN_SPEED = 100 // 10
const MAX_SPEED = 120 // 30

export default class Soldier extends Melee {
  reset(x, y, direction) {
    this.speed = this.game.rnd.integerInRange(MIN_SPEED,MAX_SPEED) * direction
    super.reset(x, y, direction)
  }
}
