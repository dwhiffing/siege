import Unit from './unit'
import Archer from './archer'

export default class Spawner {
  constructor(game) {
    this.game = game
    this.units = game.add.group(undefined, 'units', false, true)
    this.units.classType = Unit
    this.units.createMultiple(30, 'soldier')
    this.archers = game.add.group(undefined, 'units', false, true)
    this.archers.classType = Archer
    this.archers.createMultiple(30, 'archer')
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

  spawn(type, otherSide) {
    let thing = this[type].getFirstDead()
    const x = otherSide ? 1290 : 30
    thing.reset(x, 680, 0, otherSide ? -1 : 1)
  }

  spawnUnit(otherSide) {
    this.spawn('units', otherSide)
  }

  spawnArcher(otherSide) {
    this.spawn('archers', otherSide)
  }
}
