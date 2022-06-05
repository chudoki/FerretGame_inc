class World1 extends Phaser.Scene {
    constructor() {
        super("world1Scene");
    }

    preload() {

        this.load.image('ferret', 'assets/sprites/ferret player.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platformLg', 'assets/sprites/platformLg.png');
        this.load.atlas('sheet', 'assets/atlases/matterObjects-0.png', 'assets/atlases/matterObjects.json');
        this.load.audio('sfx_bump', 'assets/bump.wav');
        this.load.json("shapes", "assets/physicsObjects.json");
        this.load.tilemapTiledJSON("map", "assets/tiledV2.json");
        this.load.image(
            "tileset",
            "assets/tileset.png"
        );
        this.load.spritesheet('ferretW', 'assets/ferretWalk.png', { frameWidth: 50, frameHeight: 22 });

    };

    create() {




        const shapes = this.cache.json.get("shapes");
        this.game_started = false;
        this.frames = 0;
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset");
        const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
        const itemLayer = map.createLayer("Item layer", tileset, 0, 0);

        this.width = map.width * 32;
        this.height = map.height * 32;
        this.grabjoint = [];
        // for( let i = 200; i < this.width; i += 500){

        this.matter.add.sprite(34 * 32, 9 * 32, 'sheet', 'Box.png', { shape: shapes.Box, restitution: .1, frictionAir: .01, name: 'elburro' }).setTint(99999);
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
        //bodies

        var Bodies = Phaser.Physics.Matter.Matter.Bodies;
        var rect = Bodies.rectangle(0, 0, 50, 22, { label: 'player' });
        var rectangler = Bodies.rectangle(-30, 0, 14, 10, { isSensor: true, label: 'grableft' });
        var rectanglel = Bodies.rectangle(30, 0, 14, 10, { isSensor: true, label: 'grabright' });

        var rectangT = Bodies.rectangle(0, -16, 36, 28, { isSensor: true, label: 'top' });
        var rectangB = Bodies.rectangle(0, 16, 36, 28, { isSensor: true, label: 'bottom' });


        var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [rect, rectangler, rectanglel, rectangT, rectangB],
            inertia: Infinity
        });

        this.player = this.matter.add.sprite(0, 0, 'ferretW', this.frames);

        this.player.setExistingBody(compoundBody);

        this.player.body.sleepThreshold = -1;
        this.cameras.main.startFollow(this.player);

        this.ball1 = this.matter.add.sprite(3*32,15*32,'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball' });
        this.ball2 = this.matter.add.sprite(3*32,15*32,'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball' });

        this.button1 = this.matter.add.sprite(29 * 32, 10 * 32 - 5, 'sheet', 'Button.png', {name: 'button1' }).setStatic(true);
        // this.button2 =new Button (this,200,50,'block',0,{shape: shapes.Button, name:'button2'}).setStatic(true);
        // this.button3 = new Button (this,300,50,'block',0,{name:'button3'}).setStatic(true);
        // this.button4 = new Button (this,400,50,'block',0,{name:'button4'}).setStatic(true);







        Phaser.Physics.Matter.Matter.Body.set(this.button1.body,
            { shape: shapes.Button, label: ('button1'), inertia: Infinity, Static: true });

        // Phaser.Physics.Matter.Matter.Body.set( this.button2.body,
        //     { label :('button2'),inertia:Infinity,Static:true});

        //     Phaser.Physics.Matter.Matter.Body.set( this.button3.body,
        //         { label :('button3'),inertia:Infinity,Static:true});

        // Phaser.Physics.Matter.Matter.Body.set( this.button4.body,
        //     { label :('button4'),inertia:Infinity,Static:true});



        this.plat1 = new Platform( this, 5*32 +16, 19*32+16, 'sheet', 'Gate.png', {name: 'plat1' }).setStatic(true);
        

        // this.plat2 = new Platform(this, 200, 100, 'block', 0, { name: 'plat2' }).setStatic(true);
        // this.plat3 = new Platform(this, 200, 150, 'block', 0, { name: 'plat3' }).setStatic(true);
        // this.plat4 = new Platform(this, 200, 200, 'block', 0, { name: 'plat4' }).setStatic(true);
        //Pause control

        Phaser.Physics.Matter.Matter.Body.set(this.plat1.body,
            { shape: shapes.Gate, label: ('plat1'), inertia: Infinity, Static: true });

        // Phaser.Physics.Matter.Matter.Body.set(this.plat2.body,
        //     { label: ('plat2'), inertia: Infinity, Static: true });

        // Phaser.Physics.Matter.Matter.Body.set(this.plat3.body,
        //     { label: ('plat3'), inertia: Infinity, Static: true });

        // Phaser.Physics.Matter.Matter.Body.set(this.plat4.body,
        //     { label: ('plat4'), inertia: Infinity, Static: true });

        //this.plat1.on('pmove1',this.platmove);


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
                        if (bodyA.label === 'button4' || bodyB.label === 'button4') {
                            // bodyA.emit('pressed',this.plat4);
                            // console.log(bodyA);
                            butpres4 = true;
                        }

                        if (bodyA.label === 'button3' || bodyB.label === 'button3') {
                            // bodyA.emit('pressed',this.plat4);
                            // console.log(bodyA);
                            butpres3 = true;
                        }

                        if (bodyA.label === 'button2' || bodyB.label === 'button2') {
                            // bodyA.emit('pressed',this.plat4);
                            // console.log(bodyA);
                            butpres2 = true;
                        }

                        if (bodyA.label === 'button1' || bodyB.label === 'button1') {
                            // bodyA.emit('pressed',this.plat4);
                            // console.log(bodyA);
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

                        console.log(blockBody.label);
                        playerBody = bodyA;
                    }
                    else if (bodyB.isSensor) {
                        blockBody = bodyA;

                        console.log(blockBody.label);
                        playerBody = bodyB;
                    }
                    else {
                        continue;
                    }
                    if (playerBody.label === 'bottom') {
                        //console.log("hullo"+canJump);
                        bottomlab = blockBody;
                        canJump = true;
                    }
                    if (blockBody.label == 'Rectangle Body' || blockBody.label == 'Body') {
                        continue;
                    }
                    if (playerBody.label === 'grableft' && flipstat === false && blockBody != null) {
                        cangrabl = true;
                        bodylab = blockBody;
                        if (grabdown === true) {
                            //     console.log("ball vel"+blockBody.gameObject.body.velocity.x);
                            //     console.log("ball vel"+blockBody.gameObject.body.velocity.y);
                            //    // blockBody.gameObject.setVelocityX( playerBody.gameObject.body.velocity.x);
                            //     console.log("ball veldos"+blockBody.gameObject.body.velocity.x);
                            //     console.log("ball veldos"+blockBody.gameObject.body.velocity.y);
                            //   //  blockBody.gameObject.setVelocityY(blockBody,playerBody.velocity.y);
                            //     console.log("ball veltres"+blockBody.gameObject.body.velocity.x);
                            //     console.log("ball veltres"+blockBody.gameObject.body.velocity.y);
                        }
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
        if (!this.game_started) {
            this.player.y = 200;
            this.game_started = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.launch('PauseScreen');
            this.scene.pause();
        }
        //console.log(canJump)
        //  console.log(this.player.body.velocity.y+"one")
        if (Math.abs(this.player.body.velocity.y) >= 1) {
            canJump = false;
            // console.log(this.player.body.velocity.y+"one")
            //  canJump = true;
            //  console.log(canJump+"two")
        }

        if (butpres4) {
            // this.plat4.body.x++;
            // console.log(this.plat4.body.x);
            // this.plat4.x++;
        }
        if (butpres3) {
            console.log("amogus");
        }
        if (butpres2) {
            console.log("amogus");
        }
        console.log(this.plat1.x);
        if (butpres1) {
            if(this.plat1.x<0+this.plat1.width*0.8){
                butpres1=false;
            }
            else{
                console.log("amogus");
                this.plat1.body.x++;
                this.plat1.x--;
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
        }

        if (this.cursors.shift.isDown && ((cangrabl === true && flipstat === false) || (cangrabr === true && flipstat === true)) && bodylab.gameObject != null && bottomlab.gameObject != bodylab.gameObject) {

            console.log(flipstat + "b4")
            this.matter.body.setInertia(bodylab.gameObject.body, Infinity);
            console.log(+"4tr")
            // this.grabjoint.push( this.matter.add.joint(this.player.body,bodylab.gameObject.body,100,.2,{label:"kicked like a mule"}));
            // if(this.player.body.velocity) 
            bodylab.gameObject.setVelocityX(this.player.body.velocity.x);

            bodylab.gameObject.setVelocityY(this.player.body.velocity.y);

            grabdown = true;
        }

        if (this.cursors.shift.isUp && grabdown === true && bodylab.gameObject != null) {
            //  console.log(bodylab.gameObject.body.inertia)
            this.matter.body.setInertia(bodylab.gameObject.body, 3515736.4);
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