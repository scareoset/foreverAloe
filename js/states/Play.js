"use strict";

var OFFSET = 300;

// player variables
var player;
var xtraLife;
var front = 1; // 1 = right, -1 = left

// enemy variables (only good for one enemy)
var enemy;
var ENEMY_PATH_START = 650 + OFFSET;
var ENEMY_PATH_END = 1175 + OFFSET;

// groups
var platforms, enemies, buttons, health;

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

    game.world.setBounds(0, 0, 1600 + OFFSET, 500);

    // set up Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // build level
    platforms = game.add.group();
    platforms.enableBody = true;

    let platform = platforms.create(225 + OFFSET, 325, "platformOne");
    platform.body.immovable = true;
    platform.scale.setTo(0.2);
    let roof = platforms.create(500+ OFFSET , 0, "platform");
    roof.body.immovable = true;
    roof.scale.setTo(2, 10);

    var ground = platforms.create(0, game.world.height-40, "platform");
    ground.scale.setTo(6, 2);
    ground.body.immovable = true;

    health = game.add.group();
    health.enableBody = true;
    let healthUp = health.create(263 + OFFSET, 293, "xtraLife");

    // put in enemies
    // enemies = game.add.group();
    // enemies.enableBody = true;

    enemy = game.add.sprite(ENEMY_PATH_START, game.height/2, "baddie");
    game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = 300;
    enemy.collideWorldBounds = true;

    enemy.animations.add("left", [0, 1], 24, true);
    enemy.animations.add("right", [2, 3], 24, true);
    // start enemy off running to the right
    enemy.animations.play("right");
    enemy.body.velocity.x = 200;

    // put in puzzles

    // put in player
    player = game.add.sprite(100 + OFFSET, game.height/2, "player");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 1000;
    player.collideWorldBounds = true;

    player.animations.add("left", [0, 1, 2, 3], 24, true);
    player.animations.add("right", [5, 6, 7, 8], 24, true);

    game.camera.follow(player, 1, 0.5, 0.5);

    xtraLife = false;
  },
  update: function() {
    // update prefabs
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemy, platforms);

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
      front = 1;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.animations.play("left");
      player.body.velocity.x = -300;
      front = -1;
    } else {
      player.frame = 4;
      player.body.velocity.x = 0;
    }
    // handle wrapping
    // if(player.x < 0) {
    //   player.x = game.world.width;
    // } else if(player.x > game.world.width) {
    //   player.x = 0;
    // }

    // bug w/ world bounds heres a fix i guess?
    if(player.x < 0) {
      player.x = 0;
    } else if(player.x > game.world.width-32) {
      player.x = game.world.width-32;
    }
    //end run function

    if(enemy.x < ENEMY_PATH_START) {
      enemy.animations.play("right");
      enemy.body.velocity.x = 200;
    } else if(enemy.x > ENEMY_PATH_END) {
      enemy.animations.play("left");
      enemy.body.velocity.x = -200;
    }

    if(game.physics.arcade.collide(player, enemy)) {
      if(xtraLife) {
        xtraLife = false;
        enemy.body.velocity.x = (front*200);
      } else {
        game.state.start("GameOver");
      }
    }

    game.physics.arcade.overlap(player, health, collectHealth, null, this);

    function collectHealth(player, hp) {
      hp.kill();
      xtraLife = true;
    }
  }
}
