"use strict";

// we're loading each level in its own state

// player variables
var player;
var xtraLife, playerAttack, attackTimer;
var front = 1; // 1 = right, -1 = left

// groups
var platforms, buttons, friends;
var friendOne, friendTwo, friendThree;
var platformTwo, cage, cageLeft, cageRight;

var doors, door;

var touchdown;

// important flags
var jumpsLeft, jumping, grounded;

var song;
var buttonSFX, jumpSFX;

var LastLevel = function(game) {};

LastLevel.prototype = {
  init: function(life) {
    xtraLife = life;
  },
  preload: function() {
    // should be preloaded
    game.add.sprite(0, 0, "lvl1background");
  },
  create: function() {
    // set up level(s)

    game.world.setBounds(0, 0, 800, 500);

    // set up Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // build level
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(-10, 448, "platform10");
    ground.scale.setTo(470, 1);
    ground.body.immovable = true;

    doors = game.add.group();
    door = doors.create(736, 320, "doorTwo");

    friends = game.add.group();
    friends.enableBody = true;

    // put in puzzles
    buttons = game.add.group();
    buttons.enableBody = true;
    let button = buttons.create(400, 404, "buttonRed");
    button.scale.setTo(0.33);

    friendOne = friends.create(547, 128, "friendOne");
    friendOne.scale.setTo(0.45);
    friendOne.anchor.set(0.5);
    game.physics.arcade.enable(friendOne);
    friendOne.body.gravity.y = 0;
    friendOne.collideWorldBounds = true;
    friendOne.body.setCircle(32);
    friendOne.body.gravity.y = 300;
    friendOne.body.bounce.set(0.3);

    friendTwo = friends.create(547+74, 192, "friendTwo");
    friendTwo.scale.setTo(0.33);
    friendTwo.anchor.set(0.5);
    game.physics.arcade.enable(friendTwo);
    friendTwo.body.gravity.y = 0;
    friendTwo.collideWorldBounds = true;
    friendTwo.body.setCircle(32);
    friendTwo.body.gravity.y = 300;
    friendTwo.body.bounce.set(0.3);

    friendThree = friends.create(547+74+74, 128, "friendThree");
    friendThree.scale.setTo(0.5);
    friendThree.anchor.set(0.5);
    game.physics.arcade.enable(friendThree);
    friendThree.body.gravity.y = 0;
    friendThree.collideWorldBounds = true;
    friendThree.body.setCircle(32);
    friendThree.body.gravity.y = 300;
    friendThree.body.bounce.set(0.3);

    // cage = platforms.create(500, 32, "cageTop");
    // cage.body.immovable = true;
    cage = game.add.sprite(500, 32, "cageTop");
    cageLeft = platforms.create(500, 32, "cageSide");
    cageLeft.body.immovable = true;
    cageRight = platforms.create(740, 32, "cageSide");
    cageRight.body.immovable = true;

    platformTwo = platforms.create(500, 272, "cageBottom");
    platformTwo.body.immovable = true;

    // put in player
    // player = game.add.sprite(100 + OFFSET, game.height/2, "playerSprite");
    player = game.add.sprite(100 + OFFSET, game.height/2, "player", "AloeVera-01.png");
    player.scale.setTo(PLAYER_SCALE);
    player.anchor.set(0.5);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 1024;
    player.collideWorldBounds = true;
    // player.body.setCircle(125);

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

    jumpSFX = game.add.audio("jumpSound");
    jumpSFX.loop = false;

    buttonSFX = game.add.audio("buttonSound");
    buttonSFX.loop = false;

    xtraLife = false;
    playerAttack = false;
    touchdown = false;
  },
  update: function() {
    // update prefabs
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(friends, platforms);
    game.physics.arcade.collide(player, friends);

    if(friendOne.y > 400) {
      touchdown = true;
    }

    if(friendOne.x > 780) {
      friendOne.kill();
    } else if(friendOne.x < 0) {
      friendOne.x = 547;
    }

    if(friendTwo.x > 780) {
      friendTwo.kill();
    } else if(friendTwo.x < 0) {
      friendTwo.x = 547+74;
    }


    if(friendThree.x > 780) {
      friendThree.kill();
    } else if(friendThree.x < 0) {
      friendThree.x = 547+74+74;
    }

    // jump function
    grounded = player.body.touching.down;

    if(grounded) {
      jumpsLeft = 2;
      jumping = false;
    }

    if(jumpsLeft > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
      player.animations.play("jump");
      jumpSFX.play();
      player.body.velocity.y = -364;
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

    if(player.y > 474) {
      player.y = 406;
    }

    // end game
    if(player.x > 1660 && player.y > 420) {
      song.stop();
      game.state.start("LevelOne", true, false, xtraLife);
    }

    if(player.x > 760) {
      song.stop();
      game.state.start("End");
    }

    game.physics.arcade.overlap(player, buttons, pressButton, null, this);

    function pressButton(player, button) {
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        platformTwo.body.immovable = false;
        buttonSFX.play();
        platformTwo.body.gravity.y = 300;
        button.loadTexture("buttonOff");
      }
    }
  }
}
