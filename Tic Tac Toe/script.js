const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] || isGameOver) return;

  cells[index] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    status.textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
  } else if (!cells.includes(null)) {
    status.textContent = "It's a draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner(player) {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  return winCombinations.some(combination =>
    combination.every(index => cells[index] === player)
  );
}

resetBtn.addEventListener("click", () => {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  status.textContent = "Player X's turn";
  renderBoard();
});

// Initialize game
status.textContent = "Player X's turn";
renderBoard();
