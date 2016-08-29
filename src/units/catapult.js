import Ranged from '../sprites/ranged'

const MIN_SHOT_TIME = 600
const MAX_SHOT_TIME = 1000
const MIN_SHOT_VELOCITY_X = 250
const MAX_SHOT_VELOCITY_X = 300
const MIN_SHOT_VELOCITY_Y = -150
const MAX_SHOT_VELOCITY_Y = -200

export default class Catapult extends Ranged {
  constructor(game, x, y, key) {
    const opts = {
      boomSound: 'medium_crash_2',
    }
    super(game, x, y, key, opts)
    this.unitWidth = 60
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.shoot()
  }

  shoot(numShots=2, size=2) {
    super.shoot(numShots, size, MIN_SHOT_VELOCITY_X, MAX_SHOT_VELOCITY_X, MIN_SHOT_VELOCITY_Y, MAX_SHOT_VELOCITY_Y, MIN_SHOT_TIME, MAX_SHOT_TIME)
  }
}
