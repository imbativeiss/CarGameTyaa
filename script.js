// Inisialisasi Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 500;

// Variabel Game
let car = { x: 125, y: 400, width: 50, height: 80, speed: 10 };
let obstacles = [];
let roadLines = [];
let gameRunning = true;

// Buat Garis Jalan
for (let i = 0; i < 10; i++) {
    roadLines.push({ x: 145, y: i * 50, width: 10, height: 30 });
}

// Kontrol Keyboard
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && car.x > 50) car.x -= car.speed;  
    if (event.key === "ArrowRight" && car.x < 200) car.x += car.speed;
});

// Kontrol Tombol Virtual
document.getElementById("leftBtn").addEventListener("click", () => {
    if (car.x > 50) car.x -= car.speed;
});

document.getElementById("rightBtn").addEventListener("click", () => {
    if (car.x < 200) car.x += car.speed;
});

// Tambah Rintangan (Mobil Lawan)
function spawnObstacle() {
    let obstacleX = Math.random() < 0.5 ? 75 : 175;
    obstacles.push({ x: obstacleX, y: -100, width: 50, height: 80, speed: 5 });
}
setInterval(spawnObstacle, 2000); // Muncul setiap 2 detik

// Fungsi Update Game
function updateGame() {
    if (!gameRunning) return;

    // Gerakkan Garis Jalan
    roadLines.forEach(line => {
        line.y += 5;
        if (line.y > canvas.height) line.y = -30;
    });

    // Gerakkan Rintangan
    obstacles.forEach((obs, index) => {
        obs.y += obs.speed;
        if (obs.y > canvas.height) obstacles.splice(index, 1);

        // Cek tabrakan
        if (
            car.x < obs.x + obs.width &&
            car.x + car.width > obs.x &&
            car.y < obs.y + obs.height &&
            car.y + car.height > obs.y
        ) {
            gameRunning = false;
            alert("Game Over! Refresh untuk bermain lagi.");
        }
    });
}

// Fungsi Gambar
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar Jalan
    ctx.fillStyle = "black";
    ctx.fillRect(50, 0, 200, canvas.height);

    // Gambar Garis Jalan
    ctx.fillStyle = "white";
    roadLines.forEach(line => {
        ctx.fillRect(line.x, line.y, line.width, line.height);
    });

    // Gambar Mobil (Player)
    ctx.fillStyle = "red";
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Desain Mobil (Kaca dan Ban)
    ctx.fillStyle = "black"; // Ban
    ctx.fillRect(car.x + 5, car.y + 65, 10, 10);
    ctx.fillRect(car.x + 35, car.y + 65, 10, 10);

    ctx.fillStyle = "lightblue"; // Kaca
    ctx.fillRect(car.x + 10, car.y + 10, 30, 20);

    ctx.fillStyle = "yellow"; // Lampu Depan
    ctx.fillRect(car.x + 5, car.y, 10, 10);
    ctx.fillRect(car.x + 35, car.y, 10, 10);

    // Gambar Rintangan (Mobil Lawan)
    obstacles.forEach(obs => {
        ctx.fillStyle = "blue";
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        ctx.fillStyle = "black"; // Ban
        ctx.fillRect(obs.x + 5, obs.y + 65, 10, 10);
        ctx.fillRect(obs.x + 35, obs.y + 65, 10, 10);

        ctx.fillStyle = "lightgray"; // Kaca
        ctx.fillRect(obs.x + 10, obs.y + 10, 30, 20);

        ctx.fillStyle = "yellow"; // Lampu Depan
        ctx.fillRect(obs.x + 5, obs.y, 10, 10);
        ctx.fillRect(obs.x + 35, obs.y, 10, 10);
    });
}

// Loop Game
function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
