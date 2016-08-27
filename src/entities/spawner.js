import Unit from './Unit'

export default class Spawner {
  constructor(game) {
    this.game = game
    this.units = game.add.group(undefined, 'units', false, true)
    this.units.classType = Unit
    this.units.createMultiple(40, 'tiles')
  }

  update() {
    this.units.callAll('update')
  }

  spawn(frame) {
    let unit = this.units.getFirstDead()
    unit.reset(-10, 360, frame)
  }
}
