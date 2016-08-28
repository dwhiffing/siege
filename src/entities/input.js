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

      e: Phaser.KeyCode.E,
      r: Phaser.KeyCode.R,
      d: Phaser.KeyCode.D,
      f: Phaser.KeyCode.F,
      c: Phaser.KeyCode.C,
      v: Phaser.KeyCode.V,

      t: Phaser.KeyCode.T,
      y: Phaser.KeyCode.Y,
      g: Phaser.KeyCode.G,
      h: Phaser.KeyCode.H,
      b: Phaser.KeyCode.B,
      n: Phaser.KeyCode.N,
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

    if (this._justPressed('e')) {
      castle.spawnSoldier()
    }

    if (this._justPressed('r')) {
      castle.spawnSoldier(true)
    }

    if (this._justPressed('d')) {
      castle.spawnKnight()
    }

    if (this._justPressed('f')) {
      castle.spawnKnight(true)
    }

    if (this._justPressed('c')) {
      castle.spawnElephant()
    }

    if (this._justPressed('v')) {
      castle.spawnElephant(true)
    }

    if (this._justPressed('t')) {
      castle.spawnSling()
    }

    if (this._justPressed('y')) {
      castle.spawnSling(true)
    }

    if (this._justPressed('g')) {
      castle.spawnArcher()
    }

    if (this._justPressed('h')) {
      castle.spawnArcher(true)
    }

    if (this._justPressed('b')) {
      castle.spawnCatapult()
    }

    if (this._justPressed('n')) {
      castle.spawnCatapult(true)
    }
  }

  _justPressed(key) {
    return this.keys[key].downDuration(1)
  }
}
