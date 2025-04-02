const cells = document.querySelectorAll('[data-cell]');
const ticTacToe = document.querySelector('.tic-tac-toe');
const winnerContainer = document.querySelector('.winner-container');
const winnerMessage = document.querySelector('.winner-message');
const ticTacToeContainer = document.querySelector('.tic-tac-toe-container');
const toggleButton = document.querySelector('.tic-tac-toe-toggle');
const resetButton = document.querySelector('.reset-button'); // Додано пошук кнопки перезапуску
let isCircleTurn = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.find(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    cell.classList.add(currentClass);
    cell.textContent = isCircleTurn ? 'O' : 'X';

    const winningCombination = checkWin(currentClass);
    if (winningCombination) {
        drawWinningLine(winningCombination, currentClass);
        showWinnerMessage(currentClass);
        return;
    }

    if (isDraw()) {
        showDrawMessage();
        return;
    }

    isCircleTurn = !isCircleTurn;
};

const drawWinningLine = (combination, currentClass) => {
    const line = document.createElement('div');
    line.classList.add('winning-line', currentClass);
    const [startIndex, , endIndex] = combination;
    const startCell = cells[startIndex];
    const endCell = cells[endIndex];

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
    const containerRect = ticTacToe.getBoundingClientRect();

    const x1 = startRect.left + startRect.width / 2 - containerRect.left;
    const y1 = startRect.top + startRect.height / 2 - containerRect.top;
    const x2 = endRect.left + endRect.width / 2 - containerRect.left;
    const y2 = endRect.top + endRect.height / 2 - containerRect.top;

    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    line.style.width = `${length}px`;
    line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
    ticTacToe.appendChild(line);
};

const showWinnerMessage = (currentClass) => {
    winnerMessage.textContent = `${currentClass === 'circle' ? 'Нулики' : 'Хрестики'} виграли!`;
    winnerContainer.style.display = 'flex';
};

const showDrawMessage = () => {
    winnerMessage.textContent = 'Нічия!';
    winnerContainer.style.display = 'flex';
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.classList.remove('x', 'circle');
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    const line = document.querySelector('.winning-line');
    if (line) line.remove();
    winnerContainer.style.display = 'none';
    isCircleTurn = false;
};

toggleButton.addEventListener('click', () => {
    const isHidden = ticTacToeContainer.style.display === 'none' || !ticTacToeContainer.style.display;
    ticTacToeContainer.style.display = isHidden ? 'flex' : 'none';
    toggleButton.textContent = isHidden ? '▼' : '▶';
});

resetButton.addEventListener('click', resetGame); // Додано обробник події для кнопки перезапуску

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});