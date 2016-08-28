import Phaser from 'phaser'
import { getBoardPosition, getBoardId } from '../utils'

export default class Highlight extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'highlight')
    this.game = game
    this.alpha = 0
    this.frame = 1
    this.updateBoardPosition(x, y)
  }

  show() {
    this.alpha = 1
  }

  hide() {
    this.alpha = 0
  }

  updateBoardPosition(x, y) {
    const [worldX, worldY] = getBoardPosition(x, y)
    this.x = worldX - 10
    this.y = worldY - 10
  }
}
