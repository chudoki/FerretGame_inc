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
        this.load.image('toy','assets/sprites/toy.png');
        this.load.json("shapes", "assets/sprites/shapes.json");

    }

    create() {
        let height = 1600;
        let width = 9000;
        
        
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
        for( let i = 200; i < width; i += 500){
            
            this.matter.add.sprite(i,height-800, 'sheet', 'triangle.png', {shape: shapes.triangle, restitution: .1, frictionAir: .01 }).setScale(.5,.5).setTint(99999);

        }
        
        // camera
        this.matter.world.setBounds(0, 0,width,height-100);
        this.cameras.main.setBounds(0, 0,width,height);
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
        this.player.setPosition(100, 300);
        this.troy = new Toy(this,1200,900,'toy',0);
        Phaser.Physics.Matter.Matter.Body.set( this.troy.body,
            { label :'toy'});
        this.player.body.sleepThreshold = -1;
        this.floor2 = this.add.rectangle(width/2,height-50,width,100,0xdda15e);
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
              // console.log(bodyA);
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
                    console.log("inlabel chce" +blockBody.label);
                    if(blockBody.label === 'toy')
                    {
                       // console.log("inlabel chce" +blockBody.label);
                        endgame = true;
                    } 
                    
                    if (playerBody.label === 'bottom')
                {
                           console.log("hullo"+canJump);
                           bottomlab= blockBody;
                         
                        canJump = true; 
                           
                }
                if (playerBody.label === 'grableft' && flipstat === false && blockBody != null ){
           
                    cangrabl = true;
                    bodylab = blockBody;

                    if(grabdown === true){
                        canJump=false;
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
                    if (playerBody.label === 'grabright' && flipstat === true && blockBody != null ){
                     
                        cangrabr = true;
                        bodylab = blockBody;
                        if(grabdown ===true){
                            canJump = false;
                        }
                        
                    }
                
                    //  You can get to the Sprite via `gameObject` property
                    //var playerSprite = playerBody.gameObject;
                    //var blockSprite = blockBody.gameObject;
                }
            }
        });
    }

    update() {
        if(endgame === true){
            this.bgm.stop();
            this.scene.launch('Menu');
            this.scene.stop()
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
            canJump = false;
            console.log(flipstat +"b4")
            this.matter.body.setInertia(bodylab.gameObject.body,Infinity);
            console.log( +"4tr")
            
           //if(this.player.body.velocity) 
           bodylab.gameObject.setVelocityX(this.player.body.velocity.x);
           //canJump = false;
          // bodylab.gameObject.setVelocityY(this.player.body.velocity.y);
           
            grabdown = true;
        }
        if(this.cursors.shift.isUp && grabdown === true && bodylab.gameObject!=null ){
          //  console.log(bodylab.gameObject.body.inertia)
          canJump=false;
            this.matter.body.setInertia(bodylab.gameObject.body,3515736.4);
           // console.log(bodylab.gameObject.body.inertia +"bro")
            cangrabl = false;
            cangrabr = false;
            grabdown = false;
        }
       

        
    }
}
