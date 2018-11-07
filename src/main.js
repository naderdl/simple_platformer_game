import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1366,
    height: 768,
    scene: {
        preload,
        create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    var logo = this.add.image(683, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 610,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}
