let XturnButton = document.querySelector('.turn-x');
let OturnButton = document.querySelector('.turn-o');
let newGameButton = document.querySelector('.new-game');
let resetGameButton = document.querySelector('.reset-game');

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

function resetGame() {
  for (let i = 1; i <= 9; i++) {
    let position = '.position' + i;
    document.querySelector(position).textContent = ' ';
  }
  XturnButton.classList.add('hide');
  OturnButton.classList.add('hide');
  newGameButton.classList.remove('hide');
  resetGameButton.classList.add('hide');
}

function newGame() {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  setLocalStorage('@tic-tac-toe: isGameStarted', true);

  if (lastGames === null) {
    setLocalStorage('@tic-tac-toe: games', [{ game: 1 }]);
  }

  if (whoseTurn === null || whoseTurn === "O") {
    setLocalStorage('@tic-tac-toe: turn', 'X');
  } else {
    console.log(lastGames);
    console.log(whoseTurn);
  }

  resetGame();

  resetGameButton.classList.remove('hide');
  newGameButton.classList.add('hide');
  XturnButton.classList.remove('hide');
}

function changeTurn() {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  if (whoseTurn === 'X') {
    setLocalStorage('@tic-tac-toe: turn', "O");
    XturnButton.classList.add('hide');
    OturnButton.classList.remove('hide');
  } else {
    setLocalStorage('@tic-tac-toe: turn', "X");
    OturnButton.classList.add('hide');
    XturnButton.classList.remove('hide');
  }
}

function play(position) {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  let isGameStarted = getLocalStorage('@tic-tac-toe: isGameStarted');

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