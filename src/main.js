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
  this.physics.add.collider(player, layer);
  const debugGraphics = this.add.graphics().setAlpha(0.75);
  layer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });
}

function update() {}

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
