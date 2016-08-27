import Board from '../entities/board'
import Cursor from '../entities/cursor'
import Input from '../entities/input'
import Spawner from '../entities/spawner'
import Castle from '../entities/castle'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#113344'
    this.game.board = new Board(game)
    this.game.board2 = new Board(game, 13, 0)
    this.game.cursor = new Cursor(game)
    this.game.inputManager = new Input(game)
    this.game.spawner = new Spawner(game)
    this.game.castle = new Castle(game, -50, 380, '1')
    this.game.castle2 = new Castle(game, 920, 380, '2')
  },

  update() {
    this.game.inputManager.update()
    this.game.spawner.update()
  },

  render() {
    this.game.spawner.render()
  }
}
