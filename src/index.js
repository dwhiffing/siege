import 'phaser'
import GameScalePlugin from 'phaser-plugin-game-scale'
import BootScene from './scenes/Boot'
import MenuScene from './scenes/Menu'
import GameScene from './scenes/Game'
import GameOverScene from './scenes/GameOver'
import CreditsScene from './scenes/Credits'

const width = 1334 || ocument.documentElement.clientWidth
const height = 750 || document.documentElement.clientHeight

const game = new Phaser.Game({
  width,
  height,
  transparent: true,
  pixelArt: true,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  scene: [BootScene, MenuScene, GameScene, GameOverScene, CreditsScene],
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
})

export default game
