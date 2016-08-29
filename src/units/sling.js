import Ranged from '../sprites/ranged'

const SHOT_TIME = 130
const MIN_SHOT_VELOCITY_X = 50
const MAX_SHOT_VELOCITY_X = 230
const MIN_SHOT_VELOCITY_Y = -100
const MAX_SHOT_VELOCITY_Y = -150

export default class Sling extends Ranged {
  constructor(game, x, y, key) {
    const opts = {
      boomSound: 'small_crash_2',
      boomVolume: 0.1,
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.shoot()
  }

  shoot(numShots=10, size=1.2) {
    this.game.time.events.repeat(SHOT_TIME, numShots, () => {
      super.shoot(1, size, MIN_SHOT_VELOCITY_X, MAX_SHOT_VELOCITY_X, MIN_SHOT_VELOCITY_Y, MAX_SHOT_VELOCITY_Y, 0, 0)
    })
  }
}
