"use strict";

var MainMenu = function(game) {};

MainMenu.prototype = {
  init: function() {

  },
  preload: function() {
    // preload assets for game

    // load assets
    game.load.image("comic", "assets/img/introComic.png");
    game.load.atlas("player", "assets/img/player.png", "assets/img/player.json");
    game.load.atlas("enemy", "assets/img/enemy.png", "assets/img/enemy.json");
    game.load.image("friendOne", "assets/img/friendOne.png");
    game.load.image("friendTwo", "assets/img/friendTwo.png");
    game.load.image("friendThree", "assets/img/friendThree.png");
    game.load.image("door", "assets/img/door.png");
    game.load.image("doorTwo", "assets/img/doorTwo.png");
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
    game.load.image("laserRed", "assets/img/laserRed.png");
    game.load.image("buttonOff", "assets/img/buttonOff.png");
    game.load.image("laserTallRed", "assets/img/laserTallRed.png");
    game.load.image("buttonRed", "assets/img/buttonRed.png");
    game.load.image("laserTallGreen", "assets/img/laserTallGreen.png");
    game.load.image("buttonGreen", "assets/img/buttonGreen.png");
    game.load.image("laserBlue", "assets/img/laserBlue.png");
    game.load.image("laserTallBlue", "assets/img/laserTallBlue.png");
    game.load.image("buttonBlue", "assets/img/buttonBlue.png");
    game.load.image("laserTallPurple", "assets/img/laserTallPurple.png");
    game.load.image("buttonPurple", "assets/img/buttonPurple.png");
    game.load.image("cageSide", "assets/img/cageSide.png");
    game.load.image("cageTop", "assets/img/cageTop.png");
    game.load.image("cageBottom", "assets/img/cageBottom.png");
    game.load.image("screen", "assets/img/screen.png");
    game.load.image("lvl1background", "assets/img/window.png");
    game.load.image("lvl2background", "assets/img/lvl2Background.png");
    game.load.image("end", "assets/img/end.png");
    game.load.image("dead", "assets/img/dead.png");
    game.load.image("title", "assets/img/title.png");
    game.load.audio("score", "assets/audio/score.mp3");
  },
  create: function() {
    // show menu screen
    game.add.image(0, 0, "title");
  },
  update: function() {
    // wait for player input to start game
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      game.state.start("Intro");
      // console.log("Starting LevelOne");
      // game.state.start("LevelOne");
    }
  }
}
