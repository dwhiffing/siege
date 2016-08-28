import Ranged from './ranged'

const MIN_SHOT_TIME = 200
const MAX_SHOT_TIME = 800
const MIN_SHOT_VELOCITY_X = 350
const MAX_SHOT_VELOCITY_X = 450
const MIN_SHOT_VELOCITY_Y = -150
const MAX_SHOT_VELOCITY_Y = -200

export default class Catapult extends Ranged {
  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.shoot(1, 2)
  }

  shoot(numShots=5, size=1) {
    super.shoot(numShots, size, MIN_SHOT_VELOCITY_X, MAX_SHOT_VELOCITY_X, MIN_SHOT_VELOCITY_Y, MAX_SHOT_VELOCITY_Y, MIN_SHOT_TIME, MAX_SHOT_TIME)
  }
}
