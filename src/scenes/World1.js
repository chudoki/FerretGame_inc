class World1 extends Phaser.Scene {
    constructor () {
        super("world1Scene");
    }

    preload() {

        this.load.image('ferret', 'assets/sprites/ferret player.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platform', 'assets/sprites/platform.png');
        this.load.image('platformLg', 'assets/sprites/platformLg.png');
        this.load.atlas('sheet', 'assets/sprites/shapePack-0.png', 'assets/sprites/shapePack.json');
        this.load.audio('sfx_bump', 'assets/bump.wav');
        this.load.json("shapes", "assets/sprites/shapes.json");
        this.load.tilemapTiledJSON("map", "assets/tiledV1.json");
        this.load.image(
          "tiledV1",
          "assets/tiledV1.png"
        );
        this.load.spritesheet('ferretW', 'assets/ferretWalk.png', {frameWidth: 50, frameHeight: 22 });

    };

    create() {
        const shapes = this.cache.json.get("shapes");
        this.game_started = false;
        this.frames = 0;
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tiledV1");
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const bgLayer = map.createLayer("nullCollides", tileset, 0, 0);
        this.width = map.width*32;
        this.height = map.height*32;
       // for( let i = 200; i < this.width; i += 500){
            
            this.matter.add.sprite(0,128, 'sheet', 'block.png', {shape: shapes.block, restitution: .1, frictionAir: .01 }).setScale(.05,.05).setTint(99999);

      //  }
        groundLayer.setCollisionByProperty({ collides: true });
        bgLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(groundLayer);
        this.matter.world.convertTilemapLayer(bgLayer);

        this.playThud = false;
        this.exitTrigger = false;
        //background music
        this.bgm =this.sound.add('sunnyMorning',{loop: true, volume:0.3});
        this.bgm.play();

        // input keys
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //take in physics coordinates
        //const shapes = this.cache.json.get("shapes");

        //add balls
        
        // camera
        this.matter.world.setBounds(0, 0,this.width,this.height);
        this.cameras.main.setBounds(0, 0,this.width,this.height);
        //bodies
         
        var Bodies = Phaser.Physics.Matter.Matter.Bodies;
        var rect = Bodies.rectangle(0, 0, 50, 22);
       var rectangler = Bodies.rectangle(-30,0,14,10,{isSensor: true,label: 'grableft'});
       var rectanglel = Bodies.rectangle(30,0,14,10,{isSensor: true,label: 'grabright'});

        var rectangT = Bodies.rectangle(0, -16, 36,28, { isSensor: true, label: 'top' });
        var rectangB = Bodies.rectangle(0, 16, 36,28, { isSensor: true, label: 'bottom' });


        var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ rect,rectangler,rectanglel, rectangT, rectangB],
            inertia: Infinity
        });

        this.player = this.matter.add.sprite(0, 0, 'ferretW', this.frames);
        
        this.player.setExistingBody(compoundBody);

        this.player.body.sleepThreshold = -1;
        this.cameras.main.startFollow(this.player);
        //Pause control
        this.events.on('resume', (scene, data)=> {
            if (data){
               
                this.bgm.stop();
                this.scene.start('PauseScreen');
                this.scene.pause();
            }
        });
        //collision callback
        this.matter.world.on('collisionactive', function (event) {
            //  Loop through all of the collision pairs
           
            var pairs = event.pairs;
           
            for (var i = 0; i < pairs.length; i++)
            {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;
             //  console.log(bodyA);
                //  We only want sensor collisions
                if (pairs[i].isSensor)
                {
                    
                    var playerBody;
                    var blockBody;
                    if (bodyA.isSensor)
                    {
                        blockBody = bodyB;
                        playerBody = bodyA;
                    }
                    else if (bodyB.isSensor)
                    {
                        blockBody = bodyA;
                    
                        playerBody = bodyB;
                    }
                    else {
                        continue;
                    }
                    if (playerBody.label === 'bottom'){
                        //console.log("hullo"+canJump);
                        bottomlab= blockBody;
                        canJump = true;   
                    }
                    if(blockBody.label == 'Rectangle Body' || blockBody.label == 'Body'){
                        continue;
                    }
                    if (playerBody.label === 'grableft' && flipstat === false && blockBody != null ){
                        cangrabl = true;
                        bodylab = blockBody;
                    if(grabdown === true){
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
                    if (playerBody.label === 'grabright' && flipstat === true && blockBody != null){

                        cangrabr = true;
                        bodylab = blockBody;
                        
                    }
                
                    //  You can get to the Sprite via `gameObject` property
                    //var playerSprite = playerBody.gameObject;
                    //var blockSprite = blockBody.gameObject;
                }
            }
        });
    }

    update() {
        if(!this.game_started){
            this.player.y = 200;
            this.game_started = true;
        }
        if(Phaser.Input.Keyboard.JustDown(keyESC) ){
             this.scene.launch('PauseScreen');
             this.scene.pause();
        }
        //console.log(canJump)
      //  console.log(this.player.body.velocity.y+"one")
        if (Math.abs(this.player.body.velocity.y) >=1){
            canJump = false;
           // console.log(this.player.body.velocity.y+"one")
          //  canJump = true;
          //  console.log(canJump+"two")
        }
        
        if (this.cursors.left.isDown)
        {
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
            if(flipstat ===true && grabdown === false){
                
                this.player.flipX= true;
                
                flipstat =false;
              }
            if (this.cursors.up.isDown && canJump === true )
            {
                  this.player.setVelocityY(-12);
            }
        }
        else if (this.cursors.right.isDown)
        {  
            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key === 'idle') {
                this.anims.create({
                    key: "walk",
                    frameRate: 7,
                    frames: this.anims.generateFrameNumbers("ferretW", { start: 0, end: 5 }),
                    repeat: 0
                });
                this.player.play("walk");
            }
            
             if(flipstat ===false && grabdown === false){
               // console.log(this.player.flip+"amongus");
              this.player.flipX= false;
              flipstat =true;
            }
            this.player.setVelocityX(5);
            this.frames++;
            this.frames = this.frames%6;
            if (this.cursors.up.isDown && canJump === true )
            {
                  this.player.setVelocityY(-12);
            }
        }
        else
        {
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
    
        if (this.cursors.up.isDown && canJump === true )
        {
            this.player.setVelocityY(-12);
        }

        if(this.cursors.shift.isDown && ((cangrabl ===true && flipstat===false) || (cangrabr===true && flipstat===true)) && bodylab.gameObject!=null && bottomlab.gameObject!=bodylab.gameObject){
            
            console.log(flipstat +"b4")
            this.matter.body.setInertia(bodylab.gameObject.body,Infinity);
            console.log( +"4tr")
            
           //if(this.player.body.velocity) 
           bodylab.gameObject.setVelocityX(this.player.body.velocity.x);

           bodylab.gameObject.setVelocityY(this.player.body.velocity.y);
           
            grabdown = true;
        }
        if(this.cursors.shift.isUp && grabdown === true && bodylab.gameObject!=null ){
          //  console.log(bodylab.gameObject.body.inertia)
            this.matter.body.setInertia(bodylab.gameObject.body,3515736.4);
           // console.log(bodylab.gameObject.body.inertia +"bro")
            cangrabl = false;
            cangrabr = false;
            grabdown = false;
        }
       

        
    }
}