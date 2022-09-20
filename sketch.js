let ground;
let lander, landerGroup;
var lander_img;
var bg_img;
var invisGround
var gameState = "Start"
var score = 0;
var score_increase = score/5
var endGround


var vx = 0;
var g = 0.05+score_increase;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  lander = createSprite(random(50,900),50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.debug = true
  lander.setCollider("rectangle", 40,40,600,600)
  lander.lifetime = 200
  landerGroup = new Group()
  lander.visible = false

  invisGround = createSprite(500,600,300,30);
  //invisGround.visible = false
  invisGround.debug = true


  endGround = createSprite(500,690,1000,10)



  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  if(gameState === "Start"){
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Score: "+score,100,75)
  pop();
  invisGround.x = mouseX
  spawnLander()

  if(lander.isTouching(invisGround) === true){
    lander.collide(invisGround)
    lander.destroy()
    vy = 0
    score += 1
  }

  //fall down
  vy +=g;
  lander.position.y+=vy;
  if(lander.isTouching(endGround)){
    gameState = "end"
    swal({
      title: `Game Over`,
      text: "Oops, a lander fell off the Moon!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });

    
    }
    drawSprites();
  }
}

function spawnLander(){
  if(frameCount % 130 === 0){
    lander = createSprite(random(50,900),50,30,30);
    lander.velocityY = (6+score*2)
    lander.addImage(lander_img);
    lander.scale = 0.1;
    lander.debug = true
    lander.visible = true
    lander.setCollider("rectangle", 40,40,600,600)
    lander.lifetime = 200
    landerGroup.add(lander)
  }
}

