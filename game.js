// ======================================
// CAR RACING GAME - CLEAN VERSION PART 1
// ======================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;


// ======================================
// IMAGES
// ======================================

const playerImg = new Image();
playerImg.src = "assets/car.png";

const enemyImg = new Image();
enemyImg.src = "assets/enemy.png";

const treeImg = new Image();
treeImg.src = "assets/tree.png";

const coinImg = new Image();
coinImg.src = "assets/coin.png";

const grassImg = new Image();
grassImg.src = "assets/grass.png";


// ======================================
// GAME VARIABLES
// ======================================

let score = 0;
let coinsCollected = 0;
let lives = 3;

let roadSpeed = 6;
let roadOffset = 0;

let gameOver = false;


// ======================================
// PLAYER CAR
// ======================================

const player = {

    x:365,
    y:450,

    width:70,
    height:120,

    speed:6

};


// ======================================
// KEYBOARD CONTROL
// ======================================

const keys = {};

document.addEventListener("keydown",(e)=>{

    keys[e.key] = true;

});


document.addEventListener("keyup",(e)=>{

    keys[e.key] = false;

});


// ======================================
// MOBILE CONTROL VARIABLES
// ======================================

let moveLeft = false;
let moveRight = false;


// ======================================
// ENEMY CARS
// ======================================

let enemies = [

    {
        x:200,
        y:-200,
        width:70,
        height:120,
        speed:6
    },

    {
        x:500,
        y:-600,
        width:70,
        height:120,
        speed:6
    }

];


// ======================================
// COINS
// ======================================

let coins = [];

for(let i=0;i<5;i++){

    coins.push({

        x:150 + Math.random()*450,
        y:-i*250,

        width:35,
        height:35

    });

}


// ======================================
// TREES
// ======================================

let trees=[];


for(let i=0;i<15;i++){

    trees.push({

        leftX:20,
        rightX:720,
        y:i*80

    });

}
// ======================================
// UPDATE FUNCTIONS - PART 2
// ======================================


// Player Movement
function updatePlayer(){

    if(keys["ArrowLeft"] || moveLeft){

        player.x -= player.speed;

    }


    if(keys["ArrowRight"] || moveRight){

        player.x += player.speed;

    }


    // Keep car on road

    if(player.x < 110){

        player.x = 110;

    }


    if(player.x > 620){

        player.x = 620;

    }

}



// Moving Road
function updateRoad(){

    roadOffset += roadSpeed;


    if(roadOffset >= 60){

        roadOffset = 0;

    }

}



// Moving Trees
function updateTrees(){

    trees.forEach(tree=>{


        tree.y += roadSpeed;


        if(tree.y > canvas.height){

            tree.y = -80;

        }


    });

}



// Enemy Cars
function updateEnemies(){

    enemies.forEach(enemy=>{


        enemy.y += enemy.speed;



        if(enemy.y > canvas.height + 150){


            enemy.y = -300;

            enemy.x = 120 + Math.random()*500;


            score += 10;


        }


    });


}



// Coins Movement + Collection
function updateCoins(){


    coins.forEach(coin=>{


        coin.y += roadSpeed;



        if(coin.y > canvas.height + 50){


            coin.y = -300;

            coin.x = 120 + Math.random()*500;


        }



        // collect coin

        if(

            player.x < coin.x + coin.width &&

            player.x + player.width > coin.x &&

            player.y < coin.y + coin.height &&

            player.y + player.height > coin.y

        ){


            coinsCollected++;

            score += 50;


            coin.y = -300;

            coin.x = 120 + Math.random()*500;


        }


    });


}




// Collision Check
function checkCollision(){


    enemies.forEach(enemy=>{


        if(

            player.x < enemy.x + enemy.width &&

            player.x + player.width > enemy.x &&

            player.y < enemy.y + enemy.height &&

            player.y + player.height > enemy.y


        ){


            lives--;


            enemy.y = -300;



            player.x = 365;


            if(lives <= 0){

                gameOver = true;

            }


        }


    });


}





// Main Update
function update(){


    if(gameOver){

        return;

    }


    updatePlayer();

    updateRoad();

    updateTrees();

    updateEnemies();

    updateCoins();

    checkCollision();


}
// ======================================
// DRAWING FUNCTIONS - PART 3
// ======================================


// Draw Road + Grass
function drawBackground(){


    // Grass sides
    if(grassImg.complete){

        ctx.drawImage(grassImg,0,0,100,canvas.height);

        ctx.drawImage(
            grassImg,
            700,
            0,
            100,
            canvas.height
        );

    }
    else{

        ctx.fillStyle="green";

        ctx.fillRect(0,0,100,canvas.height);

        ctx.fillRect(700,0,100,canvas.height);

    }



    // Road

    ctx.fillStyle="#444";

    ctx.fillRect(
        100,
        0,
        600,
        canvas.height
    );



    // Road border

    ctx.fillStyle="yellow";

    ctx.fillRect(100,0,5,canvas.height);

    ctx.fillRect(695,0,5,canvas.height);


}



// Moving lane lines

function drawRoadLines(){


    ctx.fillStyle="white";


    for(let y=-60;y<canvas.height+60;y+=60){


        ctx.fillRect(

            295,

            y + roadOffset,

            10,

            35

        );


        ctx.fillRect(

            495,

            y + roadOffset,

            10,

            35

        );


    }


}



// Draw Trees

function drawTrees(){


    trees.forEach(tree=>{


        if(treeImg.complete){


            ctx.drawImage(

                treeImg,

                tree.leftX,

                tree.y,

                60,

                60

            );


            ctx.drawImage(

                treeImg,

                tree.rightX,

                tree.y,

                60,

                60

            );


        }


    });


}




// Draw Coins

function drawCoins(){


    coins.forEach(coin=>{


        if(coinImg.complete){


            ctx.drawImage(

                coinImg,

                coin.x,

                coin.y,

                coin.width,

                coin.height

            );


        }


    });


}




// Draw Enemy Cars

function drawEnemies(){


    enemies.forEach(enemy=>{


        if(enemyImg.complete){


            ctx.drawImage(

                enemyImg,

                enemy.x,

                enemy.y,

                enemy.width,

                enemy.height

            );


        }


    });


}





// Draw Player Car

function drawPlayer(){


    if(playerImg.complete){


        ctx.drawImage(

            playerImg,

            player.x,

            player.y,

            player.width,

            player.height

        );


    }


}





// HUD

function drawHUD(){


    ctx.fillStyle="rgba(0,0,0,0.6)";

    ctx.fillRect(
        10,
        10,
        260,
        120
    );



    ctx.fillStyle="white";

    ctx.font="bold 24px Arial";

    ctx.fillText(

        "🏆 Score : " + score,

        20,
        40

    );



    ctx.fillStyle="gold";

    ctx.fillText(

        "🪙 Coins : " + coinsCollected,

        20,
        75

    );



    ctx.fillStyle="red";

    ctx.font="bold 28px Arial";


    ctx.fillText(

        "❤️".repeat(lives),

        20,
        110

    );


}
// ======================================
// GAME LOOP + MOBILE + RESTART - PART 4
// ======================================


// Draw Everything

function draw(){

    drawBackground();

    drawRoadLines();

    drawTrees();

    drawCoins();

    drawEnemies();

    drawPlayer();

    drawHUD();

}



// Game Over Screen

function drawGameOver(){


    ctx.fillStyle="rgba(0,0,0,0.7)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    ctx.fillStyle="white";

    ctx.textAlign="center";


    ctx.font="50px Arial";

    ctx.fillText(
        "GAME OVER",
        400,
        250
    );


    ctx.font="28px Arial";

    ctx.fillText(
        "Score : " + score,
        400,
        320
    );


    ctx.fillText(
        "Press SPACE to Restart",
        400,
        380
    );


    ctx.textAlign="left";

}



// Restart Game

function restartGame(){


    score = 0;

    coinsCollected = 0;

    lives = 3;

    roadSpeed = 6;

    gameOver = false;



    player.x = 365;

    player.y = 450;



    enemies.forEach((enemy,index)=>{


        enemy.y = -200 - index*300;

        enemy.x = 120 + Math.random()*500;


    });



}




// Keyboard Restart

document.addEventListener("keydown",(e)=>{


    if(gameOver && e.code==="Space"){

        restartGame();

    }


});




// Mobile Buttons

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const brakeBtn = document.getElementById("brakeBtn");



if(leftBtn){


    leftBtn.addEventListener("touchstart",()=>{

        moveLeft=true;

    });


    leftBtn.addEventListener("touchend",()=>{

        moveLeft=false;

    });


}



if(rightBtn){


    rightBtn.addEventListener("touchstart",()=>{

        moveRight=true;

    });


    rightBtn.addEventListener("touchend",()=>{

        moveRight=false;

    });


}



if(brakeBtn){


    brakeBtn.addEventListener("touchstart",()=>{

        roadSpeed=3;

    });


    brakeBtn.addEventListener("touchend",()=>{

        roadSpeed=6;

    });


}





// Main Game Loop

function gameLoop(){


    if(!gameOver){


        update();

        draw();


    }
    else{


        draw();

        drawGameOver();


    }



    requestAnimationFrame(gameLoop);


}





// Start Game

gameLoop();