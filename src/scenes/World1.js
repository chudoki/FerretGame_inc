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

    };

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tiledV1");
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const bgLayer = map.createLayer("nullCollides", tileset, 0, 0);
        this.width = map.width*64;
        this.height = map.heigh*64;

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
        const shapes = this.cache.json.get("shapes");

        //add balls
        
        // camera
        this.matter.world.setBounds(0, 0,this.width,this.height-100);
        this.cameras.main.setBounds(0, 0,this.width,this.height);
        //bodies
         
        var Bodies = Phaser.Physics.Matter.Matter.Bodies;
        var rect = Bodies.rectangle(0, 0, 100, 40);
        var circleA = Bodies.circle(-70, 0, 24, { isSensor: true, label: 'left' });
        var circleB = Bodies.circle(70, 0, 24, { isSensor: true, label: 'right' });
       var rectangler = Bodies.rectangle(-70,0,20,10,{isSensor: true,label: 'grableft'});
       var rectanglel = Bodies.rectangle(70,0,20,10,{isSensor: true,label: 'grabright'});

        var circleC = Bodies.rectangle(0, -20, 60,2, { isSensor: true, label: 'top' });
        var circleD = Bodies.rectangle(0, 20, 60,2, { isSensor: true, label: 'bottom' });


        var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ rect, circleA,circleB,rectangler,rectanglel, circleC, circleD],
            inertia: Infinity
        });

        this.player = this.matter.add.sprite(0, 0, 'ferret').setScale(.1);
        this.player.setExistingBody(compoundBody);

        this.player.body.sleepThreshold = -1;
        this.cameras.main.startFollow(this.player);
        //Pause control
        this.events.on('resume', (scene, data)=> {
            if (data){
               
                this.bgm.stop();
                this.scene.start('Menu');
            }
        });
        //collision callback
        this.matter.world.on('collisionactive', function (event) {
            //  Loop through all of the collision pairs
           // console.log("hullo");
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
                    if(((playerBody.label === 'grableft') || (playerBody.label === 'grabright')) && console.log(blockBody.label=='Rectangle Body')){
                        continue;
                    };
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
            this.player.setVelocityX(-10);
            if(flipstat ===true && grabdown === false){
                
                this.player.flipX= false;
                
                flipstat =false;
              }
        }
        else if (this.cursors.right.isDown)
        {  
             if(flipstat ===false && grabdown === false){
               // console.log(this.player.flip+"amongus");
              this.player.flipX= true;
              flipstat =true;
            }
            this.player.setVelocityX(10);
        }
        else
        {
            this.player.setVelocityX(0);
        }
    
        if (this.cursors.up.isDown && canJump === true )
        {
            this.player.setVelocityY(-20);
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
