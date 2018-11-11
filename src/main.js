import "phaser";
const gameWidth = 930;
const gameHeight = 400;
var player;
var cursors;

var config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

var game = new Phaser.Game(config);

function preload() {
  // environment
  this.load.image("backGround", "assets/environment/back.png");
  this.load.image("middleGround", "assets/environment/middle.png");
  //tileset
  this.load.image("tileset", "assets/environment/tileset.png");
  this.load.tilemapTiledJSON("map", "assets/maps/map.json");
  // atlas sprites
  this.load.atlas("atlas", "assets/atlas/atlas.png", "assets/atlas/atlas.json");
  this.load.atlas(
    "atlas-props",
    "assets/atlas/atlas-props.png",
    "assets/atlas/atlas-props.json"
  );
  // music
  this.load.audio("music", ["assets/sound/platformer_level03_loop.ogg"]);
}

function create() {
  this.cameras.main.roundPixels = true;
  // backGround
  this.add.tileSprite(500, 200, 1000, 400, "backGround");
  this.add.tileSprite(500, 260, 1000, 400, "middleGround");
  // map
  var map = this.make.tilemap({ key: "map" });
  var tiles = map.addTilesetImage("tileset");
  var layer = map.createStaticLayer(0, tiles, 0, 0);

  layer.setCollision([
    27,
    29,
    31,
    33,
    35,
    37,
    77,
    81,
    86,
    87,
    127,
    129,
    131,
    133,
    134,
    135,
    83,
    84,
    502,
    504,
    505,
    529,
    530,
    333,
    335,
    337,
    339,
    366,
    368,
    262,
    191,
    193,
    195,
    241,
    245,
    291,
    293,
    295
  ]);

  setTopCollisionTiles(map, 35);
  setTopCollisionTiles(map, 36);
  setTopCollisionTiles(map, 84);
  setTopCollisionTiles(map, 86);
  setTopCollisionTiles(map, 134);
  setTopCollisionTiles(map, 135);
  setTopCollisionTiles(map, 366);
  setTopCollisionTiles(map, 367);
  setTopCollisionTiles(map, 368);
  setTopCollisionTiles(map, 262);
  // player
  player = this.physics.add.sprite(
    400,
    100,
    "atlas",
    "player/idle/player-idle-1"
  );
  player.body.gravity.y = 50;
  player.setBounce(0.2);
  console.log(this.physics);
  this.physics.add.collider(player, layer);
  player.setCollideWorldBounds(true);

  player.body.setSize(12, 30, 8, 16);
  // player.body.drag.setTo(1000, 0);
  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNames("atlas", {
      prefix: "player/idle/player-idle-",
      start: 1,
      end: 4,
      siffix: "",
      zeroPad: 0
    }),
    frameRate: 12,
    repeat: -1
  });

  this.anims.create({
    key: "run",
    frames: this.anims.generateFrameNames("atlas", {
      prefix: "player/run/player-run-",
      start: 1,
      end: 6,
      siffix: "",
      zeroPad: 0
    }),
    frameRate: 15,
    repeat: -1
  });
  cursors = this.input.keyboard.createCursorKeys();
  console.log(player);
}

function update() {
  if (cursors.left.isDown) {
    // if the left arrow key is down
    player.body.setVelocityX(-150); // move left
    player.play("run", true);
    player.flipX = true;
  } else if (cursors.right.isDown) {
    // if the right arrow key is down
    player.body.setVelocityX(150); // move right
    player.play("run", true);
    player.flipX = false;
  } else {
    player.body.setVelocityX(0);
    player.anims.play("idle", true);
  }
  if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
    player.body.setVelocityY(-170); // jump up
  }
}

function setTopCollisionTiles(map, tileIndex) {
  var x, y, tile;
  for (x = 0; x < map.widthInPixels; x++) {
    for (y = 1; y < map.heightInPixels; y++) {
      tile = map.getTileAt(x, y);
      if (tile !== null) {
        if (tile.index == tileIndex) {
          tile.setCollision(false, false, true, false);
        }
      }
    }
  }
}
