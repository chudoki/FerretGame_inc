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
        this.matter.world.setBounds(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);
        
       var sus = this.matter.world.nextGroup(true);
        
        this.player = new Ferret(this, 400, 100, 'ferret').setScale(.15,.15).setCollisionGroup(sus);
        this.player.body.sleepThreshold = -1;
        this.player2 = new Ferret(this, 600, 100, 'ferret').setScale(.15,.15).setCollisionGroup(sus);
        this.player2.body.sleepThreshold = -1;
        this.restov = this.matter.add.stack(300,50,5,1,0,0,function(x,y){
            return Phaser.Physics.Matter.Matter.Bodies.rectangle(x-20,y,100,75,{
                collisionFilter: {group: sus },
                chamfer: 5,
                density: 0.0005,
                frictionAir: 0.05
            });
        });
     // Phaser.Physics.Matter.Matter.Composite.add(this.restov,this.player.body);

        this.matter.add.chain(this.restov,1,0,0,0,{
            stiffness: 1,
            angularStiffness: .8,
            length:0,
        });
        this.matter.add.joint(this.player,
            Phaser.Physics.Matter.Matter.Composite.allBodies(this.restov)[0],0,1,{angularStiffness: 10});
            this.matter.add.joint(this.player2,
                Phaser.Physics.Matter.Matter.Composite.allBodies(this.restov)[4],0,1,{angularStiffness: 10});
        this.P1 = new Platform(this, 400, 700, 'platform', null).setStatic(true).setFriction(2);
        this.P2 = new Platform(this, 1500, 400, 'platform', null).setStatic(true).setFriction(2);
        this.P2 = new Platform(this, 1100, 800, 'platformLg', null).setStatic(true).setFriction(2);
        this.cameras.main.startFollow(this.player);

    }

    update() {
        
        this.player.update();
    }

}