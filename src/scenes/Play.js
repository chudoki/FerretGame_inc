class Level1 extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    preload() {
        this.load.image('block', 'assets/sprites/block.png');
        this.load.image('platform', 'assets/sprites/platform.png');
    }

    create() {
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        
        
        this.block = new Ferret(this, 400, 100, 'block').setScale(.2);
        this.block.sleepThreshold = -1;
        var ground = this.matter.add.image(400, 850, 'platform', null, { restitution: 0.4, isStatic: true });

    }

    update() {
        //this.block.moveLeft();
        this.block.update();
    }

}