import Tile from './tile'
import { arraysEqual, getBoardPosition, getBoardId } from '../utils'
import {
  TWEEN_DURATION,
  NUM_COLUMNS,
  NUM_ROWS,
  MATCH_TYPES,
  TILE_SHAPES,
} from '../constants'

export default class Board {
  constructor(game, _x=0, _y=0) {
    this.game = game
    this.tiles = game.add.group()
    this.tiles.classType = Tile

    for (let x = _x; x < NUM_COLUMNS+_x; x++) {
      for (let y = _y; y < NUM_ROWS+_y; y++) {
        let tile = this.tiles.create(x, y, 'tiles')
      }
    }
  }

  swap({x: x1, y: y1}, { x: x2, y: y2}) {
    this._preventSwappingForDuration()
    const tile1 = this._getTile(x1, y1)
    const tile2 = this._getTile(x2, y2)
    const { posX: tX, posY: tY } = tile1
    tile1.tweenTo(tile2.posX, tile2.posY)
    tile2.tweenTo(tX, tY)
  }

  checkForMatches() {
    let matches = this._getMatches()
    matches.forEach(tiles => {
      this.game.spawner.spawn(tiles[0].frame)
      tiles.forEach((tile) => tile.kill())
    })

    this._preventSwappingForDuration()
    this.applyGravity()
    this.refill()
  }

  applyGravity() {
    this._forEachTileByColumn((x, y, tile, tilesMissing) => {
      if (tile && tilesMissing > 0) {
        tile.tweenTo(tile.posX, tile.posY + tilesMissing)
      }
    })
  }

  refill() {
    this._forEachTileByColumn((x, y, tile, tilesMissing) => {
      if (tile === null) {
        tile = this.tiles.getFirstDead()
        tile.reset(x, -tilesMissing)
        tile.tweenTo(x, y)
      }
    })
  }

  _getTile(x, y) {
    return this._getTileById(getBoardId(x, y))
  }

  _getTileById(id) {
    return this.tiles.iterate("id", id, Phaser.Group.RETURN_CHILD)
  }

  _preventSwappingForDuration(duration=TWEEN_DURATION) {
    this.isSwapping = true
    this.game.time.events.add(duration, () => this.isSwapping = false)
  }

  _forEachTileByColumn(method) {
    for (let x = 0; x < NUM_COLUMNS; x++) {
      let tilesMissing = 0
      for (let y = NUM_ROWS - 1; y >= 0; y--) {
        let tile = this._getTile(x, y)
        tilesMissing += tile === null ? 1 : 0
        method(x, y, tile, tilesMissing)
      }
    }
  }

  _getMatches() {
    return TILE_SHAPES.map(shape => {
      const tiles = this._getRectOfTiles(...shape)
      const hasMatch = MATCH_TYPES.filter(type => arraysEqual(type, tiles.map(t => t.frame))).length > 0
      return hasMatch ? tiles : null
    }).filter(n => !!n)
  }

  _getRectOfTiles(x, size) {
    let secondLastRow = NUM_COLUMNS * (NUM_ROWS - 2)
    let tiles = []
    for (let y = secondLastRow + x; y < NUM_COLUMNS * NUM_ROWS; y += NUM_COLUMNS) {
      for (let x = 0; x < size; x++) {
        tiles.push(this._getTileById(x + y))
      }
    }
    return tiles
  }
}
