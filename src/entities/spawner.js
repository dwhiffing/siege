import Soldier from '../units/soldier'
import Knight from '../units/knight'
import Elephant from '../units/elephant'
import Archer from '../units/archer'
import Catapult from '../units/catapult'
import Sling from '../units/sling'

export default class Spawner {
  constructor(game) {
    this.game = game
    this.xSpawnOffset = 0
    this.soldiers = game.add.group(undefined, 'soldiers', false, true)
    this.soldiers.classType = Soldier
    this.soldiers.createMultiple(100, 'soldier')

    this.knights = game.add.group(undefined, 'knights', false, true)
    this.knights.classType = Knight
    this.knights.createMultiple(50, 'soldier')

    this.elephants = game.add.group(undefined, 'elephants', false, true)
    this.elephants.classType = Elephant
    this.elephants.createMultiple(50, 'soldier')

    this.archers = game.add.group(undefined, 'archers')
    this.archers.classType = Archer
    this.archers.createMultiple(50, 'archer')

    this.slings = game.add.group(undefined, 'slings')
    this.slings.classType = Sling
    this.slings.createMultiple(50, 'archer')

    this.catapults = game.add.group(undefined, 'catapults')
    this.catapults.classType = Catapult
    this.catapults.createMultiple(50, 'catapult')

    this.submitSound = this.game.add.audio('swap2')
  }

  update() {
    const overlap = (one, two) => { one.overlap(two); two.overlap(one) }
    this.soldiers.callAll('update')
    this.game.physics.arcade.overlap(this.soldiers, this.knights, overlap, null, this)
    this.game.physics.arcade.overlap(this.soldiers, this.elephants, overlap, null, this)
    this.game.physics.arcade.overlap(this.soldiers, this.soldiers, overlap, null, this)
    this.game.physics.arcade.overlap(this.knights, this.soliders, overlap, null, this)
    this.game.physics.arcade.overlap(this.knights, this.elephants, overlap, null, this)
    this.game.physics.arcade.overlap(this.knights, this.knights, overlap, null, this)
    this.game.physics.arcade.overlap(this.elephants, this.soliders, overlap, null, this)
    this.game.physics.arcade.overlap(this.elephants, this.knights, overlap, null, this)
    this.game.physics.arcade.overlap(this.elephants, this.elephants, overlap, null, this)
  }

  getTargets() {
    return [
      ...this.soldiers.children.filter(c => c.alive),
      ...this.knights.children.filter(c => c.alive),
      ...this.elephants.children.filter(c => c.alive),
    ]
  }

  render() {
    this.soldiers.callAll('render')
    this.elephants.callAll('render')
    this.knights.callAll('render')
  }

  spawn(type, otherSide) {
    this.xSpawnOffset = (this.xSpawnOffset + 1) % 3
    this.submitSound.play()
    let group = this[type]
    if (group) {
      let thing = group.getFirstDead()
      if (!thing) return
      let amount = group.getFirstDead().amount || 1
      for (let i = 0; i < amount; i++) {
        let thing = group.getFirstDead()
        if (!thing) return
        const offset = thing.unitWidth * this.xSpawnOffset
        const dir = otherSide ? -1 : 1
        let x = otherSide ? 1260 : 70
        if (/archer|sling|catapult/.test(type)) {
          x += (offset * dir)
        }
        thing.reset(x, 680, dir)
      }
    } else {
      console.warn(`tried to spawn ${type}, which doesnt exist`)
    }
  }
}
