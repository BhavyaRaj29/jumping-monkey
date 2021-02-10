var PLAY=1;
var END=0

var gameState=PLAY;


var monkey , monkey_running,monkey_collided;
var ground,invisibleGround,groundImage;
var obstacle, obstacleImage;
var banana ,bananaImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_2.png");
  groundImage=loadImage("jungle.jpg");
  
  
 
}



function setup() {
  createCanvas=(600,600);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  //ground.addImage(groundImage);
  ground.x=ground.width/2;
  console.log(ground.x+"BHAVYA-40");
  
  //banana=createSprite(20,20,20,20);
  //banana.addImage(bananaImage);
  //banana.scale=0.2;
  
    invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  obstacleGroup=new Group();
  bananaGroup=new Group();
  
  score=0;
  
}


function draw() {
background(groundImage);
 stroke("red")
  textSize(20);
  fill("red");
 text("score:"+score,500,50);
  
  if (gameState===PLAY){
    console.log("bhavya is coming");
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
    
     monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
        if (monkey.isTouching(bananaGroup)){
      score++;  
          monkey.scale=0.4;
      bananaGroup.destroyEach();
    
    }
    bananas();
    obstacles();
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      monkey.scale=0.1
    }
  }
  
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //change the monkey animation.....
    monkey.changeAnimation("collided",monkey_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
  }
  monkey.collide(ground);
    drawSprites();
} 
  function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
   banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.y=Math.round(random(200,300))
    banana.velocityX =-4         
    banana.lifetime = 220;
    bananaGroup.add(banana);
  
  }
  }
    
    function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,320,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
      
  
  stroke("black");
  textSize(20)
  fill("black");
  //survivalTime=Math.ceil(frameCount/frameRate())
  //text ("survivalTime:"+urvivalTime,100,50);
  
  }
  