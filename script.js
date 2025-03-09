// Inisialisasi Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 500;

// Variabel Game
let car = { x: 125, y: 400, width: 50, height: 80, speed: 5 };
let roadLines = [];
let gameRunning = true;

// Buat Garis Jalan
for (let i = 0; i < 10; i++) {
    roadLines.push({ x: 145, y: i * 50, width: 10, height: 30 });
}

// Kontrol Mobil
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && car.x > 50) car.x -= car.speed;
    if (event.key === "ArrowRight" && car.x < 200) car.x += car.speed;
});

// Fungsi Update Game
function updateGame() {
    if (!gameRunning) return;

    // Gerakkan Garis Jalan
    roadLines.forEach(line => {
        line.y += 5;
        if (line.y > canvas.height) line.y = -30;
    });

    // Cek Batas Jalan (Game Over)
    if (car.x < 50 || car.x > 200) {
        gameRunning = false;
        alert("Game Over! Refresh untuk bermain lagi.");
    }
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

    // Gambar Mobil (Pixel Art)
    ctx.fillStyle = "red";
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Loop Game
function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();