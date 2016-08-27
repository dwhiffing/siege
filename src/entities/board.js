const OFFSET_X = 20
const OFFSET_Y = 20
const TILE_DIMENSIONS = 50
const TILE_SPACING = 5
const TILE_SIZE = TILE_DIMENSIONS + TILE_SPACING

export default class Board {
  constructor(game) {
    this.game = game

    this.cols = 6
    this.rows = 5
    this.tiles = game.add.group()

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let tile = this.tiles.create(...this.getTilePos(x, y), 'tiles')
        this.randomizeColor(tile)
        this.setPos(tile, x, y)
      }
    }

  }

  getTilePos(x, y) {
    return [
      x * TILE_SIZE + OFFSET_X,
      y * TILE_SIZE + OFFSET_Y,
    ]
  }

  randomizeColor(tile) {
    tile.frame = this.game.rnd.integerInRange(0, tile.animations.frameTotal - 1)
  }

  update() {

  }

  getTile(x, y) {
    return this.tiles.iterate("id", this.getId(x, y), Phaser.Group.RETURN_CHILD)
  }

  getPos(pos) {
    return Math.floor(pos / TILE_SIZE)
  }

  setPos(tile, x, y) {
    tile.posX = x
    tile.posY = y
    tile.id = this.getId(x, y)
  }

  getId(x, y) {
    return x + y * this.cols
  }

  swap(x1, y1, x2, y2) {
    const tile1 = this.getTile(x1, y1)
    const tile2 = this.getTile(x2, y2)
    const { posX: tempPosX, posY: tempPosY, x: tempX, y: tempY } = tile1
    this.setPos(tile1, tile2.posX, tile2.posY)
    tile1.x = tile2.x
    tile1.y = tile2.y
    this.setPos(tile2, tempPosX, tempPosY)
    tile2.x = tempX
    tile2.y = tempY
  }
}
