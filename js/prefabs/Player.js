"use strict";

// maybe move this back to Play.js
var game;

function Player(game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);

  this.anchor.set(0.5);

  this.states = [
    {
      "name": "idle",
      "events": {
        "walk": "walking",
        "jump": "jumping",
        "attack": "attacking",
        "interact": "interacting"
      }
    },
    {
      "name": "walking",
      "events": {
        "jump": "jumping",
        "stop": "idle",
        "attack": "attacking"
      }
    },
    {
      "name": "jumping",
      "events": {
        "doubleJump": "doubleJumping",
        "walk": "walking",
        "stop": "idle",
        "attack": "attacking"
      }
    },
    {
      "name": "doubleJumping",
      "events": {
        "walk": "walking",
        "stop": "idle",
        "attack": "attacking"
      }
    },
    {
      "name": "attacking",
      "events": {
        "stop": "idle",
        "walk": "walking"
      }
    }
  ];

  // create state machine on element obj, passing JSON states obj & target obj (this)
  this.element.stateMachine = new States(this.states, this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function() {
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
}

Player.prototype.update = function() {
  // check for alive
  // handle input
  // update position
  var hitPlatform = game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(enemy, platforms);

  if(!playerAttack) {       // if not attacking



  } else if(playerAttack) { // if attacking

  }

  function jump() {
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
  }

  function movement() {
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
  }
}
