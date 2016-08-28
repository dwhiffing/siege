import Board from '../entities/board'
import Input from '../entities/input'
import BlastManager from '../entities/blastManager'
import Castle from '../entities/castle'
import Cursor from '../sprites/cursor'
import Ground from '../sprites/ground'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#113344'
    this.game.board = new Board(game)
    this.game.board2 = new Board(game, 10, 0)
    this.game.cursor = new Cursor(game)
    this.game.inputManager = new Input(game)
    this.game.ground = new Ground(game, 0, 680)
    this.game.castle = new Castle(game, -100, 530, '1')
    this.game.castle2 = new Castle(game, 1280, 530, '2')
    this.game.blasts = new BlastManager(game)
  },

  update() {
    this.game.inputManager.update()
    this.game.castle.update()
  },

  render() {
    this.game.castle.render()
  }
}
