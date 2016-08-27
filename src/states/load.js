export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.spritesheet('tiles', 'assets/images/tiles.png', 50, 50);
    this.load.spritesheet('units', 'assets/images/units.png', 25, 50);
    this.load.image('cursor', 'assets/images/cursor.png');
    this.load.image('castle', 'assets/images/castle.png');
  },

  onLoadComplete() {
    this.game.state.start('play')
  }
}
