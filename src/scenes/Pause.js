class Pause extends Phaser.Scene {
    preload(){
        this.load.image('playButton', 'assets/buttons/levelsButton.png');
        this.load.image('menuButton', 'assets/buttons/testingButton.png');
    }
    constructor(){
       super("PauseScreen");
    }

    create(){
        
        this.start = false;
        this.exit = false;
        // KB input
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // "Paused" text
        let PauseStyle = {
            fontFamily: 'KarmaticArcade',
            fontSize: "80px",
            align: 'center',
        }
        this.pauseText = this.add.text(game.canvas.width/2, game.canvas.height/3, "PAUSED", PauseStyle).setOrigin(0.5);
        // buttons
        this.playButton = this.add.image(game.canvas.width/2, game.canvas.height/2, 'playButton').setScale(.5);
        this.playButton.setInteractive();
        this.menuButton = this.add.image(game.canvas.width/2, game.canvas.height/2+this.playButton.height, 'menuButton').setScale(.5);
        this.menuButton.setInteractive();
    }

    update(){
        this.playButton.on("pointerdown", () => {this.start = true;});
        this.menuButton.on("pointerdown", () => {this.exit = true;});
        
        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.start){
            // this.scene.stop()
            
            this.scene.resume('playScene');
            this.start = false;
            //this.scene.switch('playScene')
            this.scene.stop();
            
            //this.scene.launch('playScene');
            //this.scene.stop();
                        
        }
        if (this.exit){
            // this.scene.stop()
            this.scene.resume('playScene', {exitTrigger: true});
            //this.scene.switch('playScene')
            this.exit = false;
            this.scene.stop();
            //this.scene.launch('playScene');
            //this.scene.stop();
            
        }
    }

}