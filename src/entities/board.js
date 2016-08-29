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

    this.bg = game.add.group()
    this.tiles = game.add.group()
    this.tiles.classType = Tile
    this.overlays = game.add.group()
    this.overlays.classType = Overlay
    this.highlights = game.add.group()
    this.highlights.classType = Highlight

    this.swapSound = game.add.audio('swap')
    this.submitSound = game.add.audio('submit')
    this.submitFailedSound = game.add.audio('submit_failed')
    const style = { boundsAlignH: "center", boundsAlignV: "center", font: '18pt Arial', fill: '#ffffff' }
    this.spawnText1 = game.add.text(20, 430, '', style)
    this.spawnText1.setTextBounds(0, 10, 150, 50)
    this.spawnText2 = game.add.text(180, 430, '', style)
    this.spawnText2.setTextBounds(0, 10, 150, 50)
    this.spawnText3 = game.add.text(350, 430, '', style)
    this.spawnText3.setTextBounds(0, 10, 150, 50)

    let [bgX, bgY] = getBoardPosition(_x, _y)
    this.bg.create(bgX - 25, bgY - 20, 'tilebg')
    for (let x = _x; x < NUM_COLUMNS+_x; x++) {
      for (let y = _y; y < NUM_ROWS+_y; y++) {
        let tile = this.tiles.create(x, y, 'tiles')
        tile.bringToTop()
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
    this.spawnText1.text = ''
    this.spawnText2.text = ''
    this.spawnText3.text = ''
    let spawns = matches.forEach(match => {
      let spawn = match.spawn
      if (match.type.shape[0] === 0) {
        this.spawnText1.text = spawn
      }
      if (match.type.shape[0] === 2) {
        this.spawnText2.text = spawn
      }
      if (match.type.shape[0] === 4) {
        this.spawnText3.text = spawn
      }
    })
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
      if (match.spawn) {
        this.game.spawner.spawn(match.spawn+'s')
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
      let spawn
      MATCH_TYPES.forEach((base, ind) => {
        if (base.length !== frames.length) {
          return false
        }

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (i !== j) {
              let shapeVariation = base.map(index => index === 0 ? i : j)
              if (arraysEqual(shapeVariation, frames)) {
                const index = Math.floor(ind/3)
                const spawnIndex = frames[0] === 2 ? 1 : frames[0] === 3 ? 0 : frames[0]
                spawn = UNIT_TYPES[index * 4 + spawnIndex ]
                type = { index, base, shape }
              }
            }
          }
        }
      })
      return type ? { tiles, type, spawn } : null
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
