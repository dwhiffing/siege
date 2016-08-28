import Phaser from 'phaser'
import { getBoardPosition, getBoardId } from '../utils'

export default class Overlay extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'overlay')
    this.game = game
    this.alpha = 0
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
    this.id = getBoardId(x, y)
    this.x = worldX
    this.y = worldY
  }
}
