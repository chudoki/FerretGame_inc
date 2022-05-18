class Level1 extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    preload() {
        this.load.image('ferret', 'assets/sprites/ferret player.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platformLg', 'assets/sprites/platformLg.png');
    }

    create() {
        let height = 1600;
        let width = 9000;
        // input keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        

        // camera
       this.matter.world.setBounds(0, 0,width,height);
       this.cameras.main.setBounds(0, 0,width,height);
        
       var sus = this.matter.world.nextGroup(true);
        
       this.player = new Ferret(this, 500, height-400, 'ferret').setScale(.15,.15).setCollisionGroup(sus);
       this.player.body.sleepThreshold = -1;
       this.floor = this.matter.add.rectangle(width/2,height-50,width,100,{
          
           chamfer:5
       });
       this.floor2 = this.add.rectangle(width/2,height-50,width,100,0xdda15e);
       this.floor.sleepThreshold = -1;
        this.P1 = new Platform(this, 400, 700, 'platform', null).setStatic(true).setFriction(2);
        this.P2 = new Platform(this, 1500, 400, 'platform', null).setStatic(true).setFriction(2);
        this.P2 = new Platform(this, 1100, 800, 'platformLg', null).setStatic(true).setFriction(2);
        this.cameras.main.startFollow(this.player);

    }

    update() {
        
        this.player.update();
    }

}