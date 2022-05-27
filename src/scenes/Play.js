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
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //take in physics coordinates
        const shapes = this.cache.json.get("shapes");

        //add balls
        for( let i = 200; i < width; i += 250){
            
            this.matter.add.sprite(i,height-800, 'sheet', 'circle.png', {shape: shapes.circle, restitution: 1, frictionAir: .01 }).setScale(.5,.5).setDensity(.0001).setTint(99999);

        }
        
        // camera
        this.matter.world.setBounds(0, 0,width,height-100);
        this.cameras.main.setBounds(0, 0,width,height);
        //bodies
        var Bodies = Phaser.Physics.Matter.Matter.Bodies;
        var rect = Bodies.rectangle(0, 0, 32, 32);
        var circleA = Bodies.circle(-70, 0, 24, { isSensor: true, label: 'left' });
        var circleB = Bodies.circle(70, 0, 24, { isSensor: true, label: 'right' });
        var circleC = Bodies.circle(0, -70, 24, { isSensor: true, label: 'top' });
        var circleD = Bodies.circle(0, 70, 24, { isSensor: true, label: 'bottom' });

        var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ rect, circleA, circleB, circleC, circleD ],
            inertia: Infinity
        });

        this.player = this.matter.add.sprite(0, 0, 'ferret').setScale(.1);
        this.player.setExistingBody(compoundBody);
        this.player.setPosition(100, 300);
        
        this.player.body.sleepThreshold = -1;
        this.floor2 = this.add.rectangle(width/2,height-50,width,100,0xdda15e);
        this.cameras.main.startFollow(this.player);

        //collision callback
        this.matter.world.on('collisionstart', function (event) {
            //  Loop through all of the collision pairs
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++)
            {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                //  We only want sensor collisions
                if (pairs[i].isSensor)
                {
                    var playerBody;

                    if (bodyA.isSensor)
                    {
                        thisplayerBody = bodyA;
                    }
                    else if (bodyB.isSensor)
                    {
                        playerBody = bodyB;
                    }

                    //  You can get to the Sprite via `gameObject` property
                    //var playerSprite = playerBody.gameObject;
                    //var blockSprite = blockBody.gameObject;
                }
            }
        });
    }

    update() {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-10);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(10);
        }
        else
        {
            this.player.setVelocityX(0);
        }
    
        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-10);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(10);
        }
    }
}
