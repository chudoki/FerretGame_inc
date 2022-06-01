
let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
    scene: [Menu,Level1,FerretCage,Pause],
    physics: {
        default: 'matter',
        matter: {
            gravity: {x: 0, y: 3.5},
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
 
