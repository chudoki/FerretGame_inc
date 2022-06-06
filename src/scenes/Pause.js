class Pause extends Phaser.Scene {
    preload(){
        this.load.image('playButton', 'assets/buttons/playButton.png');
        this.load.image('menuButton', 'assets/buttons/menuButton.png');
        this.load.image('PausedBanner', 'assets/PausedBanner.png');
    }
    constructor(){
       super("PauseScreen");
    }

    create(){
        
        this.start = false;
        this.exit = false;
       
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // "Paused" image
        this.pauseText = this.add.image(640/2,360/3, 'PausedBanner').setOrigin(0.5);
        // buttons
        this.playButton = this.add.image(this.pauseText.x-this.pauseText.width/2+62, this.pauseText.y+62, 'playButton');
        this.playButton.setInteractive();
        this.menuButton = this.add.image(this.pauseText.x+this.pauseText.width/2-62, this.pauseText.y+62, 'menuButton');
        this.menuButton.setInteractive();
    }

    update(){
        this.playButton.on("pointerdown", () => {this.start = true;});
        this.menuButton.on("pointerdown", () => {this.exit = true;});
        
        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.start){
            // this.scene.stop()
            
            this.scene.resume('world1Scene');
            this.start = false;
            //this.scene.switch('playScene')
            this.scene.stop();
            
            //this.scene.launch('playScene');
            //this.scene.stop();
                        
        }
        if (this.exit){
            // this.scene.stop()
            this.scene.resume('world1Scene', {exitTrigger: true});
            //this.scene.switch('playScene')
            this.exit = false;
            this.scene.stop();
            //this.scene.launch('playScene');
            //this.scene.stop();
            
        }
    }

}