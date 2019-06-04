"use strict";

var Intro = function(game) {};

Intro.prototype = {
  preload: function() {
    game.add.sprite(0, 0, "comic");
  },
  create: function() {
    // set up comic
  },
  update: function() {
    // wait for player input to play
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      game.state.start("Play");
    }
  }
}
