export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }

  create() {
    const {
      clientHeight: height,
      clientWidth: width,
    } = document.documentElement

    this.play = this.add
      .image(width / 2, height / 2 + height / 3, 'play')
      .setInteractive()
    this.play.setScale(this.game.scaleFactor * 0.7)
    this.play.on('pointerdown', () => {
      this.scene.start('Game')
    })
  }
}
