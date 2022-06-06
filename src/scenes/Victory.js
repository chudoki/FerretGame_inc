class Victory extends Phaser.Scene {
    constructor() {
        super("VictoryScene");
    }
    preload() {
        // this.load.image('bg', 'assets/bg.png');
        //this.load.image('sussybaka', 'assets/amogus.png');
        this.load.image('egbg', 'assets/EndgameBg.png');
    }

    create() {
        this.clickcheck = 0;
        this.vischeck = 0;
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.Textstyle = {
            fontFamily: 'FFFFORWA',
            fontSize: "16px",
            align: 'left',
        }
        let Textstyle2 = {
            fontFamily: 'FFFFORWA',
            fontSize: "22px",
            align: 'center',
        }
        this.bg = this.add.image(0,0,'egbg').setOrigin(0, 0);
        
        this.exit = false;
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // rank calc
        let rank;
        if (score / 22 <= .3)
            rank = 'F';
        if (score / 22 >= .4)
            rank = 'D';
        if (score / 22 >= .6)
            rank = 'C';
        if (score / 22 >= .8)
            rank = 'B';
        if (score / 22 >= .9)
            rank = 'A';
        if (score / 22 === 1)
            rank = 'S++';
            
        this.bg.setInteractive();
        this.toy = this.add.image(game.canvas.width / 4, game.canvas.height / 2, 'Toy', 0).setScale(4);
        this.player = this.add.sprite(game.canvas.width / 4, game.canvas.height / 1.5 +10, 'ferretW', 0).setScale(4);
        
        this.timedEvent2 = this.time.addEvent({ delay: 500, callback: this.toggleVisibility, callbackScope: this });

        this.add.text(game.canvas.width*1/2, game.canvas.height / 2 - 128, "Collectibles:", Textstyle2);
        this.add.text(game.canvas.width*1/2 , game.canvas.height / 2 - 68, score + "/22 \n"+Math.round((score / 20) * 100) + " % Completed\nRating . . . . . . . "+rank, this.Textstyle);
        this.anims.create({
            key: "idle",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("ferretW", { start: 0, end: 1 }),
            repeat: -1
        });


        // camera fade out done
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            console.log("hey");
            this.scene.start('creditsScene');
            this.scene.stop();
        });
        
        endgame = null;

    }

    update() {
        if (!this.player.anims.isPlaying){
            this.player.play("idle");
        }

        this.bg.on("pointerdown", () => { this.exit = true; });
        if(Phaser.Input.Keyboard.JustDown(keyESC2)) this.exit = true;

        if (!this.clickcheck && this.exit) {
            this.clickcheck = 1;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        }
    }
    toggleVisibility(){
        if(this.vischeck === 0){
            this.creditsText = this.add.text(game.canvas.width * 1/8 , game.canvas.height*5/6, "Click anywhere or press ESC key to play credits...", this.Textstyle);
            this.vischeck = 1;
            this.timedEvent2 = this.time.addEvent({ delay: 600, callback: this.toggleVisibility, callbackScope: this });
        }
        else{
            this.creditsText.destroy();
            this.vischeck = 0;
            this.timedEvent2 = this.time.addEvent({ delay: 400, callback: this.toggleVisibility, callbackScope: this });
        }
        
    }

}