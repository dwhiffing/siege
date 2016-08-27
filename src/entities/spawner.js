import Unit from './Unit'

export default class Spawner {
  constructor(game) {
    this.game = game
    this.units = game.add.group(undefined, 'units', false, true)
    this.units.classType = Unit
    this.units.createMultiple(40, 'units')
  }

  update() {
    this.units.callAll('update')
    this.game.physics.arcade.overlap(
      this.units, this.units,
      (one, two) => {
        one.overlap(two)
        two.overlap(one)
      }, null, this
    )
  }

  render() {
    this.units.callAll('render')
  }

  spawn(frame, otherSide) {
    let unit = this.units.getFirstDead()
    const x = otherSide ? 1100 : -10
    unit.reset(x, 580, frame, otherSide ? -1 : 1)
  }
}
