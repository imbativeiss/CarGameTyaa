const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const roadWidth = 200;
const laneWidth = roadWidth / 3;
const playerSize = 30;
const obstacleSize = 30;
let playerX = canvas.width / 2 - playerSize / 2;
let playerY = canvas.height - playerSize - 10;
let obstacles = [];
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameSpeed = 2;
let isGameOver = false;

document.getElementById("leftBtn").addEventListener("click", () => movePlayer(-1));
document.getElementById("rightBtn").addEventListener("click", () => movePlayer(1));
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") movePlayer(-1);
    if (event.key === "ArrowRight") movePlayer(1);
});

function movePlayer(direction) {
    if (isGameOver) return;
    let newX = playerX + direction * laneWidth;
    if (newX >= canvas.width / 2 - roadWidth / 2 && newX <= canvas.width / 2 + roadWidth / 2 - playerSize) {
        playerX = newX;
    }
}

function spawnObstacle() {
    const lanes = [
        canvas.width / 2 - roadWidth / 2, // Kiri
        canvas.width / 2 - playerSize / 2, // Tengah
        canvas.width / 2 + roadWidth / 2 - playerSize // Kanan
    ];
    let randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    obstacles.push({ x: randomLane, y: -obstacleSize });
}

function updateGame() {
    if (isGameOver) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";
    ctx.fillRect(canvas.width / 2 - roadWidth / 2, 0, roadWidth, canvas.height);

    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.fillRect(playerX, playerY, playerSize, playerSize);

    ctx.fillStyle = "green";
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += gameSpeed;
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacleSize, obstacleSize);

        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++; // Tambah skor hanya saat melewati rintangan
            gameSpeed += 0.05;
        }

        if (
            obstacles[i] &&
            playerX < obstacles[i].x + obstacleSize &&
            playerX + playerSize > obstacles[i].x &&
            playerY < obstacles[i].y + obstacleSize &&
            playerY + playerSize > obstacles[i].y
        ) {
            isGameOver = true;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
            }
            setTimeout(() => {
                alert(`Lu dah kalah, refresh kalo mau nantang game ini lagi PUH CUPUH!!!\n\nGame Over! Skor: ${score}\nHigh Score: ${highScore}`);
                location.reload();
            }, 100);
        }
    }

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 20, 30);
    ctx.fillText("High Score: " + highScore, 20, 50);

    requestAnimationFrame(updateGame);
}

setInterval(spawnObstacle, 1500);
updateGame();
