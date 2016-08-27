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
      x: Phaser.KeyCode.X,
    })
  }

  update() {
    const { cursor, board, spawner } = this.game

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
      spawner.spawn(1)
    }

    if (this._justPressed('x')) {
      spawner.spawn(1, true)
    }
  }

  _justPressed(key) {
    return this.keys[key].downDuration(1)
  }
}
