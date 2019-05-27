"use strict";

var GameOver = function(game) {};

GameOver.prototype = {
  init: function() {

  },
  preload: function() {
    game.add.sprite(0, 0, "dead");
  },
  create: function() {
    // set up game over screen
  },
  update: function() {
    // wait for player input top return to main menu?
    // have second menu in game over screen?
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      game.state.start("MainMenu");
    }
  }
}
