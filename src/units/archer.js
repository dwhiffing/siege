import Ranged from '../sprites/ranged'

const SHOT_TIME = 800
const MIN_SHOT_VELOCITY_X = 350
const MAX_SHOT_VELOCITY_X = 450
const MIN_SHOT_VELOCITY_Y = -150
const MAX_SHOT_VELOCITY_Y = -200

export default class Archer extends Ranged {
  constructor(game, x, y, key) {
    const opts = {
      boomSound: 'small_crash_3',
    }
    super(game, x, y, key, opts)
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.shoot()
  }

  shoot(numShots=5, size=1.3) {
    this.game.time.events.repeat(SHOT_TIME, numShots, () => {
      super.shoot(1, size, MIN_SHOT_VELOCITY_X, MAX_SHOT_VELOCITY_X, MIN_SHOT_VELOCITY_Y, MAX_SHOT_VELOCITY_Y, 0, 0)
    })
  }
}
