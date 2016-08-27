const OFFSET_X = 20
const OFFSET_Y = 20
const TILE_DIMENSIONS = 50
const TILE_SPACING = 5
const TILE_SIZE = TILE_DIMENSIONS + TILE_SPACING
const MATCH_TYPES = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [2, 2, 2, 2],
  [3, 3, 3, 3],
]

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

  tweenPos(tile, x, y) {
    return this.game.add.tween(tile).to({ x, y, }, 300, Phaser.Easing.Quadratic.In, true)
  }

  getId(x, y) {
    return x + y * this.cols
  }

  getRectOfTiles(x, size) {
    let posX = this.cols * (this.rows - 2) + x
    let tiles = []
    for (let i = posX; i < this.cols * this.rows; i += this.cols) {
      for (let j = 0; j < size; j++) {
        let tile = this.tiles.iterate("id", i+j, Phaser.Group.RETURN_CHILD)
        tiles.push(tile)
      }
    }
    return tiles
  }

  checkForMatches() {
    let tileGroups = [this.getRectOfTiles(0, 2), this.getRectOfTiles(2, 2), this.getRectOfTiles(4, 2)]

    tileGroups.forEach(tiles => {
      let types = tiles.map(t => t.frame)
      let matches = MATCH_TYPES.filter(type => this.arraysEqual(type, types))
      if (matches.length > 0) {
        this.game.spawner.spawn(types[0])

        tiles.forEach((tile) => {
          tile.kill()
          this.setPos(tile, -1,-1)
        })
      }
    })

    this.applyGravity()
    this.refill()
  }

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false
    }

    for (let i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }

    return true
  }

  swap(x1, y1, x2, y2) {
    const tile1 = this.getTile(x1, y1)
    const tile2 = this.getTile(x2, y2)
    const { posX: tempPosX, posY: tempPosY, x: tempX, y: tempY } = tile1
    this.setPos(tile1, tile2.posX, tile2.posY)
    this.tweenPos(tile1, tile2.x, tile2.y)
    this.setPos(tile2, tempPosX, tempPosY)
    this.tweenPos(tile2, tempX, tempY)
  }

  applyGravity() {
    this.game.inputManager.allowInput = false
    for (let x = 0; x < this.cols; x++) {
      let dropAmount = 0
      for (let y = this.rows - 1; y >= 0; y--) {
        let tile = this.getTile(x, y)
        if (tile === null) {
          dropAmount++
        } else if (dropAmount > 0) {
          this.setPos(tile, tile.posX, tile.posY + dropAmount)
          this.tweenPos(tile, ...this.getTilePos(tile.posX, tile.posY))
        }
      }
    }
  }

  refill() {
    let missingCount = 0
    for (let i = 0; i < this.cols; i++) {
      let localMissingCount = 0
      for (let j = this.rows - 1; j >= 0; j--) {
        let tile = this.getTile(i, j)
        if (!tile) {
          localMissingCount++
          tile = this.tiles.getFirstDead()
          tile.reset(...this.getTilePos(i, -localMissingCount))
          this.randomizeColor(tile)
          this.setPos(tile, i, j)
          this.tweenPos(tile, ...this.getTilePos(i, j))
        }
      }
      missingCount = Math.max(missingCount, localMissingCount)
    }
    this.game.time.events.add(missingCount * 2 * 100, () => this.game.inputManager.allowInput = true)
  }
}
