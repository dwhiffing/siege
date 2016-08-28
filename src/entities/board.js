import Tile from '../sprites/tile'
import Overlay from '../sprites/overlay'
import Highlight from '../sprites/highlight'
import { arraysEqual, getBoardPosition, getBoardId } from '../utils'
import {
  TWEEN_DURATION,
  NUM_COLUMNS,
  NUM_ROWS,
  MATCH_TYPES,
  TILE_SHAPES,
  UNIT_TYPES,
} from '../constants'

export default class Board {
  constructor(game, _x=0, _y=0) {
    this.game = game
    this.tiles = game.add.group()
    this.tiles.classType = Tile
    this.overlays = game.add.group()
    this.overlays.classType = Overlay
    this.highlights = game.add.group()
    this.highlights.classType = Highlight

    this.swapSound = game.add.audio('swap')
    this.submitSound = game.add.audio('submit')
    this.submitFailedSound = game.add.audio('submit_failed')

    for (let x = _x; x < NUM_COLUMNS+_x; x++) {
      for (let y = _y; y < NUM_ROWS+_y; y++) {
        let tile = this.tiles.create(x, y, 'tiles')
        if (y >= NUM_ROWS-2) {
          let overlay = this.overlays.create(x, y, 'overlay')
        }
        if (y === NUM_ROWS-2 && x % 2 === 0) {
          let highlight = this.highlights.create(x, y, 'highlight')
        }
      }
    }
  }

  swap({x: x1, y: y1}, { x: x2, y: y2}) {
    if (x1 === x2 && y1 === y2) {
      return
    }
    this.swapSound.play()
    this._preventSwappingForDuration(this.checkForMatches.bind(this))
    const tile1 = this._getTile(x1, y1)
    const tile2 = this._getTile(x2, y2)
    const { posX: tX, posY: tY } = tile1
    tile1.tweenTo(tile2.posX, tile2.posY)
    tile2.tweenTo(tX, tY)
  }

  checkForMatches() {
    let matches = this._getMatches()
    this.applyHighlights(matches)
  }

  submitMatches() {
    let matches = this._getMatches()
    if (matches.length > 0) {
      this.submitSound.play()
    } else {
      this.submitFailedSound.play()
    }
    matches.forEach(match => {
      const tileType = match.tiles[0].frame
      const matchType = match.type.index
      if (tileType < 2) {
        const unit = UNIT_TYPES[matchType * 4 + tileType]
        this.game.castle.spawn(unit+'s')
      }
      match.tiles.forEach((tile) => tile.kill())
    })

    this.clearHighlights()
    this._preventSwappingForDuration(this.checkForMatches.bind(this))
    this.applyGravity()
    this.refill()
  }

  clearHighlights(matches) {
    this.overlays.callAll('hide')
    this.highlights.callAll('hide')
  }

  applyHighlights(matches) {
    this.clearHighlights()
    matches.forEach((match) => {
      let [pos, size] = match.type.shape
      let indexes = [2, 4, 6]
      let highlight = this.highlights.children[Math.floor(pos/2)]
      highlight.show()
      highlight.frame = indexes.indexOf(size)
      match.tiles.forEach((tile, index) => {
        let overlay = this._getTileById(tile.id, 'overlays')
        if (!match.type.base[index]) {
          overlay.show()
        }
      })
    })
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

  _getTileById(id, thing='tiles') {
    return this[thing].iterate("id", id, Phaser.Group.RETURN_CHILD)
  }

  _preventSwappingForDuration(callback) {
    this.isSwapping = true
    this.game.time.events.add(TWEEN_DURATION, () => {
      this.isSwapping = false
      callback && callback()
    })
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
      const frames = tiles.map(t => t.frame)
      let type
      MATCH_TYPES.forEach((base, index) => {
        if (base.length !== frames.length) {
          return false
        }

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (i !== j) {
              let shapeVariation = base.map(index => index === 0 ? i : j)
              if (arraysEqual(shapeVariation, frames)) {
                type = { index: Math.floor(index/3), base, shape }
              }
            }
          }
        }
      })
      return type ? { tiles, type } : null
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
