class Credits extends Phaser.Scene {
    preload(){
        this.load.image('menuButton', 'assets/buttons/testingButton.png');
       // this.load.image('bg', 'assets/bg.png');
        
        
       // this.load.image('instructionSheet', 'assets/howto.png');
    }
    constructor(){
       super("creditsScene");
    }

    create(){
        let CreditStyle = {
            fontFamily: 'FFFFORWA',
            fontSize: "16px",
            align: 'center',
        }
         this.credtext = [];
        this.credtext[0] = this.add.text(game.canvas.width/2, game.canvas.height/5.5, "Hunt for ", {
            fontFamily: 'FFFFORWA',
            fontSize: '16px',
            }).setOrigin(0.5,0);
         this.credtext[1] = this.add.text(game.canvas.width/2, game.canvas.height/3.3, "the Ferret's Treasure", {
            fontFamily: 'FFFFORWA',
            fontSize: '16px',
            }).setOrigin(0.5,0);
            this.credtext[2] = this.add.text(game.canvas.width/2, game.canvas.height/3.3+64, "A game by", CreditStyle).setOrigin(0.5);
            this.credtext[3] = this.add.text(game.canvas.width/2, game.canvas.height/3.3+128, "The BananaBois", CreditStyle).setOrigin(0.5);
       
            this.credtext[4] = this.add.text(game.canvas.width/2, game.canvas.height/3.3+172, "Programming / Assets", CreditStyle).setOrigin(0.5);
            this.credtext[5] = this.add.text(game.canvas.width/2, game.canvas.height/3.3+236, "Skyler Haataja", CreditStyle).setOrigin(0.5);
            this.credtext[6] = this.add.text(game.canvas.width/2, game.canvas.height/3.3+300, "Assets", CreditStyle).setOrigin(0.5);
            this.credtext[7] = this.add.text(game.canvas.width/2, game.canvas.height/3.3+364, "Marlene Lopez", CreditStyle).setOrigin(0.5);
            this.credtext[8] = this.add.text(game.canvas.width/2, game.canvas.height/3.3+428, "Programming", CreditStyle).setOrigin(0.5);
            this.credtext[9]= this.add.text(game.canvas.width/2, game.canvas.height/3.3+472, "Daniel Wild", CreditStyle).setOrigin(0.5);
            this.credtext[10] = this.add.text(game.canvas.width/2,game.canvas.width/3.3+536,"Thank You ").setOrigin(0.5);
            this.credtext[11] = this.add.text(game.canvas.width/2,game.canvas.width/3.3+570,"For Playing").setOrigin(0.5);
        this.exit = false;
        // KB input
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // buttons
        this.  credtext[12]= this.add.image(game.canvas.width/2, game.canvas.height/3.3+700, 'menuButton').setScale(.3);
        this.credtext[12].setInteractive();

    }

    update(){
       // this.background.tilePositionY += .2;
         
         for( let textinst in this.credtext){
           if(textinst == 12 && this.credtext[textinst].y <= game.canvas.height/2){
               continue;
           }
           else{
               this.credtext[textinst].y-=.2;
           }

         }
         

       
        this.credtext[12].on("pointerdown", () => {this.exit = true;});

        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.exit){
            this.scene.start('Menu');
            
            this.scene.stop();
            
        }
    }

}