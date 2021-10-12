var back;
var backgroundImage;

var invisibleGround;

var isJumping;

var player;
var playerAnim;

var obstacle1, obstacle2, obstacle3;
var obstacleImg;

function preload(){
    backgroundImage = loadImage("BackGroundImage.png");

    playerAnim = loadAnimation("Sprite_00.png", "Sprite_01.png", "Sprite_02.png", "Sprite_03.png", "Sprite_04.png", "Sprite_05.png", "Sprite_06.png", "Sprite_07.png", "Sprite_08.png", "Sprite_09.png", "Sprite_10.png", "Sprite_11.png", "Sprite_12.png", "Sprite_13.png", "Sprite_14.png", "Sprite_15.png", "Sprite_16.png");

    obstacleImg = loadImage("Obstacle.png");
}

function setup(){
    createCanvas(1200, 700, 40, 40);
   
    back = createSprite(600, 350, 800, 450);
    player = createSprite(250, 540, 100, 100);
    invisibleGround = createSprite(400, 607, 800, 20);
    obstacle1 = createSprite(800, 580, 50, 50);
    obstacle2 = createSprite(1200, 580, 50, 50);
    obstacle3 = createSprite(1600, 580, 50, 50);

    back.addImage("Background1", backgroundImage);
    player.addAnimation("PlayerAnimation", playerAnim);
    obstacle1.addImage(obstacleImg);
    obstacle2.addImage(obstacleImg);
    obstacle3.addImage(obstacleImg);

    back.scale = 0.97;
    player.scale = 0.75;
    obstacle1.scale = 0.3;
    obstacle2.scale = 0.3;
    obstacle3.scale = 0.3;

    player.setCollider("rectangle", -50, -60, 120, 240);
    player.debug = false;

    obstaclesGroup = createGroup();
}

function draw(){
    background("black");

    back.velocityX = -8;
    obstacle1.velocityX = -8;
    obstacle2.velocityX = -8;
    obstacle3.velocityX = -8;

    if (back.x < 0){
        back.x = back.width/2 - 52; // - 2000;
    }

    if (keyDown("space") && player.y >= 551) {
        player.velocityY = -18;
    }

    if (obstacle1.x < -25){
        obstacle1.x = obstacle3.x + 800;
    } else if(obstacle2.x < -25){
        obstacle2.x = obstacle1.x + 800;
    } else if(obstacle3.x < -25){
        obstacle3.x = obstacle2.x + 800;
    }

    if(player.isTouching(obstacle1) || player.isTouching(obstacle2) || player.isTouching(obstacle3)){
        obstacle1.velocityX = 0;
        obstacle2.velocityX = 0;
        obstacle3.velocityX = 0;
        back.velocityX = 0;
    }

    player.velocityY = player.velocityY + 1;

    player.collide(invisibleGround);
    player.collide(obstacle1);
    player.collide(obstacle2);
    player.collide(obstacle3);

    invisibleGround.visible = false;

    drawSprites();
}
