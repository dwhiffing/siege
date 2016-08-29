export default {
  create(game) {
    //  This sets a limit on the up-scale
    this.game.scale.maxWidth = 900;
    this.game.scale.maxHeight = 560;

    //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.game.scale.setScreenSize();
    this.game.stage.smoothed = false
    this.game.state.start('load', true, false)
  }
}
