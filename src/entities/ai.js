
// ai should think about what to make next, and depending on difficulty
// take an appropriate amount of time to create that unit
// rinse and repeat
// smart ai looks at what is on the field before making units
// easy just makes basic stuff
// medium ai just makes random stuff

const MIN_BUILD_TIME = 100
const MAX_BUILD_TIME = 300
const units = [
  ['soldiers', 'knights', 'elephants'],
  ['slings', 'archers', 'catapults'],
]

export default class ArtificialIntelligence {
  constructor(game) {
    this.spawner = game.spawner
    this.game = game
    this.setTimer()
  }

  setTimer() {
    this.spawnTimer = this.game.rnd.integerInRange(MIN_BUILD_TIME, MAX_BUILD_TIME)
  }

  update() {
    this.spawnTimer--
    if (this.spawnTimer <= 0) {
      this.setTimer()
      this.spawnUnit()
    }
  }

  spawnUnit() {
    this.spawner.spawn(this.chooseUnit(), true)
  }

  chooseUnit() {
    let diceRoll = this.game.rnd.integerInRange(0, 100)
    let size = 0
    if (diceRoll > 30) {
      size = 1
    }
    if (diceRoll > 60) {
      size = 2
    }
    let type = this.game.rnd.integerInRange(0, 1)

    return units[type][size]
  }
}
