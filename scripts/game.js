
window.onload = function() {

  var game = new Phaser.Game(
    window.innerWidth - 200, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render }
  );
  var player, platforms, cursors, bg;
  var jumpTimer = 0;

  function preload () {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    //game.load.image('wall', 'assets/wall.png');
    game.load.spritesheet('player', 'assets/dude.png', 32, 48);

  }

  function create () {
    //Setting up the world
    game.world.setBounds(0, 0, 3200, 600);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    game.add.sprite(800, 0, 'sky');
    game.add.sprite(1600, 0, 'sky');
    game.add.sprite(2400, 0, 'sky');
    
    //Create the platform group
    platforms = game.add.group();
    platforms.enableBody = true;
    
    //Create the ground layer
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(3, 2);
    ground.body.immovable = true;
    
    ground = platforms.create(1470, game.world.height - 64, 'ground');
    ground.scale.setTo(3,2);
    ground.body.immovable = true;
    
    //Create the series of platforms for the player to jump on
    var ledge = platforms.create(200, game.world.height - 200, 'ground');
    ledge.enableBody = true;
    ledge.body.immovable = true;
    ledge = platforms.create(500, 150, 'ground');
    ledge.enableBody = true;
    ledge.body.immovable = true;
    ledge = platforms.create(750, 300, 'ground');
    ledge.enableBody = true;
    ledge.body.immovable = true;
    ledge = platforms.create(1200, 250, 'ground');
    ledge.enableBody = true;
    ledge.body.immovable = true;
    ledge = platforms.create(2200, 250, 'ground');
    ledge.enableBody = true;
    ledge.body.immovable = true;
    ledge = platforms.create(2900, 250, 'ground');
    ledge.enableBody = true;
    ledge.body.immovable = true;

    //Create the player
    function createPlayer() {
        
        player = game.add.sprite(50, game.world.centerY, 'player');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.maxVelocity.y = 500;
        player.body.collideWorldBounds = false;
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(resetPlayer, this);
        player.body.setSize(20, 32, 5, 16);
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        //Set the camera to follow the player
        game.camera.follow(player);
        
    }
    
    function resetPlayer() {
        player.destroy();
        createPlayer();
    }
    
    createPlayer();

    //Create the built-in keyboard
    cursors = game.input.keyboard.createCursorKeys();

  }

  function update() {
    game.physics.arcade.collide(player, platforms);

    //Poll for movements
    if (cursors.left.isDown) {
      player.body.velocity.x = -200;
      player.animations.play('left');
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 200;
      player.animations.play('right');
    } else {
        player.body.velocity.x = 0;
        player.frame = 4;
    }

    if (cursors.up.isDown) {
      if (player.body.touching.down && jumpTimer === 0) {
        player.body.velocity.y = -75;
        jumpTimer = 1;
      } else if (jumpTimer < 18 && jumpTimer > 0) {
        player.body.velocity.y = -75 + (-(jumpTimer * 9));
        jumpTimer++;
      }
    } else {
      jumpTimer = 0;
    }
  }

  function render() {
      //game.debug.bodyInfo(player, 16, 24);
  }

};
