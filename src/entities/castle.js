import Unit from '../sprites/unit'
import Archer from '../sprites/archer'

export default class Castle {
  constructor(game, x, y, name) {
    this.game = game

    this.units = game.add.group(undefined, 'units', false, true)
    this.units.classType = Unit
    this.units.createMultiple(30, 'soldier')

    this.archers = game.add.group(undefined, 'units', false, true)
    this.archers.classType = Archer
    this.archers.createMultiple(30, 'archer')

    this.sprite = game.add.sprite(x, y, 'castle')
    this.sprite.health = 100
    this.name = name

    this.healthText = game.add.text(this.name === '1' ? x+100 : x, y, '100')
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

  damage(amount) {
    this.sprite.damage(amount)
    if (this.sprite.health <= 0) {
      setTimeout(() => {
        this.game.state.start('over', true, false, { loser: this.name })
      }, 2000)
    }
    this.healthText.text = this.sprite.health
  }
}
