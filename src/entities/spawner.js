export default class Spawner {
  constructor(game) {
    this.game = game
    this.units = game.add.group()

    for (let x = 0; x < 40; x++) {
      let unit = this.units.create(0, 0, 'tiles')
      unit.width = 15
      unit.height = 30
      unit.kill()
      this.randomizeColor(unit)
    }
  }

  update() {
    this.units.children.forEach((unit) => {
      if (unit.alive) {
        unit.x += 2
        if (unit.x > 800) {
          unit.kill()
        }
      }
    })
  }

  spawn() {
    let unit = this.units.getFirstDead()
    unit.reset(-10, 360)
  }

  randomizeColor(tile) {
    tile.frame = this.game.rnd.integerInRange(0, tile.animations.frameTotal - 1)
  }
}
