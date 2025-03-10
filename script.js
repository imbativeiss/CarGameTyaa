const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const roadWidth = canvas.width / 3;
const playerWidth = 30;
const playerHeight = 50;

let player = { x: roadWidth, y: canvas.height - playerHeight - 10 };
let obstacles = [];
let speed = 2;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highScore").innerText = highScore;

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, playerWidth, playerHeight);
}

function drawObstacles() {
    ctx.fillStyle = "green";
    obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, playerWidth, playerHeight));
}

function updateObstacles() {
    obstacles.forEach(obs => obs.y += speed);
    if (obstacles.length > 0 && obstacles[0].y > canvas.height) {
        obstacles.shift();
        score++;
        document.getElementById("score").innerText = score;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highScore").innerText = highScore;
        }
    }

    if (Math.random() < 0.02) {
        let randomLane = Math.floor(Math.random() * 3);
        obstacles.push({ x: randomLane * roadWidth, y: -playerHeight });
    }
}

function checkCollision() {
    return obstacles.some(obs =>
        obs.x < player.x + playerWidth &&
        obs.x + playerWidth > player.x &&
        obs.y < player.y + playerHeight &&
        obs.y + playerHeight > player.y
    );
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    updateObstacles();

    if (checkCollision()) {
        alert(`Lu dah kalah, refresh kalo mau nantang game ini lagi PUH CUPUH!!!\n\nSkor: ${score}\nHigh Score: ${highScore}`);
        document.location.reload();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

document.getElementById("leftBtn").addEventListener("click", () => {
    if (player.x > 0) player.x -= roadWidth;
});
document.getElementById("rightBtn").addEventListener("click", () => {
    if (player.x < canvas.width - roadWidth) player.x += roadWidth;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) player.x -= roadWidth;
    if (e.key === "ArrowRight" && player.x < canvas.width - roadWidth) player.x += roadWidth;
});

gameLoop();
