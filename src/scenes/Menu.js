class Menu extends Phaser.Scene {
   constructor() {
      super("Menu");
   }
   preload() {
      this.load.audio('sunnyMorning', 'assets/SunnyMorning.wav')
      this.load.audio('gateServo', 'assets/gateservo.wav');
      this.load.audio('eatsfx', 'assets/eatsfx.wav');
      this.load.audio('jumpsfx', 'assets/jumpsfx.wav');
      this.load.audio('slidesfx', 'assets/slidesfx.wav');
      this.load.image('startButton', 'assets/buttons/startButton.png');
      this.load.image('howToButton', 'assets/buttons/howToButton.png')
      //this.load.image('howToButton', 'assets/buttons/testingButton.png');
      this.load.image('menuBg', 'assets/menuBg.png');
      this.load.atlas('sheet', 'assets/atlases/matterObjects-0.png', 'assets/atlases/matterObjects.json');
      this.load.image('orangeButton', 'assets/sprites/orangeButton.png');
      this.load.image('orangeGate', 'assets/sprites/orangeGate.png');
      this.load.audio('sfx_bump', 'assets/bump.wav');
      this.load.json("shapes", "assets/physicsObjects.json");
      this.load.tilemapTiledJSON("map", "assets/tiledV2.json");
      this.load.image(
         "tileset",
        // scoreboard tracks number of collectibles
         "assets/tileset.png"
      );
      this.load.spritesheet('tilesheet', "assets/tileset.png", {
         frameWidth: 32,
         frameHeight: 32
      });
      this.load.spritesheet('ferretW', 'assets/ferretWalk.png', { frameWidth: 50, frameHeight: 22 });
      this.load.image('bg', 'assets/background.png');
      this.load.image('Toy', 'assets/Toy.png');
      this.load.image('Food', 'assets/food.png');
      this.load.image('banner', 'assets/ferretBanner.png');


   }


   create() {
      this.frames = 1;
      // creates floor
      this.matter.world.setBounds(-2000, -340, 4000, 642);
      
      // background
      this.bg = this.add.image(0, 0, 'menuBg').setOrigin(0, 0);

      //take in physics coordinates
      const shapes = this.cache.json.get("shapes");
      
      // ball that'll be bouncing across screen
      this.ball = this.matter.add.sprite(-1* 32, -8 * 32, 'sheet', 'rBall.png', { shape: shapes.gBall, name: 'ball', friction: 0.00001, restitution: .8});
      this.ball.setVelocityX(5);
      //this.matter.body.setInertia(this.ball.body, 1000000000);
      this.player = this.matter.add.sprite(-1*32, 200, 'ferretW', this.frames, {friction: 0.5,restitution: .5});
      this.anims.create({
         key: "walk",
         frameRate: 7,
         frames: this.anims.generateFrameNumbers("ferretW", { start: 0, end: 5 }),
         repeat: -1
      });
      this.player.play("walk");
      
      
      // title
      this.title = this.add.image(640/2,360/3, 'banner');
      this.start = false;
      // button
      this.button = this.add.image(this.title.x-this.title.width/2+62, this.title.y+62, 'startButton');
      this.button.setInteractive();
      this.howButton = this.add.image(this.title.x+this.title.width/2-62, this.title.y+62,'howToButton');
      this.howButton.setInteractive();


   }
   update() {
      if(this.player.x > 800){
         console.log("hi");
         this.ball.x = -1* 32;
         this.ball.y = -8 * 32;
         this.ball.setVelocityX(5);
         this.player.x = -30;
         this.player.y = 200;
      }
      this.player.x+=3;
      if (this.start == true) {
         this.scene.start('world1Scene');
         this.start = false;
      }
      if (this.howStart == true) {
         this.scene.start('tutorialScene');
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