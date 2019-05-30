// TODO:
// 1. re-render only changed elements
// 2. solve snake reverse
// 3. refactor using DRY


const initialArr = [];
let points = 0;
const app = document.getElementById('app');

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

const renderGame = () => {
    const board = document.createElement('div');
    board.classList.add('board');

    initialArr.map((r) => {
        const row = document.createElement('div');
        row.classList.add('row');
        
        r.map((c) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            
            switch(c) {
                case 1: 
                    cell.classList.add('snake');
                    break;
                case 2: 
                    cell.classList.add('snake-head');
                    break;
                case '*': 
                    cell.classList.add('bug');
                    break;
            }

            row.appendChild(cell);
        })

        board.appendChild(row);
    })

    app.innerHTML = '';
    app.appendChild(board);
}

const initialLength = 5;

const snake = [];

for (let i = 0; i < initialLength; i++) {
    snake.push({
        x : 2 + i,
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
    snake.map((e, i, arr) => {
        i === arr.length - 1
            ? initialArr[e.y][e.x] = 2
            : initialArr[e.y][e.x] = 1;
    })

    generateBug();
    renderGame();
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
        const currentHead = snake[snake.length - 1];
        initialArr[currentHead.y][currentHead.x] = 1;

        snake.push(lastRing)
        initialArr[lastRing.y][lastRing.x] = 2;

        generateBug();

        points++;
        console.log(points);
    }

    const shiftSnake = (lastRing) => {
        const zeroCell = snake.shift();
        initialArr[zeroCell.y][zeroCell.x] = 0;

        const currentHead = snake[snake.length - 1];
        initialArr[currentHead.y][currentHead.x] = 1;

        snake.push(lastRing)
        initialArr[lastRing.y][lastRing.x] = 2;
    }

    const checkReverse = (lastRing) => {
        const preLastRing = snake[snake.length - 2];
        const sameX = preLastRing.x === lastRing.x;
        const sameY = preLastRing.y === lastRing.y;

        return sameX && sameY;
    }

    const overGame = () => {
        clearInterval(runGame);
        alert('Game over! Reload page to restart');
    }

    switch (initialArr[lastRing.y][lastRing.x]) {
        case 1:
            if (!checkReverse(lastRing)) overGame();
            break;
        case '*':
            getPoint();
            break;
        default:
            shiftSnake(lastRing);
    }

    renderGame();
}

const runGame = setInterval(() => {
    move(snake, direction)
}, 500)

window.addEventListener('keydown', (e) => {
    let newDirection;

    switch (e.keyCode) {
        case 37 || 65:
            newDirection = 'left';
            break;
        case 38 || 87:
            newDirection = 'top';
            break;
        case 39 || 68:
            newDirection = 'right';
            break;
        case 40 || 83:
            newDirection = 'bottom';
            break;
    }

    const lastRing = { ...snake[snake.length - 1] };

    switch (newDirection) {
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

    const preLastRing = snake[snake.length - 2];
    const sameX = preLastRing.x === lastRing.x;
    const sameY = preLastRing.y === lastRing.y;

    if (!(sameX && sameY)) {
        direction = newDirection;
        move(snake, direction);
    }

    return;
});




