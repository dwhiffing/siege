export default {
  create(game) {
    this.game.stage.smoothed = false
    this.game.state.start('load', true, false)
  }
}
