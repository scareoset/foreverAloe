"use strict";

// player variables
var player;
var xtraLife, playerAttack, attackTimer;
var front = 1; // 1 = right, -1 = left

// enemy variables (only good for one enemy)
var enemy;
var ENEMY_PATH_START = 640;
var ENEMY_PATH_END = 846;

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
    game.add.sprite(-32, 0, "lvl2background");
    console.log("LevelOne: preload");
  },
  create: function() {
    // set up level(s)
    console.log("LevelOne: create");

    game.world.setBounds(0, 0, 2624, 1280);

    // set up Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // build level
    platforms = game.add.group();
    platforms.enableBody = true;

    buildLevel();

    var ground = platforms.create(-10, 1216, "platform10");
    ground.scale.setTo(470, 1);
    ground.body.immovable = true;

    health = game.add.group();
    health.enableBody = true;
    let healthUp = health.create(263, 293, "xtraLife");

    // put in enemies
    // enemies = game.add.group();
    // enemies.enableBody = true;

    // enemy = game.add.sprite(ENEMY_PATH_START, game.height/2, "baddie");
    enemy = game.add.sprite(ENEMY_PATH_START, 96, "enemy", [0]);
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
    let button = buttons.create(1525, 280, "button");
    button.scale.setTo(0.01);

    laser = platforms.create(1450, 350, "laserOn");
    laser.scale.setTo(0.048);
    laser.body.immovable = true;

    // put in player
    // player = game.add.sprite(100, game.height/2, "playerSprite");
    player = game.add.sprite(1152, 200, "player", "AloeVera-01.png");
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

    playerAttack = false;
    attackTimer = game.time.create();

    function buildLevel() {
      // row 1
      for(let i = 0; i < 384; i += 64) {
        let platform = platforms.create(i, 0, "platform04");
        platform.body.immovable = true;
      }
      for(let i = 384; i < 1600; i += 64) {
        let platform = platforms.create(i, 0, "platform07");
        platform.body.immovable = true;
      }
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 0, "platform04");
        platform.body.immovable = true;
      }
      // row 2
      for(let i = 0; i < 320; i += 64) {
        let platform = platforms.create(i, 64, "platform04");
        platform.body.immovable = true;
      }
      let platform = platforms.create(320, 64, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1536, 64, "platform03");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 64, "platform04");
        platform.body.immovable = true;
      }
      // row 3
      for(let i = 0; i < 320; i += 64) {
        let platform = platforms.create(i, 128, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(320, 128, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1536, 128, "platform03");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 128, "platform04");
        platform.body.immovable = true;
      }
      // row 4
      for(let i = 0; i < 384; i += 64) {
        let platform = platforms.create(i, 192, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(384, 192, "platform02");
      platform.body.immovable = true;
      platform = platforms.create(1088, 192, "platform00");
      platform.body.immovable = true;
      for(let i = 1152; i < 1344; i += 64) {
        let platform = platforms.create(i, 192, "platform01");
        platform.body.immovable = true;
      }
      platform = platforms.create(1344, 192, "platform02");
      platform.body.immovable = true;
      platform = platforms.create(1536, 192, "platform03");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 192, "platform04");
        platform.body.immovable = true;
      }
      // row 5
      for(let i = 0; i < 384; i += 64) {
        let platform = platforms.create(i, 256, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(384, 256, "platform08");
      platform.body.immovable = true;
      platform = platforms.create(576, 256, "platform09");
      platform.body.immovable = true;
      for(let i = 640; i < 896; i += 64) {
        let platform = platforms.create(i, 256, "platform10");
        platform.body.immovable = true;
      }
      platform = platforms.create(896, 256, "platform11");
      platform.body.immovable = true;
      platform = platforms.create(1088, 256, "platform06");
      platform.body.immovable = true;
      for(let i = 1152; i < 1280; i += 64) {
        let platform = platforms.create(i, 256, "platform07");
        platform.body.immovable = true;
      }
      platform = platforms.create(1280, 256, "platform04");
      platform.body.immovable = true;
      platform = platforms.create(1344, 256, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1536, 256, "platform03");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 256, "platform04");
        platform.body.immovable = true;
      }
      // row 6
      for(let i = 0; i < 320; i += 64) {
        let platform = platforms.create(i, 320, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(320, 320, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1280, 320, "platform03");
      platform.body.immovable = true;
      platform = platforms.create(1344, 320, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1536, 320, "platform04");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 320, "platform04");
        platform.body.immovable = true;
      }
      // row 7
      for(let i = 0; i < 384; i += 64) {
        let platform = platforms.create(i, 384, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(384, 384, "platform01");
      platform.body.immovable = true;
      platform = platforms.create(448, 384, "platform02");
      platform.body.immovable = true;
      platform = platforms.create(1024, 384, "platform00");
      platform.body.immovable = true;
      for(let i = 1088; i < 1280; i += 64) {
        let platform = platforms.create(i, 384, "platform01");
        platform.body.immovable = true;
      }
      platform = platforms.create(1280, 384, "platform04");
      platform.body.immovable = true;
      platform = platforms.create(1344, 384, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1536, 384, "platform03");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 384, "platform04");
        platform.body.immovable = true;
      }
      // row 8
      for(let i = 0; i < 384; i += 64) {
        let platform = platforms.create(i, 448, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(384, 448, "platform07");
      platform.body.immovable = true;
      platform = platforms.create(448, 448, "platform08");
      platform.body.immovable = true;
      platform = platforms.create(576, 448, "platform09");
      platform.body.immovable = true;
      platform = platforms.create(640, 448, "platform11");
      platform.body.immovable = true;
      platform = platforms.create(1024, 448, "platform03");
      platform.body.immovable = true;
      for(let i = 1088; i < 1384; i += 64) {
        let platform = platforms.create(i, 448, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(1344, 448, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1536, 448, "platform03");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 448, "platform04");
        platform.body.immovable = true;
      }
      // row 9
      for(let i = 0; i < 320; i += 64) {
        let platform = platforms.create(i, 512, "platform04");
        platform.body.immovable = true;
      }
      platform = platforms.create(320, 512, "platform05");
      platform.body.immovable = true;
      for(let i = 1088; i < 1384; i += 64) {
        let platform = platforms.create(i, 512, "platform01");
        platform.body.immovable = true;
      }
      platform = platforms.create(1344, 512, "platform05");
      platform.body.immovable = true;
      platform = platforms.create(1536, 512, "platform03");
      platform.body.immovable = true;
      for(let i = 1600; i < 2624; i += 64) {
        let platform = platforms.create(i, 512, "platform04");
        platform.body.immovable = true;
      }
    }
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
      if(!xtraLife) {
        hp.kill();
        xtraLife = true;
      }
    }

    function pressButton(player, button) {
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        laser.kill();
      }
    }
  }
}
