class World1 extends Phaser.Scene {
    constructor() {
        super("world1Scene");
    }

    preload() {

        this.load.image('ferret', 'assets/sprites/ferret player.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.atlas('sheet', 'assets/atlases/matterObjects-0.png', 'assets/atlases/matterObjects.json');
        this.load.image('orangeButton', 'assets/sprites/orangeButton.png');
        this.load.image('orangeGate', 'assets/sprites/orangeGate.png');
        this.load.audio('sfx_bump', 'assets/bump.wav');
        this.load.json("shapes", "assets/physicsObjects.json");
        this.load.tilemapTiledJSON("map", "assets/tiledV2.json");
        this.load.image(
            "tileset",
            "assets/tileset.png"
        );
        this.load.spritesheet('tilesheet', "assets/tileset.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('ferretW', 'assets/ferretWalk.png', { frameWidth: 50, frameHeight: 22 });

    };

    create() {
        score = 0;
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#FF0000',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }



        const shapes = this.cache.json.get("shapes");
        this.game_started = false;
        this.frames = 0;
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset");
        const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
        const itemLayer = map.createLayer("Item layer", tileset, 0, 0);

        this.width = map.width * 320;
        this.height = map.height * 320;
        this.grabjoint = [];

        
        //this.matter.add.sprite(29*32,9*32,'sheet','Button.png',{shape: shapes.Button, name:'button1'}).setStatic(true);

        layer1.setCollisionByProperty({ collides: true });
        itemLayer.setCollisionByProperty({ collides: true });

        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(itemLayer);

        this.playThud = false;
        this.exitTrigger = false;
        //background music
        this.bgm = this.sound.add('sunnyMorning', { loop: true, volume: 0.3 });
        this.bgm.play();

        // input keys
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors = this.input.keyboard.createCursorKeys();

        //take in physics coordinates
        //const shapes = this.cache.json.get("shapes");

        //add balls

        // camera
        this.matter.world.setBounds(0, 0, this.width, this.height);
        this.cameras.main.setBounds(0, 0, this.width, this.height);
        
        
        // initializes the food collectables
        this.foods = map.createFromObjects("Collectibles", {
            name: "food",
            key: "tilesheet",
            frame: 6,
            classType: Food
        });


        // creates collectable food collision bodies for detection and destruction
        this.foods.map((food) => {
            Phaser.Physics.Matter.Matter.Body.set(food.body, {
                label: 'foodbit'

            })
        });
        
        
        // missing toy which is the winning condition
        this.toy = new Toy(this, 0, 1000, 'sheet', 'Button.png')
        Phaser.Physics.Matter.Matter.Body.set(this.toy.body,{ label: ('toy'), inertia: Infinity, Static: true });

        // scoreboard tracks number of collectibles
        this.scoreboard = this.add.text(0, 0, 0 + "/x", scoreConfig).setScrollFactor(0);
        
        // player with multiple sensors on each side for collision detecting
        var Bodies = Phaser.Physics.Matter.Matter.Bodies;
        var rect = Bodies.rectangle(0, 0, 50, 22, { label: 'player' });
        var rectangleR = Bodies.rectangle(-30, 0, 14, 10, { isSensor: true, label: 'grableft' });
        var rectangleL = Bodies.rectangle(30, 0, 14, 10, { isSensor: true, label: 'grabright' });
        var rectangT = Bodies.rectangle(0, -16, 36, 28, { isSensor: true, label: 'top' });
        var rectangB = Bodies.rectangle(0, 16, 36, 28, { isSensor: true, label: 'bottom' });
        var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [rect, rectangleR, rectangleL, rectangT, rectangB],
            inertia: Infinity
        });
        this.player = this.matter.add.sprite(0, 0, 'ferretW', this.frames);
        this.player.setExistingBody(compoundBody);
        this.player.body.sleepThreshold = -1;

        // camera tracks player
        this.cameras.main.startFollow(this.player);
        
        
        // large set of balls for activating final button
        this.matter.add.sprite(1.5 * 32, 15 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(2.5 * 32, 15 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(3.5 * 32, 15 * 32, 'sheet', 'bBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(4.5 * 32, 15 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(5.5 * 32, 15 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(6.5 * 32, 15 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(7.5 * 32, 15 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(8.5 * 32, 15 * 32, 'sheet', 'bBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(3 * 32, 16 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(4 * 32, 16 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(5 * 32, 16 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(6 * 32, 16 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(7 * 32, 16 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(4 * 32, 17 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(5 * 32, 17 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(6 * 32, 17 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(4.5 * 32, 18 * 32, 'sheet', 'bBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(5.5 * 32, 18 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })
        this.matter.add.sprite(6.5 * 32, 18 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 })

        // creates boxes to touch buttons that trigger gates
        this.box1 = new Box(this, 34 * 32, 9 * 32, 'sheet', 'Box.png', { shape: shapes.Box, restitution: .1, frictionAir: .01, name: 'elburro' }).setTint(99999);
        Phaser.Physics.Matter.Matter.Body.set(this.box1.body, { label: ('Box') });
        this.box2 = new Box(this, 32 * 32 + 16, 23 * 32, 'sheet', 'redBox.png', { shape: shapes.Box, restitution: .1, frictionAir: .01, name: 'elburro' }).setTint(99999);
        Phaser.Physics.Matter.Matter.Body.set(this.box2.body, { label: ('Box') });
        this.box3 = new Box(this, 56 * 32, 18 * 32, 'sheet', 'blueBox.png', { shape: shapes.Box, restitution: .1, frictionAir: .01, name: 'elburro' }).setTint(99999);
        Phaser.Physics.Matter.Matter.Body.set(this.box3.body, { label: ('Box') });
        this.box4 = new Box(this, 16 * 32, 60 * 32, 'sheet', 'greenBox.png', { shape: shapes.Box, restitution: .1, frictionAir: .01, name: 'elburro' }).setTint(99999);
        Phaser.Physics.Matter.Matter.Body.set(this.box4.body, { label: ('Box') });

        // Buttons that need a Box to touch it to move gates (Platforms)
        this.button1 = new Button(this, 29 * 32, 10 * 32 - 5, 'sheet', 'Button.png', { name: 'button1' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.button1.body, { label: ('button1'), inertia: Infinity, Static: true });
        this.button2 = new Button(this, 22 * 32, 29 * 32 - 5, 'sheet', 'redButton.png', { name: 'button2' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.button2.body, { label: ('button2'), inertia: Infinity, Static: true });
        this.button3 = new Button(this, 29 * 32, 38 * 32 - 5, 'sheet', 'blueButton.png', { name: 'button3' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.button3.body, { label: ('button3'), inertia: Infinity, Static: true });
        this.button4 = new Button(this, 10 * 32, 69 * 32 - 5, 'sheet', 'greenButton.png', { name: 'button4' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.button4.body, { label: ('button4'), inertia: Infinity, Static: true });
        this.button5 = new Button(this, 16 * 32+16, 58 * 32 - 5, 'orangeButton', 0, { name: 'button5' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.button5.body, { label: ('button5'), inertia: Infinity, Static: true });
        

        // Gates (platforms) that move in response to a box pressing a button
        this.plat1 = new Platform(this, 37 * 32 + 28, 8 * 32 + 8, 'sheet', 'Gate.png', { name: 'plat1' }).setStatic(true).setAngle(90);
        Phaser.Physics.Matter.Matter.Body.set(this.plat1.body, { label: ('plat1'), inertia: Infinity, Static: true });
        this.plat2 = new Platform(this, 5 * 32 + 16, 19 * 32 + 16, 'sheet', 'redGate.png', { name: 'plat2' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.plat2.body, { label: ('plat2'), inertia: Infinity, Static: true });
        this.plat3 = new Platform(this, 23 * 32 + 16, 38 * 32 + 12, 'sheet', 'blueGate.png', { name: 'plat3' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.plat3.body, { label: ('plat3'), inertia: Infinity, Static: true });
        this.plat4 = new Platform(this, 16 * 32 + 16, 55 * 32 + 12, 'sheet', 'greenGate.png', { name: 'plat4' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.plat4.body, { label: ('plat4'), inertia: Infinity, Static: true });
        this.plat5 = new Platform(this, 37 * 32 + 16, 50 * 32+12, 'sheet', 'greenGate.png', { name: 'plat5' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.plat5.body, { label: ('plat5'), inertia: Infinity, Static: true });
        this.plat6 = new Platform(this, 6 * 32, 59 * 32 + 12, 'orangeGate', 0, { name: 'plat6' }).setStatic(true).setAngle(90);
        Phaser.Physics.Matter.Matter.Body.set(this.plat6.body, { label: ('plat6'), inertia: Infinity, Static: true });



        // event for pausing scene
        this.events.on('resume', (scene, data) => {
            if (data) {

                this.bgm.stop();
                this.scene.start('PauseScreen');
                this.scene.pause();
            }
        });

        //collision callback
        this.matter.world.on('collisionactive', function (event) {
            //  Loop through all of the collision pairs
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++) {

                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;
                if (bodyA.isSensor === false && bodyB.isSensor === false) {
                    if (bodyA.label != 'player' && bodyB.label != 'player') {
                        if (bodyA.label === 'button5' || bodyB.label === 'button5') {
                            console.log("HIIIII");
                            butpres5 = true;
                        }
                        if (bodyA.label === 'button4' || bodyB.label === 'button4') {
                            console.log("HIIIII4");
                            butpres4 = true;
                        }

                        if (bodyA.label === 'button3' || bodyB.label === 'button3') {
                            butpres3 = true;
                        }

                        if (bodyA.label === 'button2' || bodyB.label === 'button2') {
                            butpres2 = true;
                        }

                        if (bodyA.label === 'button1' || bodyB.label === 'button1') {
                            butpres1 = true;
                        }
                    }
                }
                //  console.log(bodyA);
                //  We only want sensor collisions
                if (pairs[i].isSensor) {

                    var playerBody;
                    var blockBody;

                    if (bodyA.isSensor) {
                        blockBody = bodyB;

                        //      console.log(blockBody.label);
                        playerBody = bodyA;
                    }
                    else if (bodyB.isSensor) {
                        blockBody = bodyA;

                        //  console.log(blockBody.label);
                        playerBody = bodyB;
                    }
                    else {
                        continue;
                    }
                    if (blockBody.label === 'toy') {
                        endgame = true;
                    }
                    if (playerBody.label === 'bottom') {
                        //console.log("hullo"+canJump);
                        bottomlab = blockBody;
                        canJump = true;
                    }
                    if (blockBody.label === 'foodbit' && playerBody.label != 'top') {
                        blockBody.gameObject.destroy();
                        score++;
                        console.log(score);

                    }
                    if (blockBody.label != 'Box') {
                        continue;
                    }
                    if (playerBody.label === 'grableft' && flipstat === false && blockBody != null) {
                        cangrabl = true;
                        bodylab = blockBody;
                    }
                    if (playerBody.label === 'grabright' && flipstat === true && blockBody != null) {

                        cangrabr = true;
                        bodylab = blockBody;

                    }

                    //  You can get to the Sprite via `gameObject` property
                    //var playerSprite = playerBody.gameObject;
                    //var blockSprite = blockBody.gameObject;
                }
            }
        });

        const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);
        layer2.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer2);
    }

    update() {
        this.scoreboard.text = score + "/x";
        if (endgame) {
            this.scene.launch('VictoryScene');
            this.scene.stop();
        }
        if (!this.game_started) {
            this.player.x = 64; 
            this.player.y = 200;
            this.game_started = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.launch('PauseScreen');
            this.scene.pause();
        }
        //console.log(canJump)
        //  console.log(this.player.body.velocity.y+"one")


        if (butpres5) {
            if (this.plat6.y < 56 * 32 + 12 ) {
                butpres5 = false;
            }
            else {
                this.plat6.y--;
            }
        }
        if (butpres4) {
            console.log("HIIIII2");
            if (this.plat4.x > 13 * 32 + 16) {
                if (this.plat5.y < 52 * 32+12){
                    this.plat5.y++;
                }
                this.plat4.x--;
            }
            else{
                butpres4 = false;
            }
        }
        if (butpres3) {
            if (this.plat3.x < 20 * 32 + 16) {
                butpres3 = false;
            }
            else {
                this.plat3.x--;
            }
        }
        if (butpres2) {
            console.log("amogus");
            if (this.plat2.x < 12 + 2 * 32) {
                butpres2 = false;
            }
            else {
                this.plat2.x--;
            }
        }
        console.log(this.plat1.x);
        if (butpres1) {
            if (this.plat1.y < 0 + 5 * 32) {
                butpres1 = false;
            }
            else {
                this.plat1.y--;
            }



        }
        if (this.cursors.left.isDown) {
            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key === 'idle') {
                this.anims.create({
                    key: "walk",
                    frameRate: 7,
                    frames: this.anims.generateFrameNumbers("ferretW", { start: 0, end: 5 }),
                    repeat: -1
                });
                this.player.play("walk");
            }
            else
                this.player.setVelocityX(-5);
            if (flipstat === true && grabdown === false) {

                this.player.flipX = true;

                flipstat = false;
            }
            if (this.cursors.up.isDown && canJump === true) {
                this.player.setVelocityY(-14);
            }
        }
        else if (this.cursors.right.isDown) {
            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key === 'idle') {
                this.anims.create({
                    key: "walk",
                    frameRate: 7,
                    frames: this.anims.generateFrameNumbers("ferretW", { start: 0, end: 5 }),
                    repeat: 0
                });
                this.player.play("walk");
            }

            if (flipstat === false && grabdown === false) {
                // console.log(this.player.flip+"amongus");
                this.player.flipX = false;
                flipstat = true;
            }
            this.player.setVelocityX(5);
            this.frames++;
            this.frames = this.frames % 6;
            if (this.cursors.up.isDown && canJump === true) {
                this.player.setVelocityY(-12);
            }
        }
        else {
            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key === 'walk') {
                this.player.setVelocityX(0);
                this.anims.create({
                    key: "idle",
                    frameRate: 2,
                    frames: this.anims.generateFrameNumbers("ferretW", { start: 0, end: 1 }),
                    repeat: 0
                });
                this.player.play("idle");
            }
        }

        if (this.cursors.up.isDown && canJump === true) {
            this.player.setVelocityY(-14);
            canJump = false;
        }
        if (Math.abs(this.player.body.velocity.y) >= 1) {
            canJump = false;
            // console.log(this.player.body.velocity.y+"one")
            //  canJump = true;
            //  console.log(canJump+"two")
        }

        if (this.cursors.shift.isDown && ((cangrabl === true && flipstat === false) || (cangrabr === true && flipstat === true)) && bodylab.gameObject != null && bottomlab.gameObject != bodylab.gameObject) {


            this.matter.body.setInertia(bodylab.gameObject.body, Infinity);

            // this.grabjoint.push( this.matter.add.joint(this.player.body,bodylab.gameObject.body,100,.2,{label:"kicked like a mule"}));
            // if(this.player.body.velocity) 
            bodylab.gameObject.setVelocityX(this.player.body.velocity.x);

            bodylab.gameObject.setVelocityY(this.player.body.velocity.y);

            grabdown = true;
        }

        if (this.cursors.shift.isUp && grabdown === true) {
            //  console.log(bodylab.gameObject.body.inertia)
            this.matter.body.setInertia(bodylab.gameObject.body, 73600.4);
            //  console.log(this.grabjoint[0].label +"bro");
            // this.matter.world.removeConstraint(this.grabjoint[0]);
            //this.grabjoint.pop();
            //console.log(this.grabjoint.label +"burro");
            //this.matter.world.destroy(this.grabjoint);

            cangrabl = false;
            cangrabr = false;
            grabdown = false;
        }



    }
}