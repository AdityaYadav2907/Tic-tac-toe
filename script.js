const boxes = document.querySelectorAll(".cell");
let xtrue = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winning_combo = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach(function (box) {
  box.onclick = function () {
    if (box.textContent === "" && !checkwinner()) {
      if (xtrue) {
        xshow(box);
        xtrue = false;
      } else {
        oshow(box);
        xtrue = true;
      }
      checkwinner();
    }
  };
});

let xScore = 0;
let oScore = 0;
function checkwinner() {
  for (let i = 0; i < winning_combo.length; i++) {
    const [a, b, c] = winning_combo[i];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      const winner = board[a];
      document.getElementById("winningMessageText").textContent = winner + " has won!";
      document.getElementById("winningMessage").style.display = "block";

      if (winner === "X") {
        xScore++;
        document.getElementById("xScore").textContent = xScore;
      } else if (winner === "O") {
        oScore++;
        document.getElementById("oScore").textContent = oScore;
      }

      return true;
    }
  }
  return false;
}


function xshow(box) {
  box.textContent = "X";
  box.classList.add("x");
  const i = parseInt(box.id);
  board[i] = "X";
}

function oshow(box) {
  box.textContent = "O";
  box.classList.add("o");
  const i = parseInt(box.id);
  board[i] = "O";
}

document.getElementById("restartButton").onclick = function () {
  boxes.forEach(function (box) {
    box.textContent = "";
    box.classList.remove("x", "o");
  });
  board = ["", "", "", "", "", "", "", "", ""];
  document.getElementById("winningMessageText").textContent = "";
  document.getElementById("winningMessage").style.display = "none";
};
