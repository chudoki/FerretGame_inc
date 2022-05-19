class FerretCage extends Phaser.Scene {
    constructor () {
        super("FerretCageScene");
    }

    preload() {
        this.load.image('ferret', 'assets/sprites/ferret player.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platformLg', 'assets/sprites/platformLg.png');
    }

    create() {
        // input keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        

        // camera
        this.matter.world.setBounds(0, 0,2000,1600);
        this.cameras.main.setBounds(0, 0,2000,1600);
        
       var nextGr = this.matter.world.nextGroup(true);
        var headcol = 0x0001;
        var restcol = 0x0002;
        this.player = new Ferret(this, 400, 100, 'ferret').setScale(-.15,.15).setCollisionGroup(nextGr);
        this.player.body.sleepThreshold = -1;
        this.player2 = new Ferret(this, 600, 100, 'ferret').setScale(-.15,.15).setCollisionGroup(nextGr);
        this.player2.body.sleepThreshold = -1;
       

        this.matter.add.joint(this.player,this.player2,100,.001,{angularStiffness: .1});
           
        this.P1 = new Platform(this, 400, 700, 'platform', null).setStatic(true).setFriction(2);
        this.P2 = new Platform(this, 1500, 400, 'platform', null).setStatic(true).setFriction(2);
        this.P2 = new Platform(this, 1100, 800, 'platformLg', null).setStatic(true).setFriction(2);
        this.cameras.main.startFollow(this.player);

    }

    update() {
        
        this.player.update();
    }

}