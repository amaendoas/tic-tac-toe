let XturnButton = document.querySelector('.turn-x');
let OturnButton = document.querySelector('.turn-o');
let newGameButton = document.querySelector('.new-game');
let resetGameButton = document.querySelector('.reset-game');
let gameOverFlag = document.querySelector('#game-over-flag');
let winnerMsg = document.querySelector('#winner-msg');
let line = document.querySelectorAll('.line');
let lineH = document.querySelector('.line-h');
let lineV = document.querySelector('.line-v');
let lineDl = document.querySelector('.line-dl');
let lineDr = document.querySelector('.line-dr');

let position1 = document.querySelector('.position1');
let position2 = document.querySelector('.position2');
let position3 = document.querySelector('.position3');
let position4 = document.querySelector('.position4');
let position5 = document.querySelector('.position5');
let position6 = document.querySelector('.position6');
let position7 = document.querySelector('.position7');
let position8 = document.querySelector('.position8');
let position9 = document.querySelector('.position9');

let lastGames = getLocalStorage('@tic-tac-toe: games');

setLocalStorage('@tic-tac-toe: isGameStarted', false);

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function disabledOrAble(status) {
  for (let i = 1; i <= 9; i++) {
    let position = '.position' + i;
    if (status === 'disabled') {
      document.querySelector(position).setAttribute('disabled', 'disabled');
    } else {
      document.querySelector(position).removeAttribute('disabled');
    }
  }
}

function resetGame() {
  for (let i = 1; i <= 9; i++) {
    let position = '.position' + i;
    document.querySelector(position).textContent = ' ';
  }
  XturnButton.classList.add('hide');
  OturnButton.classList.add('hide');
  newGameButton.classList.remove('hide');
  resetGameButton.classList.add('hide');
  gameOverFlag.classList.add('hide');

  resetCrossLine();

  setLocalStorage('@tic-tac-toe: isGameStarted', false);
  disabledOrAble('able');
}

function resetCrossLine() {
  for (let i = 0; i < line.length; i++) {
    let divClassList = line[i].classList
    for (let i = 0; i < divClassList.length; i++) {
      let divClass = divClassList[i];
      if(divClass !== "line" && divClass !== "line-h" && divClass !== 'line-dl' && divClass !== 'line-v' && divClass !== 'line-dr') {
        divClassList.remove(divClass);
      }
    }
  }
}

function newGame() {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');

  if (lastGames === null) {
    setLocalStorage('@tic-tac-toe: games', [{ game: 1 }]);
  }

  if (whoseTurn === null || whoseTurn === 'O') {
    setLocalStorage('@tic-tac-toe: turn', 'X');
  }

  resetGame();

  resetGameButton.classList.remove('hide');
  newGameButton.classList.add('hide');
  XturnButton.classList.remove('hide');
  setLocalStorage('@tic-tac-toe: isGameStarted', true);
}

function changeTurn() {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  if (whoseTurn === 'X') {
    setLocalStorage('@tic-tac-toe: turn', 'O');
    XturnButton.classList.add('hide');
    OturnButton.classList.remove('hide');
  } else {
    setLocalStorage('@tic-tac-toe: turn', 'X');
    OturnButton.classList.add('hide');
    XturnButton.classList.remove('hide');
  }
}

function play(position) {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  let isGameStarted = getLocalStorage('@tic-tac-toe: isGameStarted');
  position.setAttribute('disabled', 'disabled');

  if (isGameStarted === false) {
    alert('Please start a new game');
  } else if (whoseTurn === 'X') {
    position.textContent = 'X';
    position.style.color = '#48D2FE';
    changeTurn();
  } else if (whoseTurn === 'O') {
    position.textContent = 'O';
    position.style.color = '#E2BE00';
    changeTurn();
  }
}

function putCrossLine(player, position) {
  let playerX = player === 'X';
  let playerO = player === 'O';

  let firstLineH = position === 'first line h';
  let middleLineH = position === 'middle line h';
  let lastLineH = position === 'last line h';

  let firstLineV = position === 'first line v';
  let middleLineV = position === 'middle line v';
  let lastLineV = position === 'last line v';

  let diagonalLeft = position === 'diagonal left';
  let diagonalRight = position === 'diagonal right';

  if ((playerX || playerO) && firstLineH) {
    lineH.classList.add('first-line-h');
    console.log("ganhou na primeira linha horizontalmente")
  } else if ((playerX || playerO) && middleLineH) {
    lineH.classList.add('middle-line-h');
  } else if ((playerX || playerO) && lastLineH) {
    lineH.classList.add('last-line-h');
  } else if ((playerX || playerO) && firstLineV) {
    lineV.classList.add('first-line-v');
    console.log("ganhou na primeira linha verticalmente")
  } else if ((playerX || playerO) && middleLineV) {
    lineV.classList.add('middle-line-v');
  } else if ((playerX || playerO) && lastLineV) {
    lineV.classList.add('last-line-v');
  } else if ((playerX || playerO) && diagonalLeft) {
    lineDl.classList.add('diagonal-left');
  } else if ((playerX || playerO) && diagonalRight) {
    lineDr.classList.add('diagonal-right');
  } else {
    console.log('entrou aqui');
  }
}

function checkIfWonHorizontally(player) {
  let firstLineH =
    position1.textContent === player &&
    position2.textContent === player &&
    position3.textContent === player;
  let middleLineH =
    position4.textContent === player &&
    position5.textContent === player &&
    position6.textContent === player;
  let lastLineH =
    position7.textContent === player &&
    position8.textContent === player &&
    position9.textContent === player;

  if (firstLineH) {
    putCrossLine(player, 'first line h');
    return true;
  } else if (middleLineH) {
    putCrossLine(player, 'middle line h');
    return true;
  } else if (lastLineH) {
    putCrossLine(player, 'last line h');
    return true;
  } else {
    return false;
  }
}

function checkIfWonVertically(player) {
  let firstLineV =
    position1.textContent === player &&
    position4.textContent === player &&
    position7.textContent === player;
  let middleLineV =
    position2.textContent === player &&
    position5.textContent === player &&
    position8.textContent === player;
  let lastLineV =
    position3.textContent === player &&
    position6.textContent === player &&
    position9.textContent === player;

  if (firstLineV) {
    putCrossLine(player, 'first line v');
    return true;
  } else if (middleLineV) {
    putCrossLine(player, 'middle line v');
    return true;
  } else if (lastLineV) {
    putCrossLine(player, 'last line v');
    return true;
  } else {
    return false;
  }
}

function checkIfWonDiagonally(player) {
  let diagonalLeft =
    position1.textContent === player &&
    position5.textContent === player &&
    position9.textContent === player;
  let diagonalRight =
    position3.textContent === player &&
    position5.textContent === player &&
    position7.textContent === player;

    if (diagonalLeft) {
      putCrossLine(player, 'diagonal left');
      return true;
    } else if (diagonalRight) {
      putCrossLine(player, 'diagonal right');
      return true;
    } else {
      return false;
    }
}

function gameOver(player) {
  if (player === 'X') {
    OturnButton.classList.add('hide');
  } else {
    XturnButton.classList.add('hide');
  }

  if(player === 'X' || player === 'O') {
    winnerMsg.textContent = `${player} won!`;
  } else {
    winnerMsg.textContent = "It's a draw!";
    XturnButton.classList.add('hide');
    OturnButton.classList.add('hide');
  }

  gameOverFlag.classList.remove('hide');
  newGameButton.classList.remove('hide');
  resetGameButton.classList.add('hide');

  disabledOrAble('disabled');
}

function allPositionsAreFilled() {
  let positionsFilled = [];
  for (let i = 1; i <= 9; i++) {
    let position = '.position' + i;
    let currentPosition = document.querySelector(position).textContent

    if (currentPosition === 'X' || currentPosition === 'O') {
      positionsFilled.push({position: true})
    } else {
      positionsFilled.push({position: false})
    }    
  }

  for (let i = 0; i < positionsFilled.length; i++) {
    if(positionsFilled[i].position === false) {
      return false
    };
  }

  return true;
}

function checkWhoWon() {
  if (checkIfWonHorizontally('X') || checkIfWonVertically('X') || checkIfWonDiagonally('X')) {
    gameOver('X');
  } else if (checkIfWonHorizontally('O') || checkIfWonVertically('O') || checkIfWonDiagonally('O')) {
    gameOver('O');
  } else if(allPositionsAreFilled()) {
    gameOver('draw')
  }
}
