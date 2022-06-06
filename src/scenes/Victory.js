class Victory extends Phaser.Scene {
    preload(){
        this.load.image('menuButton', 'assets/buttons/testingButton.png');
       // this.load.image('bg', 'assets/bg.png');
        
        
       // this.load.image('instructionSheet', 'assets/howto.png');
    }
    constructor(){
       super("VictoryScene");
    }

    create(){
        
        let Textstyle = {
            fontFamily: 'FFFFORWA',
            fontSize: "16px",
            align: 'center',
        }
        this.exit = false;
        // KB input
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // buttons
        let rank;
        this.menuButton = this.add.image(game.canvas.width/2, game.canvas.height/2+270, 'menuButton').setScale(.3);
        this.menuButton.setInteractive();
        this.add.text(game.canvas.width/2, game.canvas.height/2-128,score+"/x",Textstyle);
                                                              //that onehundred right below should be replaced by max numb of collectables
        this.add.text(game.canvas.width/2, game.canvas.height/2-64,(score/100)*100 +" % Completed",Textstyle);
        if(score/100 <=.3){
             rank = 'F';
        }
        if(score/100 >=.4){
            rank = 'D';
       }
       if(score/100 >=.6){
        rank = 'C';
      }
     if(score/100 >=.8){
    rank = 'B';
    }
    if(score/100 >=.9){
        rank = 'A';
        }
        if(score/100 ===1){
            rank = 'S++';
            }
        this.add.text(game.canvas.width/2, game.canvas.height/2,rank,Textstyle)

        
    }

    update(){
       // this.background.tilePositionY += .2;
        this.menuButton.on("pointerdown", () => {this.exit = true;});

        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.exit){
            this.scene.start('creditsScene');
            this.scene.stop();
            
        }
    }

}