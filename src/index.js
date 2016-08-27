import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/boot'
import LoadState from './states/load'
import MenuState from './states/menu'
import PlayState from './states/play'

let game = new Phaser.Game(1080, 720, Phaser.CANVAS, 'app')

game.state.add('boot', BootState)
game.state.add('load', LoadState)
game.state.add('menu', MenuState)
game.state.add('play', PlayState)
game.state.start('boot')
