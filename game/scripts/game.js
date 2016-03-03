
window.onload = function() {

  var game = new Phaser.Game(
    window.innerWidth, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }
  );
  var player, platforms, cursors;
  var jumpTimer = 0;

  function preload () {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    //game.load.image('wall', 'assets/wall.png');
    game.load.spritesheet('player', 'assets/dude.png', 32, 48);

  }

  function create () {
    //Setting up the world
    game.world.setBounds(0, 0, 3000, 600);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    game.add.sprite(800, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(-500, game.world.height - 64, 'ground');
    ground.scale.setTo(10, 1);
    ground.body.immovable = true;

    //Create the player
    player = game.add.sprite(50, game.world.centerY, 'player');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //Create the built-in keyboard
    cursors = game.input.keyboard.createCursorKeys();

    //Set the camera to follow the player
    game.camera.follow(player);


  }

  function update() {
    game.physics.arcade.collide(player, platforms);

    //Poll for movements
    if (cursors.left.isDown) {
      player.body.velocity.x = -150;
      player.animations.play('left');
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 150;
      player.animations.play('right');
    } else {
        player.body.velocity.x = 0;
        player.frame = 4;
    }

    if (cursors.up.isDown) {
      if (player.body.touching.down && jumpTimer === 0) {
        player.body.velocity.y = -150;
        jumpTimer = 1;
      } else if (jumpTimer < 16 && jumpTimer > 0) {
        player.body.velocity.y = -150 + (-(jumpTimer * 9));
        jumpTimer++;
      }
    } else {
      jumpTimer = 0;
    }

    // I want to figure out how to remove the player if they fall
  }


  function render() {

  }

};
