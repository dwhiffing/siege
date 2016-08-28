import Ranged from '../sprites/ranged'

const MIN_SHOT_TIME = 200
const MAX_SHOT_TIME = 800
const MIN_SHOT_VELOCITY_X = 350
const MAX_SHOT_VELOCITY_X = 450
const MIN_SHOT_VELOCITY_Y = -150
const MAX_SHOT_VELOCITY_Y = -200

export default class Catapult extends Ranged {
  constructor(game, x, y, key) {
    const opts = {
      boomSound: 'medium_crash_2',
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.shoot()
  }

  shoot(numShots=1, size=2) {
    super.shoot(numShots, size, MIN_SHOT_VELOCITY_X, MAX_SHOT_VELOCITY_X, MIN_SHOT_VELOCITY_Y, MAX_SHOT_VELOCITY_Y, MIN_SHOT_TIME, MAX_SHOT_TIME)
  }
}
