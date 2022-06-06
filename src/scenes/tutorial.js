class tutorial extends Phaser.Scene {
    preload() {
        this.load.image('menuButton', 'assets/buttons/HT_MenuButton.png');
        this.load.image('HowToBg', 'assets/HowToBg.png');

    }
    constructor() {
        super("tutorialScene");
    }

    create() {


        this.exit = false;
        this.startgame = false;
        // KB input
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // buttons
        this.add.image(0,0, 'HowToBg').setOrigin(0);
        this.menuButton = this.add.image(game.canvas.width - 170, game.canvas.height - 36, 'menuButton').setOrigin(0);
        this.menuButton.setInteractive();
    }

    update() {
        // this.background.tilePositionY += .2;
        this.menuButton.on("pointerdown", () => { this.exit = true; });

        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.exit) {
            this.scene.start('Menu');
            this.scene.stop();
        }

    }

}