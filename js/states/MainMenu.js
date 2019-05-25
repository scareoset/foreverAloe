"use strict";

var MainMenu = function(game) {};

MainMenu.prototype = {
  init: function() {

  },
  preload: function() {
    // preload assets for game
    game.stage.backgroundColor = "19a48c";
    console.log("MainMenu: preload");

    // load assets
    // game.load.spritesheet("playerSprite", "assets/img/dude.png", 32, 48);
    game.load.atlas("player", "assets/img/player.png", "assets/img/player.json");
    // game.load.spritesheet("baddie", "assets/img/baddie.png", 32, 32);
    game.load.atlas("enemy", "assets/img/enemy.png", "assets/img/enemy.json");
    game.load.image("platform", "assets/img/platform.png");
    game.load.image("playerTemp", "assets/img/playerTemp.png");
    game.load.image("baddieTemp", "assets/img/baddieTemp.png");
    game.load.image("platformOne", "assets/img/platformOne.png");
    game.load.image("xtraLife", "assets/img/firstAid.png");
    game.load.image("button", "assets/img/button.png");
    game.load.image("laserOn", "assets/img/laserOn.png");
    game.load.image("laserOff", "assets/img/laserOff.png");
    game.load.image("screen", "assets/img/screen.png");
    game.load.image("background", "assets/img/lvl1Background.png");
    game.load.image("window", "assets/img/window.png");
    game.load.image("title", "assets/img/titleTemp.png");
    game.load.audio("score", "assets/audio/score.mp3");
  },
  create: function() {
    // show menu screen
    game.add.image(0, 0, "title");
    console.log("MainMenu: create");
  },
  update: function() {
    // wait for player input to start game
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      console.log("Starting Play");
      game.state.start("Play");
    }
  }
}
