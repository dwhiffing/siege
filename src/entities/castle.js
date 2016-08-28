import Phaser from 'phaser'

export default class Castle {
  constructor(game, x, y, name) {
    this.sprite = game.add.sprite(x, y, 'castle')
    this.sprite.health = 100
    this.game = game
    this.name = name
    this.healthText = game.add.text(this.name === '1' ? x+100 : x, y, '100')
  }

  damage(amount) {
    this.sprite.damage(amount)
    if (this.sprite.health <= 0) {
      setTimeout(() => {
        this.game.state.start('over', true, false, { loser: this.name })
      }, 2000)
    }
    this.healthText.text = this.sprite.health
  }
}
