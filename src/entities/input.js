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
      n: Phaser.KeyCode.N,
      m: Phaser.KeyCode.M,
      j: Phaser.KeyCode.J,
      h: Phaser.KeyCode.H,
      y: Phaser.KeyCode.Y,
      u: Phaser.KeyCode.U,
      i: Phaser.KeyCode.I,
      o: Phaser.KeyCode.O,
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
      board.checkForMatches()
    }

    if (this._justPressed('n')) {
      castle.spawnSoldier()
    }

    if (this._justPressed('m')) {
      castle.spawnSoldier(true)
    }

    if (this._justPressed('h')) {
      castle.spawnArcher()
    }

    if (this._justPressed('j')) {
      castle.spawnArcher(true)
    }

    if (this._justPressed('y')) {
      castle.spawnCatapult()
    }

    if (this._justPressed('u')) {
      castle.spawnCatapult(true)
    }

    if (this._justPressed('i')) {
      castle.spawnSling()
    }

    if (this._justPressed('o')) {
      castle.spawnSling(true)
    }
  }

  _justPressed(key) {
    return this.keys[key].downDuration(1)
  }
}
