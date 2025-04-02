const cells = document.querySelectorAll('[data-cell]');
let isCircleTurn = false;

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'O' : 'X';
    cell.textContent = currentClass;
    cell.classList.add('taken');
    isCircleTurn = !isCircleTurn;
};

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});