class Ferret extends Phaser.Physics.Matter.Sprite { 
    constructor (scene,x,y,texture,frame){
        super(scene.matter.world,x,y,texture,frame);
        scene.add.existing(this);
        
        this.playerSpeed = 8;
    }
    create(){
        

        this.setFriction(0.05);
        this.setFrictionAir(0.0005);
        this.setBounce(0.9);
    }
    update(){
        
        if(keyLEFT.isDown || keyA.isDown){
            this.setVelocityX(-this.playerSpeed);
        }
        if(keyRIGHT.isDown || keyD.isDown){
            this.setVelocityX(this.playerSpeed);
        }
        if(keyUP.isDown || keyW.isDown){
            this.setVelocityY(-this.playerSpeed*2);
        }
        this.setAngle(0);
    }
    move(x, y){
        if (y > 300)
            {
                this.setVelocity(0, -10);
            }
            else if (x < 400)
            {
                this.setVelocityX(-8);
            }
            else
            {
                this.setVelocityX(8);
            }
    }
}