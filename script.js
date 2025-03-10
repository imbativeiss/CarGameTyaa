const gameArea = document.getElementById("gameArea");
const playerCar = document.getElementById("playerCar");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

let playerPosition = 1; // 0 = kiri, 1 = tengah, 2 = kanan
let obstacles = [];
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// Fungsi untuk membuat rintangan
function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    // Posisi rintangan: kiri, tengah, atau kanan secara acak
    const randomPosition = Math.floor(Math.random() * 3); // 0, 1, atau 2
    obstacle.style.left = `${randomPosition * 33.3}%`;
    
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Fungsi untuk menggerakkan rintangan ke bawah
function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        let obstacleTop = parseInt(window.getComputedStyle(obstacle).top);

        if (obstacleTop >= 400) {
            obstacle.remove();
            obstacles.splice(i, 1);
            i--;

            // Tambah skor jika berhasil melewati rintangan
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            
            // Update high score jika perlu
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                highScoreDisplay.innerText = `High Score: ${highScore}`;
            }
        } else {
            obstacle.style.top = `${obstacleTop + 5}px`;
        }
    }
}

// Fungsi untuk memeriksa tabrakan
function checkCollision() {
    const playerRect = playerCar.getBoundingClientRect();

    for (let obstacle of obstacles) {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            gameOver();
        }
    }
}

// Fungsi saat game over
function gameOver() {
    alert(`Lu dah kalah, refresh kalo mau nantang game ini lagi PUH CUPUH!!!\n\nGame Over! Skor: ${score}\nHigh Score: ${highScore}`);
    location.reload();
}

// Fungsi untuk menggerakkan mobil pemain ke kiri atau kanan
function movePlayer(direction) {
    if (direction === "left" && playerPosition > 0) {
        playerPosition--;
    } else if (direction === "right" && playerPosition < 2) {
        playerPosition++;
    }
    playerCar.style.left = `${playerPosition * 33.3}%`;
}

// Event listener untuk tombol kiri dan kanan di mobile
document.getElementById("leftButton").addEventListener("click", () => movePlayer("left"));
document.getElementById("rightButton").addEventListener("click", () => movePlayer("right"));

// Event listener untuk keyboard
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        movePlayer("left");
    } else if (event.key === "ArrowRight") {
        movePlayer("right");
    }
});

// Loop utama game
function gameLoop() {
    moveObstacles();
    checkCollision();
    
    if (Math.random() < 0.02) {
        createObstacle();
    }

    requestAnimationFrame(gameLoop);
}

// Mulai permainan
scoreDisplay.innerText = `Score: ${score}`;
highScoreDisplay.innerText = `High Score: ${highScore}`;
gameLoop();
