"use strict";

var message;

var style = {
  font: "24px Helvetica",
  fill: "#FFF"
}

var MainMenu = function(game) {};

MainMenu.prototype = {
  init: function() {

  },
  preload: function() {
    // preload assets for game
    game.stage.backgroundColor = "19a48c";
    console.log("MainMenu: preload");

    // load assets
    game.load.spritesheet("player", "assets/img/dude.png", 32, 48);
    game.load.spritesheet("baddie", "assets/img/baddie.png", 32, 32);
    game.load.image("platform", "assets/img/platform.png");
    game.load.image("playerTemp", "assets/img/playerTemp.png");
    game.load.image("baddieTemp", "assets/img/baddieTemp.png");
    game.load.image("platformOne", "assets/img/platformOne.png");
    game.load.image("xtraLife", "assets/img/firstAid.png");
  },
  create: function() {
    // show menu screen
    console.log("MainMenu: create");

    message = game.add.text(400, game.world.centerY, "press space to start\narrows to run\nup to jump", style);
    message.anchor.set(0.5);
  },
  update: function() {
    // wait for player input to start game
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      console.log("Starting Play");
      game.state.start("Play");
    }
  }
}
