//  Forever Aloe
//  Created by Annabel Maokhamphiou, Raquel Ramirez, and Daniel Wright
//  ARTG/CMPM 120
//  https://github.com/scareoset/foreverAloe

"use strict";

// for clean code
var config = {
  width: 800,
  height: 500,
  renderer: Phaser.AUTO,
  idDOM: ""
}

var game;

window.onload = function() {
  game = new Phaser.Game(config); // super clean code

  // add states and start at main menu
  game.state.add("MainMenu", MainMenu);
  game.state.add("Play", Play);
  game.state.add("LevelOne", LevelOne);
  game.state.add("GameOver", GameOver);
  game.state.start("MainMenu");
}
