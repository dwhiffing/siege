import { getBoardPosition } from '../utils'
import { NUM_ROWS, NUM_COLUMNS } from '../constants'

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

  moveTo(target, x=target.x, y=target.y) {
    const [X, Y] = getBoardPosition(x, y)
    target.x = X
    target.y = Y
  }

  move(axis, direction) {
    this[axis] += direction
    if (this.checkOutOfBounds(this.x, this.y)) {
      this[axis] -= direction
    } else {
      this.moveTo(this.sprite, this.x, this.y)
    }
  }

  checkOutOfBounds(x, y) {
    return x < 0 || x >= NUM_COLUMNS || y < 0 || y >= NUM_ROWS
  }

  deselect(x, y) {
    this.moveTo(this.mark, -1, -1)
    this.selected = null
    this.mark.alpha = 0
  }

  select(x, y) {
    if (!this.checkOutOfBounds(x, y)) {
      this.moveTo(this.mark, this.x, this.y)
      this.selected = { x: this.x, y: this.y }
      this.mark.alpha = 1
    }
  }
}
