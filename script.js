const boxes = document.querySelectorAll(".cell");
let xtrue = true;
let board = ["", "", "", "", "", "", "", "", ""];
const winningcombo = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameover = false;
let xscore = 0;
let oscore = 0;

boxes.forEach(function(b) {
    b.onclick = function() {
        if (gameover === false && b.textContent === '') {
            if (xtrue) {
                xshow(b);
                xtrue = false;
            } else {
                oshow(b);
                xtrue = true;
            }
            checkwinner();
        }
    };
});

function checkwinner() {
    for (let i = 0; i <= 7; i++) {
        const [a, b, c] = winningcombo[i];
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            document.getElementById("winningMessageText").textContent = board[a] + " has won!";
            document.getElementById("winningMessage").classList.add("show");
            gameover = true;
            if (board[a] === 'X') {
                xscore++;
                document.getElementById("countX").textContent = xscore;
            } else {
                oscore++;
                document.getElementById("countO").textContent = oscore;
            }
            return;
        }
    }

    if (!board.includes("") && !gameover) {
        document.getElementById("winningMessageText").textContent = "It's a draw!";
        document.getElementById("winningMessage").classList.add("show");
        gameover = true;
    }
}

function xshow(box) {
  box.textContent = "X";
  box.classList.add("x"); 
  let i = parseInt(box.id);
  board[i] = "X";
}

function oshow(box) {
  box.textContent = "O";
  box.classList.add("o"); 
  let i = parseInt(box.id);
  board[i] = "O";
}


document.getElementById("restartButton").onclick = function () {
  boxes.forEach(function (b) {
    b.textContent = "";
    b.classList.remove("x", "o"); 
  });
  board = ["", "", "", "", "", "", "", "", ""];
  document.getElementById("winningMessageText").textContent = "Who Wins";
  document.getElementById("winningMessage").classList.remove("show");
  gameover = false;
};


document.getElementById("resetscore").onclick = function () {
    xscore = 0;
    oscore = 0;
    document.getElementById("countX").textContent = xscore;
    document.getElementById("countO").textContent = oscore;
};
