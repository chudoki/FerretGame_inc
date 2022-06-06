
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 360,
    scene: [Menu,tutorial,World1,Credits,Pause,Victory],
    physics: {
        default: 'matter',
        matter: {
            gravity: {x: 0, y: 3},
            //debug: true,
            enableSleeping: true,
            setBounds: {
                left: true,
                right: true,
                up: false,
                down: false,
            }
        },
    },
    scale: {

        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        zoom: 2,  // Size of game canvas = game size * zoom
    },
    pixelArt: true,
    autoRound: false,
    autoCenter: Phaser.Scale.Center,
}
let game = new Phaser.Game(config);
//let keyF,keyR,keyLEFT,keyRIGHT;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize /3 ;
let keyDOWN,keyUP,keyLEFT,keyRIGHT,keyESC,keyESC2,keyW,keyS,keyA,keyD,keySHIFT;
let player;
let canJump = false;
let cangrabl = false;
let cangrabr = false;
let flipstat = false;
let grabdown = false;
let endgame;
let bodylab,bottomlab;
let butpres1,butpres2,butpres3,butpres4, butpres5;
let score = 10;
let bgmOn = false;

 
