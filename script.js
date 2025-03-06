let blueCar = document.querySelector(".bluecar");
let redCar = document.querySelector(".redcar");
let result = document.getElementById("result");
let scoreCount = document.getElementById("score-count");
let game = document.getElementById("game");
let counter = 0;
let gameRunning = true; 
let speed = 2; 
blueCar.addEventListener("animationiteration", function () {
    let random = (Math.floor(Math.random() * 2)) * 140;
    blueCar.style.left = random + "px";
    counter++;

    // Speed up the blue car (decrease animation duration)
    if (speed < 1.2) { // Prevent it from becoming too fast
        speed += 0.2; 
        blueCar.style.animation = `move ${speed}s linear infinite`;
    }
});

// Move red car with arrow keys
window.addEventListener("keydown", function (e) {
    let redCarLeft = parseInt(window.getComputedStyle(redCar).getPropertyValue("left"));

    if (e.keyCode === 39 && redCarLeft < 155) { // Right arrow key
        redCar.style.left = (redCarLeft + 20) + "px";
    }
    if (e.keyCode === 37 && redCarLeft > 0) { // Left arrow key
        redCar.style.left = (redCarLeft - 20) + "px";
    }
});

// Function to check for collision
function checkCollision() {
    if (!gameRunning) return; 

    let blueCarRect = blueCar.getBoundingClientRect();
    let redCarRect = redCar.getBoundingClientRect();

    if (
        blueCarRect.left < redCarRect.right &&
        blueCarRect.right > redCarRect.left &&
        blueCarRect.bottom > redCarRect.top &&
        blueCarRect.top < redCarRect.bottom
    ) {
        gameOver();
    }
}

// Game over function
function gameOver() {
    gameRunning = false; 
    result.style.display = "block";
    game.style.display = "none";
    scoreCount.innerHTML = counter;
    clearInterval(gameLoop);
}

// Run collision check every 10ms
let gameLoop = setInterval(checkCollision, 10);
