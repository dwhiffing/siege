export default class Cursor {
  constructor(game) {
    this.game = game
    this.x = 0
    this.y = 0
    this.selected = null
    this.sprite = game.add.sprite(20, 20, 'cursor')
    this.mark = game.add.sprite(20, 20, 'cursor')
    this.mark.tint = 0x00ffff
    this.mark.alpha = 0
  }

  update() {

  }

  updatePosition(thing, x=thing.x, y=thing.y) {
    const [X, Y] = this.game.board.getTileWorldPosition(x, y)
    thing.x = X
    thing.y = Y
  }

  move(axis, direction) {
    this[axis] += direction
    if (this.checkOutOfBounds(this.x, this.y)) {
      this[axis] -= direction
    } else {
      this.updatePosition(this.sprite, this.x, this.y)
    }
  }

  checkOutOfBounds(x, y) {
    const { cols, rows } = this.game.board
    return x < 0 || x >= cols || y < 0 || y >= rows
  }

  deselect(x, y) {
    this.updatePosition(this.mark, -1, -1)
    this.selected = null
    this.mark.alpha = 0
  }

  select(x, y) {
    if (!this.checkOutOfBounds(x, y)) {
      this.updatePosition(this.mark, this.x, this.y)
      this.selected = { x: this.x, y: this.y }
      this.mark.alpha = 1
    }
  }
}
