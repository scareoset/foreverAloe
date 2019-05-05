"use strict";

// player
var player;

var enemy;

// groups
var platforms, enemies, buttons;

// important flags
var jumpsLeft, jumping, grounded;

var Play = function(game) {};

Play.prototype = {
  init: function() {

  },
  preload: function() {
    // should be preloaded
    game.stage.backgroundColor = "19a4ac";
    console.log("Play: preload");
  },
  create: function() {
    // set up level(s)
    console.log("Play: create");

    // set up Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // build level
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height-40, "platform");
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    // put in enemies
    // enemies = game.add.group();
    // enemies.enableBody = true;

    enemy = game.add.sprite(100, game.height/2, "baddie");
    game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = 300;
    enemy.collideWorldBounds = true;

    enemy.animations.add("left", [0, 1], 24, true);
    enemy.animations.add("right", [2, 3], 24, true);

    // put in puzzles

    // put in player
    player = game.add.sprite(100, game.height/2, "player");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 300;
    player.collideWorldBounds = true;

    player.animations.add("left", [0, 1, 2, 3], 24, true);
    player.animations.add("right", [5, 6, 7, 8], 24, true);
  },
  update: function() {
    // update prefabs
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    // jump function
    grounded = player.body.touching.down;

    if(grounded) {
      jumpsLeft = 2;
      jumping = false;
    } else {
      // jump animations
    }

    if(jumpsLeft > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
      player.body.velocity.y = -300;
      jumping = true;
    }

    if(jumping && game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
      jumpsLeft--;
      jumping = false;
    }
    // end jump function

    //run function
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.animations.play("right");
      player.body.velocity.x = 300;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.animations.play("left");
      player.body.velocity.x = -300;
    } else {
      player.frame = 4;
      player.body.velocity.x = 0;
    }
    // handle wrapping
    if(player.x < 0) {
      player.x = game.world.width;
    } else if(player.x > game.world.width) {
      player.x = 0;
    }
    //end run function

    enemy.animations.play("right");
    enemy.body.velocity.x = 200;
    if(enemy.x < 0) {
      enemy.x = game.world.width;
    } else if(enemy.x > game.world.width) {
      enemy.x = 0;
    }

    if(game.physics.arcade.collide(player, enemy )) {
      game.state.start("GameOver");
    }
  }
}
