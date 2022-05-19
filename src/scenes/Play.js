class Level1 extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    preload() {

        this.load.image('ferret', 'assets/sprites/ferret player.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platformLg', 'assets/sprites/platformLg.png');
        this.load.atlas('sheet', 'assets/sprites/shapePack-0.png', 'assets/sprites/shapePack.json');
        this.load.audio('sfx_bump', 'assets/bump.wav');
        this.load.json("shapes", "assets/sprites/shapes.json");

    }

    create() {
        let height = 1600;
        let width = 9000;
        
        this.playThud = false;
        

        //background music
        this.bgm =this.sound.add('sunnyMorning',{loop: true, volume:0.3});
        this.bgm.play();
        // input keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
        //take in physics coordinates
        const shapes = this.cache.json.get("shapes");

        //add balls
        for( let i = 200; i < width; i += 250){
            
            this.matter.add.sprite(i,height-800, 'sheet', 'circle.png', {shape: shapes.circle, restitution: 1, frictionAir: .01 }).setScale(.5,.5).setDensity(.0001).setTint(99999);

        }

        // camera
        this.matter.world.setBounds(0, 0,width,height-100);
        this.cameras.main.setBounds(0, 0,width,height);
        
        // sus is collision variable
        var sus = this.matter.world.nextGroup(true);
        
        this.player = new Ferret(this, 500, height-400, 'ferret').setScale(-.25,.25).setCollisionGroup(sus);
        
        this.player.body.sleepThreshold = -1;
        this.floor2 = this.add.rectangle(width/2,height-50,width,100,0xdda15e);
        this.cameras.main.startFollow(this.player);

        //collision callback
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            console.log('collision')
        });
    }

    update() {

        this.player.update();
        if(this.playThud == true){
            this.sound.play('sfx_bump');
            this.playThud = false;
        }
    }

}
