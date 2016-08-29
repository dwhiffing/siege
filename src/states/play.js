import Board from '../entities/board'
import Input from '../entities/input'
import AI from '../entities/ai'
import BlastManager from '../entities/blastManager'
import Castle from '../entities/castle'
import Spawner from '../entities/spawner'
import Cursor from '../sprites/cursor'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#113344'
    game.sky = game.add.sprite(0, 0, 'sky')
    game.ground = game.add.sprite(0, 680, 'ground')
    game.physics.arcade.enable(game.ground)
    game.board = new Board(game)
    // game.board2 = new Board(game, 10, 0)
    game.cursor = new Cursor(game)
    game.inputManager = new Input(game)
    game.spawner = new Spawner(game)
    game.castle = new Castle(game, -100, 530, '1')
    game.castle2 = new Castle(game, 1280, 530, '2')
    game.blasts = new BlastManager(game)
    game.ai = new AI(game)
    game.board.checkForMatches()
  },

  update() {
    this.game.inputManager.update()
    this.game.spawner.update()
    this.game.ai.update()
  },

  render() {
    this.game.spawner.render()
  }
}
