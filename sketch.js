var ghost,ghostImg;
var tower,towerImg;
var door,doorImg;
var climber,climberImg;
var gameState = "play"


function preload (){
  ghostImg = loadImage("ghost-standing.png")
  towerImg = loadImage("tower.png")
  doorImg  = loadImage("door.png")
  climberImg = loadImage("climber.png")
  spookySound = loadSound("spooky.wav")
 
}
function setup(){
  createCanvas(600,600)
  
   tower = createSprite(300,300,100,100)
  tower.addImage(towerImg)
  tower.velocityY = 1;
  
  spookySound.loop();
  
  ghost = createSprite(200,200,20,20);
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
 

  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleblockgroup = new Group();
 
 
}

function draw(){
   background("black");  
if(gameState === "play"){
  if(keyDown("space")){
    ghost.velocityY = -10
  }
  ghost.velocityY = ghost.velocityY + 0.8
 
  if(keyDown("right_arrow")){
    ghost.velocityX = 2
  }
  if(keyDown("left_arrow")){
    ghost.velocityX = -2
  }
   
    if(tower.y > 400){
      tower.y = 100
    }
 
   createDoor();
  
  
   if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
if(ghost.isTouching(climbersGroup)  || ghost.y > 600) {
  gameState = "end"
}
   if(invisibleblockgroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
   drawSprites();
 
}
   if(gameState === "end"){
    ghost.destroy();
   fill("red")
     textSize(50);
     text("Game Over", 200,300)
   
  }
}

function createDoor(){
  if (frameCount % 240 === 0){
   var door = createSprite(200, -50);
    door.x = Math.round(random(20,400))
    door.velocityY = 1;
    door.addImage(doorImg)   
    door.lifetime =800;
    var climber = createSprite(200,10);
    climber.x = door.x;
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime = 800;
    
    var invisibleblock = createSprite(200,20);
    invisibleblock.velocityY = 1;
    invisibleblock.x = door.x
    invisibleblock.lifetime = 800;
      invisibleblock.width = climber.width; 
    invisibleblock.height = 50;
    

    
     ghost.depth = door.depth;
    ghost.depth +=1;
    
    
    
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleblockgroup.add(invisibleblock)
    invisibleblock.debug = true;
    invisibleblock.visible = false;
  }
}