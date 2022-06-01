class Menu extends Phaser.Scene {
    constructor () {
        super("Menu");
    }
        preload(){
           this.load.audio('sunnyMorning', 'assets/SunnyMorning.wav')
           this.load.image('playButton', 'assets/buttons/levelsButton.png');
           this.load.image('howToButton', 'assets/buttons/testingButton.png');
    
        }
        
        
        create(){
           // background
           this.game.backgroundColor = "#4488AA";
           // button
           this.button = this.add.image(game.canvas.width/2, game.canvas.height/1.9, 'playButton').setScale(.5);
           this.button.setInteractive();
           this.howButton = this.add.image(game.canvas.width/2, game.canvas.height/1.9 + this.button.height, 'howToButton').setScale(.5);
           this.howButton.setInteractive();
           // title
           this.add.text(game.canvas.width/2, game.canvas.height/5.5, "Hunt for ", {
              fontFamily: 'Arial',
              fontSize: '100px',
              }).setOrigin(0.5,0);
           this.add.text(game.canvas.width/2, game.canvas.height/3.3, "the Ferret's Treasure", {
              fontFamily: 'KarmaticArcade',
              fontSize: '80px',
              }).setOrigin(0.5,0);
           //this.add.rectangle()
           this.start = false;
           
           
           // other text on screen
           //
           // text configuration
           let textConfig = {
              fontFamily: 'Courier',
              fontSize: '28px',
              align: 'center',
              padding: {
                  top: 5,
                  bototm: 5,
              },
              fixedWidth: 0
           }
           // setting the center of text
           let centerX = game.config.width/2;
           let centerY = game.config.height/2;
           let textSpacer = 48;
     
           // credits line
           textConfig.fontSize= '25px';
           this.add.text(centerX, centerY + 7 * textSpacer, 'Game by Skyler Haataja, Marlene Lopez, and Daniel Wild', textConfig).setOrigin(0.5);
        }
        update(){
           if(this.start == true){
              this.scene.start('playScene');
              this.start = false;
           }
           if(this.howStart == true){
              this.scene.start('FerretCageScene');
              this.howStart = false;
           }
           this.button.on("pointerdown", () => {
              this.start = true;
           });
             
           this.howButton.on("pointerdown", () => {
              this.howStart = true;
           });
           
           
        }
     
     }