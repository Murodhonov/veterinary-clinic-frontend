// Snake game implementation
var cells = document.getElementsByClassName('cells');
var gridWidth = Math.sqrt(cells.length);
var snake = [46]; // Snake starts at cell 46
var direction = null; // No movement initially
var foodIndex = null; // Position of the food

// Initialize snake and food
function initializeGame() {
    // Set snake's initial position
    cells[snake[0]].style.backgroundColor = 'green';
    placeFood();
}

// Place food at a random position
function placeFood() {
    do {
        foodIndex = Math.floor(Math.random() * cells.length);
    } while (snake.includes(foodIndex)); // Ensure food is not placed on the snake
    cells[foodIndex].style.backgroundColor = 'red';
}

// Handle keydown events for snake movement
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});

// Move the snake based on the direction
function moveSnake() {
    if (!direction) return; // Do nothing if no direction is set

    // Calculate the new head position
    var head = snake[0];
    var newHead;

    if (direction === 'up') {
        newHead = head - gridWidth;
    } else if (direction === 'down') {
        newHead = head + gridWidth;
    } else if (direction === 'left') {
        newHead = head - 1;
    } else if (direction === 'right') {
        newHead = head + 1;
    }

    // Check for collisions with walls or itself
    if (
        newHead < 0 ||
        newHead >= cells.length ||
        (direction === 'left' && head % gridWidth === 0) ||
        (direction === 'right' && (head + 1) % gridWidth === 0) ||
        snake.includes(newHead)
    ) {
        alert('Game Over!');
        location.reload(true);
        return;
    }

    // Add the new head to the snake
    snake.unshift(newHead);

    // Check if the snake eats the food
    if (newHead === foodIndex) {
        placeFood();
    } else {
        // Remove the tail if no food eaten
        var tail = snake.pop();
        cells[tail].style.backgroundColor = '';
    }

    // Update the snake's cells
    cells[newHead].style.backgroundColor = 'green';
}

// Game loop (manual movement only)
setInterval(moveSnake, 200);

// Initialize the game
initializeGame();