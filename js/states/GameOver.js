"use strict";

var deathSFX;

var GameOver = function(game) {};

GameOver.prototype = {
  init: function() {

  },
  preload: function() {
    deathSFX = game.add.audio("deathSound");
    deathSFX.loop = false;
    game.add.sprite(0, 0, "dead");
    deathSFX.play();
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
