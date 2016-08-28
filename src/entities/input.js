const spawns = {
  melee: {
    one: 'soldiers', two: 'knights', three: 'elephants',
  },
  ranged: {
    one: 'slings', two: 'archers', three: 'catapults',
  },
}

export default class InputManager {
  constructor(game) {
    this.game = game
    this.keys = game.input.keyboard.addKeys({
      up: Phaser.KeyCode.UP,
      down: Phaser.KeyCode.DOWN,
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      space: Phaser.KeyCode.SPACEBAR,
      z: Phaser.KeyCode.Z,

      u: Phaser.KeyCode.U,
      i: Phaser.KeyCode.I,
      o: Phaser.KeyCode.O,
      p: Phaser.KeyCode.P,

      shift: Phaser.KeyCode.SHIFT,
      one: Phaser.KeyCode.ONE,
      two: Phaser.KeyCode.TWO,
      three: Phaser.KeyCode.THREE,
    })
  }

  update() {
    const { cursor, board, castle } = this.game

    if (this._justPressed('up')) {
      cursor.move('y', -1)
    } else if (this._justPressed('down')) {
      cursor.move('y', 1)
    }

    if (this._justPressed('left')) {
      cursor.move('x', -1)
    } else if (this._justPressed('right')) {
      cursor.move('x', 1)
    }

    if (board.isSwapping) {
      return
    }

    if (this._justPressed('space')) {
      if (cursor.selected) {
        board.swap(cursor.selected, cursor)
        cursor.deselect()
      } else {
        cursor.select()
      }
    }

    if (this._justPressed('z')) {
      board.submitMatches()
    }

    if (this._justPressed('u')) {
      let spawn = this._spawnThing(spawns.melee)
      castle.spawn(spawn, this.keys['shift'].isDown)
    }

    if (this._justPressed('i')) {
      let spawn = this._spawnThing(spawns.ranged)
      castle.spawn(spawn, this.keys['shift'].isDown)
    }
  }

  _spawnThing(spawns) {
    if (this.keys['two'].isDown) {
      return spawns.two
    } else if (this.keys['three'].isDown) {
      return spawns.three
    } else {
      return spawns.one
    }
  }

  _justPressed(key) {
    return this.keys[key].downDuration(1)
  }
}
