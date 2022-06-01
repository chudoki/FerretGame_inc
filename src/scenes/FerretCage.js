class FerretCage extends Phaser.Scene {
    preload(){
        this.load.image('menuButton', 'assets/buttons/testingButton.png');
       // this.load.image('bg', 'assets/bg.png');
        
        
       // this.load.image('instructionSheet', 'assets/howto.png');
    }
    constructor(){
       super("FerretCageScene");
    }

    create(){
        
      
        this.exit = false;
        // KB input
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // buttons
        this.menuButton = this.add.image(game.canvas.width/2, game.canvas.height-70, 'menuButton').setScale(1.5);
        this.menuButton.setInteractive();
    }

    update(){
       // this.background.tilePositionY += .2;
        this.menuButton.on("pointerdown", () => {this.exit = true;});

        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.exit){
            this.scene.start('Menu');
            this.scene.stop();
            
        }
    }

}