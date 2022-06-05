class Food extends Phaser.Physics.Matter.Sprite {
    constructor(scene,x,y,texture,frame){
        super(scene.matter.world,x,y,texture,frame);
        scene.add.existing(this);
        this.setStatic(true);
        //this.setBody({label:'foodbit'});
        
    }
    create(){
    }
}