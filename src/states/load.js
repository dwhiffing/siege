export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.spritesheet('tiles', 'assets/images/tiles.png', 50, 50);
    this.load.image('cursor', 'assets/images/cursor.png', 50, 50);
  },

  onLoadComplete() {
    this.game.state.start('menu')
  }
}
