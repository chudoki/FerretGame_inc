class Ferret extends Phaser.Physics.Matter.Sprite { 
    constructor (scene,x,y,texture,frame){
        super(scene.matter.world,x,y,texture,frame);
        scene.add.existing(this);
        
        this.playerSpeed = 20;
        this.isflipped = false;
        this.isflipped2 = false;
    }
    create(){
        

        this.setFriction(0.05);
        this.setFrictionAir(0.0005);
        this.setBounce(0.9);
    }
    update(){
        
        if(keyLEFT.isDown || keyA.isDown){
            this.setVelocityX(-this.playerSpeed);
            if (!this.isflipped){
                this.flipX = true;
                this.isflipped = true;
            }
            if(this.isflipped2){
                
                this.isflipped = false;
                this.flipX = false;
            }
        }
        if((keyRIGHT.isDown || keyD.isDown)){
            this.setVelocityX(this.playerSpeed);
            if (this.isflipped){
                this.flipX = false;
                this.isflipped = false;
            }
            if(this.isflipped2){
                
                this.isflipped = false;
                this.flipX = true;
            }
        }
        if((keyUP.isDown || keyW.isDown) ){
            this.setVelocityY(-this.playerSpeed*1);
        }
        //console.log(this.body.angle +"\n" + this.isflipped);
        if (!this.isflipped2 && (Math.abs(this.body.angle/Math.PI)%2 > 0.5 && Math.abs(this.body.angle/Math.PI)%2 < 1.5)){
            this.flipY=true;
            this.isflipped = true;
            this.isflipped2 = true;
        }
        if (this.isflipped2 && ((Math.abs(this.body.angle/Math.PI)%2 < 0.5  || Math.abs(this.body.angle/Math.PI)%2 > 1.5))){
            this.flipY=false;
            this.isflipped2 = false;
        }
    }
}