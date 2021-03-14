var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var jungle,jungleImage;



function preload(){
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  jungleImage=loadImage("jungle.jpg");
  obstacleImage = loadImage("stone.png");
  bananaImage=loadImage("banana.png");
  
  
  
}
function setup() {
  createCanvas(600, 600);
  
  jungle = createSprite(0,0,600,600);
  jungle.addImage(jungleImage);
  jungle.scale = 1.5;
  
  monkey=createSprite(100,400,900,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,500,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  score=0;
}

function draw() {
  background(220);
  jungle.velocityX = -3 
         
  if(gameState===PLAY){
     if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if(keyDown("space")){
    monkey.velocityY=-12;
  }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+2;
  }
  
   monkey.velocityY=monkey.velocityY+0.8;
   monkey.collide(ground);
  
   stroke("white");
   textSize(20);
   fill("white");
   text("Score: "+score,500,50);
  
   switch(score){
     case 10: monkey.scale=0.12;
        break;
     case 20: monkey.scale=0.14;
        break;
     case 30: monkey.scale=0.16;
        break;
     case 40: monkey.scale=0.18;
        break;
     
       
   }
     if(obstaclesGroup.isTouching(monkey)){
       monkey.scale=0.1;
       gameState=END;
     }
  
   spawnObstacles();
   spawnFood();
      
  } else if(gameState===END){
        score=0;
        monkey.scale=0.1;
        foodGroup.destroyEach();
        obstaclesGroup.destroyEach();
        monkey.velocityX=0;
        ground.velocityX=0;
        gameState=PLAY;
            
            
            }
   
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
}
 function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,450,10,40);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.5;
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
   
    }
          
  
}

function spawnFood(){
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,450,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    foodGroup.add(banana);
     
    
    
   
  }
  
  
}

