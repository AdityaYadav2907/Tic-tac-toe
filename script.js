window.addEventListener('DOMContentLoaded', () => {
  const cellElements = document.querySelectorAll('[data-cell]');
  const board = document.getElementById('board');
  const winningMessage = document.getElementById('winningMessage');
  const winningMessageText = document.getElementById('winningMessageText');
  const restartButton = document.getElementById('restartButton');

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

  let oTurn;

  startGame();

  restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = ''; // ✅ Clear previous X/O
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.classList.remove('show');
}


  function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? 'o' : 'x';
  cell.classList.add(currentClass);
  cell.textContent = oTurn ? 'O' : 'X'; // ✅ Add this line

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
  }
}


  function endGame(draw) {
    if (draw) {
      winningMessageText.textContent = 'Draw!';
    } else {
      winningMessageText.textContent = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessage.classList.add('show');
  }

  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains('x') || cell.classList.contains('o');
    });
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }
});