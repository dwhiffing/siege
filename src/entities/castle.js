import Soldier from '../sprites/soldier'
import Archer from '../sprites/archer'
import Catapult from '../sprites/catapult'
import Sling from '../sprites/sling'

export default class Castle {
  constructor(game, x, y, name) {
    this.game = game

    this.soldiers = game.add.group(undefined, 'soldiers', false, true)
    this.soldiers.classType = Soldier
    this.soldiers.createMultiple(30, 'soldier')

    this.archers = game.add.group(undefined, 'archers', false, true)
    this.archers.classType = Archer
    this.archers.createMultiple(30, 'archer')

    this.slings = game.add.group(undefined, 'slings', false, true)
    this.slings.classType = Sling
    this.slings.createMultiple(30, 'archer')

    this.catapults = game.add.group(undefined, 'catapults', false, true)
    this.catapults.classType = Catapult
    this.catapults.createMultiple(30, 'catapult')

    this.sprite = game.add.sprite(x, y, 'castle')
    this.sprite.health = 100
    this.name = name

    this.healthText = game.add.text(this.name === '1' ? x+100 : x, y, '100')
  }

  update() {
    this.soldiers.callAll('update')
    this.game.physics.arcade.overlap(
      this.soldiers, this.soldiers,
      (one, two) => {
        one.overlap(two)
        two.overlap(one)
      }, null, this
    )
  }

  render() {
    this.soldiers.callAll('render')
  }

  spawn(type, otherSide) {
    let thing = this[type].getFirstDead()
    const x = otherSide ? 1290 : 30
    thing.reset(x, 680, otherSide ? -1 : 1)
  }

  spawnCatapult(otherSide) {
    this.spawn('catapults', otherSide)
  }

  spawnSoldier(otherSide) {
    this.spawn('soldiers', otherSide)
  }

  spawnArcher(otherSide) {
    this.spawn('archers', otherSide)
  }

  spawnSling(otherSide) {
    this.spawn('slings', otherSide)
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
