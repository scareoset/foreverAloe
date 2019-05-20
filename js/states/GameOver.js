"use strict";

var message;

var style ={
  font: "24px Helvetica",
  fill: "#FFF"
}

var GameOver = function(game) {};

GameOver.prototype = {
  init: function() {

  },
  preload: function() {
    game.stage.backgroundColor = "b35c53";

    message = game.add.text(400, game.world.centerY, "press space to return to main menu", style);
    message.anchor.set(0.5);
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
