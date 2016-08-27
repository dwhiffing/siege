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
    if (this.keys.up.downDuration(1)) {
      this.game.cursor.move('y', -1)
    } else if (this.keys.down.downDuration(1)) {
      this.game.cursor.move('y', 1)
    }
    if (this.keys.left.downDuration(1)) {
      this.game.cursor.move('x', -1)
    } else if (this.keys.right.downDuration(1)) {
      this.game.cursor.move('x', 1)
    }
    if (this.keys.space.downDuration(1)) {
      if (this.game.cursor.selected) {
        const { x: x1, y: y1 } = this.game.cursor.selected
        const { x: x2, y: y2 } = this.game.cursor
        this.game.board.swap(x1, y1, x2, y2)
        this.game.cursor.deselect()
      } else {
        this.game.cursor.select()
      }
    }
    if (this.keys.x.downDuration(1)) {
      this.game.board.checkForMatches()
    }
  }
}
