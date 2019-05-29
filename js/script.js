const initialArr = [];

for (let i = 0; i < 10; i++) {
    const line = [0,0,0,0,0,0,0,0,0,0];
    initialArr.push(line);
};

const generateDecimal = () => {
    return Math.floor(Math.random()*10);
}

const generateDecimalPosition = () => {
    return {
        x: generateDecimal(),
        y: generateDecimal(),
    }
}

const initialLength = 8;

const snake = [];

for (let i = 0; i < initialLength; i++) {
    snake.push({
        x : 0 + i,
        y : 5,
    });
}

const initialDirection = 'right';

let direction = initialDirection;

const generateBug = () => {
    let bug = generateDecimalPosition();

    while (initialArr[bug.y][bug.x] !== 0) {
        bug = generateDecimalPosition();
    };

    initialArr[bug.y][bug.x] = '*';
}

const initializeGame = () => {
    snake.map((e) => {
        initialArr[e.y][e.x] = 1;
    })

    generateBug();
}

initializeGame();

const move = (snake, direction) => {
    const lastRing = { ...snake[snake.length - 1] };

    switch (direction) {
        case 'right':
            lastRing.x = (lastRing.x + 1) % 10;
            break;
        case 'left':
            lastRing.x = (lastRing.x - 1) < 0 ? 9 : lastRing.x - 1;
            break;
        case 'top':
            lastRing.y = (lastRing.y - 1) < 0 ? 9 : lastRing.y - 1;
            break;
        case 'bottom':
            lastRing.y = (lastRing.y + 1) % 10;
            break;
        default:
            break;
    }

    const getPoint = () => {
        snake.push(lastRing)
        initialArr[lastRing.y][lastRing.x] = 1;

        generateBug();
    }

    const shiftSnake = (lastRing) => {
        const zeroCell = snake.shift();
        initialArr[zeroCell.y][zeroCell.x] = 0;

        snake.push(lastRing)
        initialArr[lastRing.y][lastRing.x] = 1;
    }
    const overGame = () => {
        clearInterval(runGame);
        alert('Game over! Reload page to restart');
    }

    switch (initialArr[lastRing.y][lastRing.x]) {
        case 1:
            overGame();
            return;
            break;
        case '*':
            getPoint();
            break;
        default:
            shiftSnake(lastRing);
    }

    console.log(initialArr);
}

const runGame = setInterval(() => {
    move(snake, direction)
}, 2000)

window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37 || 65:
            direction = 'left';
            break;
        case 38 || 87:
            direction = 'top';
            break;
        case 39 || 68:
            direction = 'right';
            break;
        case 40 || 83:
            direction = 'bottom';
            break;
    }
})




