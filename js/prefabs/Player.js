"use strict";

// maybe move this back to Play.js

function Player(game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);

  this.anchor.set(0.5);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  // check for alive
  // handle input
  // update position
}
