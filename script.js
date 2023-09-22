let XturnButton = document.querySelector('.turn-x');
let OturnButton = document.querySelector('.turn-o');
let newGameButton = document.querySelector('.new-game');
let resetGameButton = document.querySelector('.reset-game');
let gameOverFlag = document.querySelector('#game-over-flag');
let winnerMsg = document.querySelector('#winner-msg');
let line = document.querySelector('.line');

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
  line.style.border = 'none';
  setLocalStorage('@tic-tac-toe: isGameStarted', false);
  disabledOrAble('able');
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

function lineHorizontally(player, position) {
  let playerX = player === 'X';
  let playerO = player === 'O';
  line.removeAttribute('style');

  let firstLine = position === 'first line';
  let middleLine = position === 'middle line';
  let lastLine = position === 'last line';

  console.log(playerX || playerO);
  console.log(middleLine);

  if ((playerX || playerO) && firstLine) {
    line.classList.add('first-line-h');
  } else if ((playerX || playerO) && middleLine) {
    line.classList.add('middle-line-h');
  } else if ((playerX || playerO) && lastLine) {
    line.classList.add('last-line-h');
  } else {
    console.log('entrou aqui');
  }
}

function wonHorizontally(player, position) {
  let firstLine =
    position1.textContent === player &&
    position2.textContent === player &&
    position3.textContent === player;
  let middleLine =
    position4.textContent === player &&
    position5.textContent === player &&
    position6.textContent === player;
  let lastLine =
    position7.textContent === player &&
    position8.textContent === player &&
    position9.textContent === player;

  if (firstLine) {
    lineHorizontally(player, 'first line');
    return true;
  } else if (middleLine) {
    lineHorizontally(player, 'middle line');
    return true;
  } else if (lastLine) {
    lineHorizontally(player, 'last line');
    return true
  } else {
    return false
  }
}

function gameOver(player) {
  if (player === 'X') {
    OturnButton.classList.add('hide');
  } else {
    XturnButton.classList.add('hide');
  }

  gameOverFlag.classList.remove('hide');
  winnerMsg.textContent = `${player} won!`;
  newGameButton.classList.remove('hide');
  resetGameButton.classList.add('hide');

  disabledOrAble('disabled');
}

function checkWhoWon() {
  if (
    wonHorizontally('X', 'first line') ||
    wonHorizontally('X', 'middle line') ||
    wonHorizontally('X', 'last line')
  ) {
    gameOver('X');
  } else if (
    wonHorizontally('O', 'first line') ||
    wonHorizontally('O', 'middle line') ||
    wonHorizontally('O', 'last line')
  ) {
    gameOver('O');
  }
}
