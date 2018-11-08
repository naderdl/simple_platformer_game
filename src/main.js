import "phaser";
const gameWidth = 930;
const gameHeight = 400;
var player;

var config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
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
  // backGround
  this.add.tileSprite(500, 200, 1000, 400, "backGround");
  this.add.tileSprite(500, 260, 1000, 400, "middleGround");
  // map
  var map = this.make.tilemap({ key: "map" });
  var tiles = map.addTilesetImage("tileset");
  var layer = map.createStaticLayer(0, tiles, 0, 0);
  // player
  player = this.physics.add.sprite(
    10,
    10,
    "atlas",
    "player/idle/player-idle-1"
  );
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
}

function update() {}
