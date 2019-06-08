"use strict";

var End = function(game) {};

End.prototype = {
  init: function() {

  },
  preload: function() {
    game.add.sprite(0, 0, "end");
  },
  create: function() {
    // set up end screen
  },
  update: function() {
    // wait for player input to return to main menu
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      game.state.start("MainMenu");
    }
  }
}
