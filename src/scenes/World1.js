class World1 extends Phaser.Scene {
    constructor() {
        super("world1Scene");
    }

    create() {

        // local variables
        this.startingPos = { x: 2 * 32, y: 7 * 32 };
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        score = 0;
        this.soundp1 = true;
        this.soundp2 = true;
        this.soundp3 = true;
        this.soundp4 = true;
        this.soundp5 = true;
        this.game_started = false;
        this.frames = 0;
        this.grabjoint = [];

        let scoreConfig = {
            fontFamily: 'FFFFORWA',
            fontSize: '16px',
            color: '#ffffff',
            align: 'right',
            backgroundColor: '#31222c',
            padding: {
                top: 5,
                bottom: 5,
                right: 10,
            },
            fixedWidth: 115,
        }


        //take in physics coordinates
        const shapes = this.cache.json.get("shapes");

        // first set of layers for tilesheets
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset");
        const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
        const itemLayer = map.createLayer("Item layer", tileset, 0, 0);
        layer1.setCollisionByProperty({ collides: true });
        itemLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(itemLayer);
        const layer3 = map.createLayer("Tile Layer 3", tileset, 0, 0);
        layer3.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer3);

        //background music
        this.bgm = this.sound.add('sunnyMorning', { loop: true, volume: 0.1 });
        this.gatesound = this.sound.add('gateServo', { loop: false, volume: 0.8 });
        if (bgmOn == false) {
            this.bgm.play();
            bgmOn = true;
        }

        // input keys
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors = this.input.keyboard.createCursorKeys();

        // width and height data
        this.width = map.width * 32;
        this.height = map.height * 32;
        // camera and world bounds
        this.matter.world.setBounds(0, 0, this.width, this.height);
        this.cameras.main.setBounds(0, 0, this.width, this.height);
        this.cameras.main.setBackgroundColor('#31222c');


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

        // The missing treasure/toy that player is looking to find
        this.toy = new Toy(this, 2 * 32, 60 * 32, 'Toy', 0)
        Phaser.Physics.Matter.Matter.Body.set(this.toy.body,
            { label: ('toy'), inertia: Infinity, Static: true });



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
        this.matter.add.sprite(1.5 * 32, 15 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(2.5 * 32, 15 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(3.5 * 32, 15 * 32, 'sheet', 'bBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(4.5 * 32, 15 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(5.5 * 32, 15 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(6.5 * 32, 15 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(7.5 * 32, 15 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(8.5 * 32, 15 * 32, 'sheet', 'bBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(3 * 32, 16 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(4 * 32, 16 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(5 * 32, 16 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(6 * 32, 16 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(7 * 32, 16 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(4 * 32, 17 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(5 * 32, 17 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(6 * 32, 17 * 32, 'sheet', 'gBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(4.5 * 32, 18 * 32, 'sheet', 'bBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(5.5 * 32, 18 * 32, 'sheet', 'oBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });
        this.matter.add.sprite(6.5 * 32, 18 * 32, 'sheet', 'pBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.01 });

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
        this.button5 = new Button(this, 16 * 32 + 16, 58 * 32 - 5, 'orangeButton', 0, { name: 'button5' }).setStatic(true);
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
        this.plat5 = new Platform(this, 37 * 32 + 16, 50 * 32 + 12, 'sheet', 'greenGate.png', { name: 'plat5' }).setStatic(true);
        Phaser.Physics.Matter.Matter.Body.set(this.plat5.body, { label: ('plat5'), inertia: Infinity, Static: true });
        this.plat6 = new Platform(this, 6 * 32 + 16, 59 * 32 + 12, 'orangeGate', 0, { name: 'plat6' }).setStatic(true).setAngle(90);
        Phaser.Physics.Matter.Matter.Body.set(this.plat6.body, { label: ('plat6'), inertia: Infinity, Static: true });

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.launch('VictoryScene')
            this.scene.stop()
        });

        // event for pausing scene
        this.events.on('resume', (scene, data) => {
            if (data) {
                this.bgm.stop();
                this.scene.start('Menu');
            }
        });

        // collision callback
        this.matter.world.on('collisionactive', function (event) {
            //  Loop through all of the collision pairs
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++) {

                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;
                if (bodyA.isSensor === false && bodyB.isSensor === false) {
                    if (bodyA.label != 'player' && bodyB.label != 'player') {
                        if (bodyA.label === 'button5' || bodyB.label === 'button5') {
                            butpres5 = true;
                        }
                        if (bodyA.label === 'button4' || bodyB.label === 'button4') {
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

                //  We only want sensor collisions
                if (pairs[i].isSensor) {

                    var playerBody;
                    var blockBody;

                    if (bodyA.isSensor) {
                        blockBody = bodyB;
                        playerBody = bodyA;
                    }
                    else if (bodyB.isSensor) {
                        blockBody = bodyA;
                        playerBody = bodyB;
                    }
                    else {
                        continue;
                    }
                    if (blockBody.label === 'toy' && endgame == null) {
                        endgame = true;
                    }
                    if (playerBody.label === 'bottom') {
                        bottomlab = blockBody;
                        canJump = true;
                    }
                    if (blockBody.label === 'foodbit' && playerBody.label != 'top') {
                        blockBody.gameObject.destroy();
                        score++;

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
                }
            }
        });

        // topmost layers
        const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);
        layer2.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer2);

        // scoreboard tracks number of collectibles
        this.scoreboard = this.add.text(0, 0, 0 + "/22", scoreConfig).setScrollFactor(0);
        this.scoreboardIcon = this.add.image(25, 20, 'Food', 0).setScrollFactor(0).setOrigin(0.5, 0.5);
    }

    update() {
        // parralax bg logic
        if (this.player.x > 320 + this.player.width && this.player.x < this.width - 360 + this.player.width) {
            this.bg.x = -311 + (this.player.x) * .8445;
        }
        if (this.player.y > 180 + this.player.height && this.player.y < this.height - 180 - this.player.height) {
            this.bg.y = -180 + (this.player.y) * .7445;
        }
        this.scoreboard.text = score + "/22";
        if (endgame) {

            this.cameras.main.fadeOut(1000, 0, 0, 0);
            endgame = false;


        }
        if (!this.game_started) {
            this.player.x = this.startingPos.x;
            this.player.y = this.startingPos.y;
            this.game_started = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.launch('PauseScreen');
            this.scene.pause();
        }


        if (butpres5) {
            if (this.soundp5) {
                this.gatesound.play();
                this.soundp5 = false;
            }
            if (this.plat6.y < 56 * 32 + 12) {
                //  this.gatesound.stop();
                butpres5 = false;

            }
            else {
                this.plat6.y--;
            }
        }
        if (butpres4) {
            if (this.soundp4) {
                this.gatesound.play();
                this.soundp4 = false;
            }
            if (this.plat4.x > 13 * 32 + 16) {
                if (this.plat5.y < 52 * 32 + 12) {
                    this.plat5.y++;
                }
                this.plat4.x--;
            }
            else {
                butpres4 = false;
            }
        }
        if (butpres3) {
            if (this.soundp3) {
                this.gatesound.play();
                this.soundp3 = false;
            }
            if (this.plat3.x < 20 * 32 + 16) {
                butpres3 = false;
            }
            else {
                this.plat3.x--;
            }
        }
        if (butpres2) {
            if (this.soundp2) {
                this.gatesound.play();
                this.soundp2 = false;
            }

            if (this.plat2.x < 12 + 2 * 32) {
                butpres2 = false;
            }
            else {
                this.plat2.x--;
            }
        }
        if (butpres1) {
            if (this.soundp1) {
                this.gatesound.play();
                this.soundp1 = false;
            }
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

        if ((this.cursors.up.isDown || this.cursors.space.isDown) && canJump === true) {
            this.player.setVelocityY(-14);
            canJump = false;
        }
        if (Math.abs(this.player.body.velocity.y) >= 1) {
            canJump = false;
        }

        if (this.cursors.shift.isDown && ((cangrabl === true && flipstat === false) || (cangrabr === true && flipstat === true)) && bodylab.gameObject != null && bottomlab.gameObject != bodylab.gameObject) {


            this.matter.body.setInertia(bodylab.gameObject.body, Infinity);

            bodylab.gameObject.setVelocityX(this.player.body.velocity.x);

            bodylab.gameObject.setVelocityY(this.player.body.velocity.y);

            grabdown = true;
        }

        if (this.cursors.shift.isUp && grabdown === true) {
            this.matter.body.setInertia(bodylab.gameObject.body, 73600.4);

            cangrabl = false;
            cangrabr = false;
            grabdown = false;
        }



    }
}