var arr = [[], [], [], [], [], [], [], [], []];
var temp = [[], [], [], [], [], [], [], [], []];
var board = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

function setTemp(board, temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        temp[i][j] = true;
      }
    }
  }
}

function setColor(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (temp[i][j] === true) {
        arr[i][j].style.color = "#DC3545";
      }
    }
  }
}

function resetColor() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j].style.color = "green";
    }
  }
}

function changeBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = '';
      }
    }
  }
}

function isPossible(board, sr, sc, val) {
  for (var row = 0; row < 9; row++) {
    if (board[row][sc] == val) {
      return false;
    }
  }

  for (var col = 0; col < 9; col++) {
    if (board[sr][col] == val) {
      return false;
    }
  }

  var r = sr - sr % 3;
  var c = sc - sc % 3;

  for (var cr = r; cr < r + 3; cr++) {
    for (var cc = c; cc < c + 3; cc++) {
      if (board[cr][cc] == val) {
        return false;
      }
    }
  }
  return true;
}

function solveSudokuHelper(board, sr, sc) {
  if (sr === 9) {
    changeBoard(board);
    return;
  }
  if (sc === 9) {
    solveSudokuHelper(board, sr + 1, 0);
    return;
  }

  if (board[sr][sc] !== 0) {
    solveSudokuHelper(board, sr, sc + 1);
    return;
  }

  for (var i = 1; i <= 9; i++) {
    if (isPossible(board, sr, sc, i)) {
      board[sr][sc] = i;
      solveSudokuHelper(board, sr, sc + 1);
      board[sr][sc] = 0;
    }
  }
}

function solveSudoku(board) {
  solveSudokuHelper(board, 0, 0);
}

var button = document.getElementById('generate-sudoku');
var solve = document.getElementById('solve');

button.onclick = function () {
  var staticBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  board = JSON.parse(JSON.stringify(staticBoard)); // Copy the static board to 'board' array

  setTemp(board, temp);
  resetColor();
  setColor(temp);
  changeBoard(board);
};

solve.onclick = function () {
  solveSudoku(board);
};
