let loser
export default {
  init(args={}) {
    loser = args.loser || 1
  },

  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'
    this.titleText = game.add.text(this.game.world.centerX, this.game.world.centerY-50, `PLAYER ${loser} LOSES!`, { font: "bold 42px Arial", fill: "#fff" })
    this.titleText.anchor.setTo(0.5)

    game.input.onDown.add(() => {
      game.state.start('play', true, false)
    })
  },
}
