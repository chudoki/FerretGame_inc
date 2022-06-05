
let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 1080,
    scene: [Menu,Level1,tutorial,World1,Credits,Pause],
    physics: {
        default: 'matter',
        matter: {
            gravity: {x: 0, y: 3},
            debug: true,
            fps: 10,
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

        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        zoom: 1.5,  // Size of game canvas = game size * zoom
    },
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
let endgame = false;
let bodylab,bottomlab;
let butpres1,butpres2,butpres3,butpres4;
 
 
