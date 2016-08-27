import UserInterface from '../entities/ui'
import Board from '../entities/board'
import Cursor from '../entities/cursor'
import Input from '../entities/input'
import Spawner from '../entities/spawner'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'
    this.game.ui = new UserInterface(game)
    this.game.board = new Board(game)
    this.game.cursor = new Cursor(game)
    this.game.inputManager = new Input(game)
    this.game.spawner = new Spawner(game)
  },

  update(game) {
    this.game.inputManager.update()
    this.game.ui.update()
    this.game.spawner.update()
  },
}
