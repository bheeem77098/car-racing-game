const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Images
const carImage = new Image();
carImage.src = "car.png";

const enemyImage = new Image();
enemyImage.src = "enemy.png";

// Check images
carImage.onload = function () {
    console.log("Player car loaded");
};

carImage.onerror = function () {
    console.log("Player car image not found");
};

enemyImage.onload = function () {
    console.log("Enemy car loaded");
};

enemyImage.onerror = function () {
    console.log("Enemy car image not found");
};

// Player car
const player = {
    x: 360,
    y: 450,
    width: 70,
    height: 120,
    speed: 6
};

// Enemy cars
let enemies = [
    {
        x: 200,
        y: -200,
        width: 70,
        height: 120,
        speed: 5
    },
    {
        x: 520,
        y: -500,
        width: 70,
        height: 120,
        speed: 6
    }
];

let score = 0;
let roadLineY = 0;
let gameRunning = false;

// Keyboard
let keys = {};

document.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});

document.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});

// Update
function update() {

    if (!gameRunning) return;

    if (keys["ArrowLeft"])
        player.x -= player.speed;

    if (keys["ArrowRight"])
        player.x += player.speed;

    if (player.x < 90)
        player.x = 90;

    if (player.x > 640)
        player.x = 640;

    // Road movement
    roadLineY += 6;

    if (roadLineY > 60)
        roadLineY = 0;

    // Enemy movement
    enemies.forEach(enemy => {

        enemy.y += enemy.speed;

        if (enemy.y > canvas.height) {
            enemy.y = -200;
            enemy.x = Math.random() * 500 + 100;
            score++;
        }

        // Collision
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            gameRunning = false;

            setTimeout(() => {
                alert("Game Over! Score: " + score);
                location.reload();
            }, 100);
        }
    });
}

// Draw
function draw() {

    // Road
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, 800, 600);

    // Borders
    ctx.fillStyle = "yellow";
    ctx.fillRect(80, 0, 5, 600);
    ctx.fillRect(715, 0, 5, 600);

    // Road lines
    ctx.fillStyle = "white";

    for (let i = -60; i < 600; i += 60) {
        ctx.fillRect(395, i + roadLineY, 10, 30);
    }

    // Player
    if (carImage.complete && carImage.naturalWidth > 0) {
        ctx.drawImage(
            carImage,
            player.x,
            player.y,
            player.width,
            player.height
        );
    } else {
        ctx.fillStyle = "red";
        ctx.fillRect(
            player.x,
            player.y,
            player.width,
            player.height
        );
    }

    // Enemies
    enemies.forEach(enemy => {

        if (enemyImage.complete && enemyImage.naturalWidth > 0) {
            ctx.drawImage(
                enemyImage,
                enemy.x,
                enemy.y,
                enemy.width,
                enemy.height
            );
        } else {
            ctx.fillStyle = "blue";
            ctx.fillRect(
                enemy.x,
                enemy.y,
                enemy.width,
                enemy.height
            );
        }

    });

    // Score
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 20, 40);
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Buttons
const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");

startBtn.addEventListener("click", function () {
    if (!gameRunning) {
        gameRunning = true;
        gameLoop();
    }
});

endBtn.addEventListener("click", function () {
    gameRunning = false;
});
