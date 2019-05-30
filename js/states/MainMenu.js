"use strict";

var MainMenu = function(game) {};

MainMenu.prototype = {
  init: function() {

  },
  preload: function() {
    // preload assets for game
    console.log("MainMenu: preload");

    // load assets
    game.load.atlas("player", "assets/img/player.png", "assets/img/player.json");
    game.load.atlas("enemy", "assets/img/enemy.png", "assets/img/enemy.json");
    game.load.image("platform", "assets/img/platform.png");
    game.load.image("platformOne", "assets/img/platformOne.png");
    game.load.image("platform00", "assets/img/platform00.png");
    game.load.image("platform01", "assets/img/platform01.png");
    game.load.image("platform02", "assets/img/platform02.png");
    game.load.image("platform03", "assets/img/platform03.png");
    game.load.image("platform04", "assets/img/platform04.png");
    game.load.image("platform05", "assets/img/platform05.png");
    game.load.image("platform06", "assets/img/platform06.png");
    game.load.image("platform07", "assets/img/platform07.png");
    game.load.image("platform08", "assets/img/platform08.png");
    game.load.image("platform09", "assets/img/platform09.png");
    game.load.image("platform10", "assets/img/platform10.png");
    game.load.image("platform11", "assets/img/platform11.png");
    game.load.image("xtraLife", "assets/img/shield.png");
    game.load.image("button", "assets/img/button.png");
    game.load.image("laserOn", "assets/img/laserOn.png");
    game.load.image("laserOff", "assets/img/laserOff.png");
    game.load.image("screen", "assets/img/screen.png");
    game.load.image("lvl1background", "assets/img/window.png");
    game.load.image("lvl2background", "assets/img/lvl2Background.png");
    game.load.image("dead", "assets/img/dead.png");
    game.load.image("title", "assets/img/title.png");
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
      // console.log("Starting LevelOne");
      // game.state.start("LevelOne");
    }
  }
}
