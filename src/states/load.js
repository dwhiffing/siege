export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.spritesheet('tiles', 'assets/images/tiles.png', 75, 75)
    this.load.spritesheet('units', 'assets/images/units.png', 15, 30)
    this.load.spritesheet('soldier', 'assets/images/soldier.png', 8, 15)
    this.load.spritesheet('archer', 'assets/images/archer.png', 11, 13)
    this.load.spritesheet('explosion', 'assets/images/explosion.png', 128, 128)
    this.load.spritesheet('catapult', 'assets/images/catapult.png', 22, 13)
    this.load.image('cursor', 'assets/images/cursor.png')
    this.load.image('castle', 'assets/images/castle.png')
    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.image('ground', 'assets/images/ground.png')
  },

  onLoadComplete() {
    this.game.state.start('play')
  }
}
