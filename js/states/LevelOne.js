"use strict";

var OFFSET = 100;

var message, shieldMessage, buttonMessage;

var style = {
  font: "24px Helvetica",
  fill: "#FFF"
}

// player variables
var player;
var xtraLife, playerAttack, attackTimer;
var front = 1; // 1 = right, -1 = left

// enemy variables (only good for one enemy)
var enemy;
var ENEMY_PATH_START = 650 + OFFSET;
var ENEMY_PATH_END = 1175 + OFFSET;

// groups
var platforms, enemies, buttons, lasers, health;
var laser;

// important flags
var jumpsLeft, jumping, grounded;

var song;

var LevelOne = function(game) {};

LevelOne.prototype = {
  init: function(life) {
    xtraLife = life;
  },
  preload: function() {
    // should be preloaded
    game.stage.backgroundColor = "19a4ac";
    game.add.sprite(0, 0, "background");
    game.add.sprite(0, 0, "window");
    console.log("LevelOne: preload");
  },
  create: function() {
    // set up level(s)
    console.log("LevelOne: create");

    game.world.setBounds(0, 0, 1600 + OFFSET, 500);

    // set up Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // build level
    platforms = game.add.group();
    platforms.enableBody = true;

    let platform = platforms.create(225 + OFFSET, 325, "platformOne");
    platform.body.immovable = true;
    platform.scale.setTo(0.2);
    let roof = platforms.create(500 + OFFSET , 0, "screen");
    roof.body.immovable = true;
    let platformTwo = platforms.create(1400 + OFFSET, 325, "platform");
    platformTwo.body.immovable = true;

    var ground = platforms.create(0, game.world.height-40, "platform");
    ground.scale.setTo(6, 2);
    ground.body.immovable = true;

    health = game.add.group();
    health.enableBody = true;
    let healthUp = health.create(263 + OFFSET, 293, "xtraLife");

    message = game.add.text(200, game.world.centerY, "arrows to run\nup to jump", style);
    message.anchor.set(0.5);

    shieldMessage = game.add.text(400, 200, "shield allows you\nto take damage\nwithout dying", style);
    message.anchor.set(0.5);

    buttonMessage = game.add.text(1350, 100, "press space while\nin front of a button\nto deactivate laser", style);
    message.anchor.set(0.5);

    // put in enemies
    // enemies = game.add.group();
    // enemies.enableBody = true;

    // enemy = game.add.sprite(ENEMY_PATH_START, game.height/2, "baddie");
    enemy = game.add.sprite(ENEMY_PATH_START, game.height/2, "enemy", [0]);
    enemy.scale.setTo(0.06);
    enemy.anchor.set(0.5);
    game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = 300;
    enemy.collideWorldBounds = true;
    enemy.body.setCircle(250);

    // enemy.animations.add("left", [0, 1], 24, true);
    enemy.animations.add("left", [0, 1], 15, true);
    // enemy.animations.add("right", [2, 3], 24, true);
    enemy.animations.add("right", [0, 1], 15, true);
    // start enemy off running to the right
    enemy.scale.setTo(-0.1, 0.1);
    enemy.animations.play("right");
    enemy.body.velocity.x = 200;

    // put in puzzles
    buttons = game.add.group();
    buttons.enableBody = true;
    let button = buttons.create(1525 + OFFSET, 280, "button");
    button.scale.setTo(0.01);

    laser = platforms.create(1450 + OFFSET, 350, "laserOn");
    laser.scale.setTo(0.048);
    laser.body.immovable = true;

    // put in player
    // player = game.add.sprite(100 + OFFSET, game.height/2, "playerSprite");
    player = game.add.sprite(100 + OFFSET, game.height/2, "player", "AloeVera-01.png");
    player.scale.setTo(0.75);
    player.anchor.set(0.5);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 1000;
    player.collideWorldBounds = true;
    player.body.setCircle(125);

    player.animations.add("left", [1, 2, 3, 5, 6, 7], 30, true);
    player.animations.add("jump", [8], 30, true);
    player.animations.add("idle", [0], 30, true);
    player.animations.add("leftShield", [14, 15, 16, 17, 18, 19 ,20], 30, true);
    player.animations.add("jumpShield", [21], 30, true);
    player.animations.add("idleShield", [13], 30, true);
    game.camera.follow(player, 1, 0.5, 0.5);

    song = game.add.audio("score");
    song.loop = true;
    song.play();

    // xtraLife = false;
    playerAttack = false;
    attackTimer = game.time.create();
  },
  update: function() {
    // update prefabs
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemy, platforms);

    if(!playerAttack) {       // if not attacking
      // jump function
      grounded = player.body.touching.down;

      if(grounded) {
        jumpsLeft = 2;
        jumping = false;
      }

      if(jumpsLeft > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
        player.animations.play("jump");
        player.body.velocity.y = -300;
        jumping = true;
      }

      if(jumping && game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
        jumpsLeft--;
        jumping = false;
        if(!xtraLife) {
          player.animations.play("jump");
        } else {
          player.animations.play("jumpShield");
        }
      }
      // end jump function

      //run function
      if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        if(!xtraLife) {
          if(!grounded) {
            player.animations.play("jump");
            player.body.velocity.x = 300;
            front = 1;
          } else {
            player.animations.play("left");
            player.body.velocity.x = 300;
            front = 1;
          }
        } else {
          if(!grounded) {
            player.animations.play("jumpShield");
            player.body.velocity.x = 300;
            front = 1;
          } else {
            player.animations.play("leftShield");
            player.body.velocity.x = 300;
            front = 1;
          }
        }
        player.scale.setTo(0.2, 0.2);
      } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        if(!xtraLife) {
          if(!grounded) {
            player.animations.play("jump");
            player.body.velocity.x = -300;
            front = -1;
            player.scale.setTo(-0.2, 0.2);
          } else {
            player.animations.play("left");
            player.body.velocity.x = -300;
            front = -1;
            player.scale.setTo(-0.2, 0.2);
          }
        } else {
          if(!grounded) {
            player.animations.play("jumpShield");
            player.body.velocity.x = -300;
            front = -1;
            player.scale.setTo(-0.2, 0.2);
          } else {
            player.animations.play("leftShield");
            player.body.velocity.x = -300;
            front = -1;
            player.scale.setTo(-0.2, 0.2);
          }
        }
      } else {
        if(!xtraLife) {
          if(!grounded) {
            player.animations.play("jump");
            player.body.velocity.x = 0;
            player.scale.setTo(0.2, 0.2);
          } else {
            player.animations.play("idle");
            player.body.velocity.x = 0;
            player.scale.setTo(0.2, 0.2);
          }
        } else {
          if(!grounded) {
            player.animations.play("jumpShield");
            player.body.velocity.x = 0;
            player.scale.setTo(0.2, 0.2);
          } else {
            player.animations.play("idleShield");
            player.body.velocity.x = 0;
            player.scale.setTo(0.2, 0.2);
          }
        }
      }

      // bug w/ world bounds heres a fix i guess?
      if(player.x < 0) {
        player.x = 0;
      } else if(player.x > game.world.width-32) {
        player.x = game.world.width-32;
      }
      //end run function
    } else if(playerAttack) { // if attacking

    }



    if(enemy.x < ENEMY_PATH_START) {
      enemy.animations.play("right");
      enemy.body.velocity.x = 200;
      enemy.scale.setTo(-0.1, 0.1);
    } else if(enemy.x > ENEMY_PATH_END) {
      enemy.animations.play("left");
      enemy.body.velocity.x = -200;
      enemy.scale.setTo(0.1, 0.1);
    }

    if(game.physics.arcade.collide(player, enemy)) {
      if(xtraLife) {
        xtraLife = false;
        enemy.body.velocity.x = (front*200);
      } else {
        song.stop();
        game.state.start("GameOver");
      }
    }

    game.physics.arcade.overlap(player, health, collectHealth, null, this);
    game.physics.arcade.overlap(player, buttons, pressButton, null, this);

    function collectHealth(player, hp) {
      hp.kill();
      xtraLife = true;
    }

    function pressButton(player, button) {
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        laser.kill();
      }
    }

    function damage(target) {
      if(player) {
        if(xtraLife) {
          // no xtraLife
          // knockback
        } else {
          // die
        }
      } else {
        if(boss) {
          // boss hp --
        } else {
          // die
        }
      }
    }

    function attack() {
      if(playerFront === enemyFront) {
        if(playerFront === -1) {
          if(player.x > enemy.x) {
            // good
          } else {
            // damage
          }
        } else if(playerFront === 1) {
          if(player.x < enemy.x) {
            // good
          } else {
            // damage
          }
        }
      }
    }
  }
  // },
  // render: function() {
  //   game.debug.body(player);
  //   game.debug.body(enemy);
  // }
}