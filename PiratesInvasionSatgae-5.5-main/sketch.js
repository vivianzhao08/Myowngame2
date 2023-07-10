const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, boat;
var score = 0;
var stone;
var jumpingImage;

var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

var waterSplashAnimation = [];
var waterSplashSpritedata, waterSplashSpritesheet;

var isGameOver = false;
var isLaughing = false;
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  waterSplashSpritedata = loadJSON("assets/water_splash/water_splash.json");
  waterSplashSpritesheet = loadImage("assets/water_splash/water_splash.png");
  waterSound = loadSound("./assets/cannon_water.mp3");
  backgroundMusic = loadSound("./assets/background_music.mp3");
  stone = loadImage("assets/stone.jpg");
  jumpImage = loadImage("assets/jump.jpg");
  jump1Image = loadImage("assets/jump1.jpg");
  jump2Image = loadImage("assets/jump2.jpg");
  jump3Image = loadImage("assets/jump3.jpg");
  jump4Image = loadImage("assets/jump4.jpg");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

 
  John = Bodies.rectangle(150, 20, 20, 50);
  World.add(world, John);

 stone = createSprite(50,50,50,50);
  stone = new Stone(50, 50, 100);

  var waterSplashFrames = waterSplashSpritedata.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  if(!backgroundMusic.isPlaying()){
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
  }
  Engine.update(engine);
 
  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();



  stone.display();
  

  fill("#6d4c41");
  textSize(40);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);

  drawSprites();
}


function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

    

    


function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    cannonExplosion.play();
    balls[balls.length - 1].shoot();
  }
}

function gameOver() {
  swal(
    {
      title: `Game is Over!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
