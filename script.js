let borderX = document.querySelector('.outline-border-x');
let borderO = document.querySelector('.outline-border-o');
let borderDraw = document.querySelector('.outline-border-draw');

let newRoundButton = document.querySelector('.new-round');
let newGameButton = document.querySelector('.new-game');
let resetRoundButton = document.querySelector('.reset-round');
let roundNumber = document.querySelector('.round-number');
let roundButton = document.querySelector('#round');
let continueRoundButton = document.querySelector('.continue-round');

let gameOverTag = document.querySelector('#game-over');
let gameOverMsg = document.querySelector('.who-won');

let line = document.querySelectorAll('.line');
let lineH = document.querySelector('.line-h');
let lineV = document.querySelector('.line-v');
let lineDl = document.querySelector('.line-dl');
let lineDr = document.querySelector('.line-dr');

let scoreBoardX = document.querySelector('.score-X');
let scoreBoardO = document.querySelector('.score-O');
let scoreBoardDraw = document.querySelector('.score-draw');

let position1 = document.querySelector('.position1');
let position2 = document.querySelector('.position2');
let position3 = document.querySelector('.position3');
let position4 = document.querySelector('.position4');
let position5 = document.querySelector('.position5');
let position6 = document.querySelector('.position6');
let position7 = document.querySelector('.position7');
let position8 = document.querySelector('.position8');
let position9 = document.querySelector('.position9');

setLocalStorage('@tic-tac-toe: isGameStarted', false);

let gameStatus = getLocalStorage('@tic-tac-toe: isGameStarted');

let score = getLocalStorage('@tic-tac-toe: games')
  ? getLocalStorage('@tic-tac-toe: games')
  : setLocalStorage('@tic-tac-toe: games', {
      round: 0,
      playerX: 0,
      playerO: 0,
      draw: 0
    });

if (score.round !== 0) {
  newGameButton.classList.remove('hide');
  continueRoundButton.classList.remove('hide');
  newRoundButton.classList.add('hide');
}

scoreBoardX.textContent = score.playerX ? score.playerX : '0';
scoreBoardO.textContent = score.playerO ? score.playerO : '0';
scoreBoardDraw.textContent = score.draw ? score.draw : '0';

function changeHTML(selector, content) {
  document.querySelector(selector).textContent = content;
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function searchHTMLElement(selector) {
  return document.querySelector(selector);
}

function changePlayersTurnHighlight(player, attribute) {
  if (player === 'X' && attribute === 'hide') {
    borderX.classList.add('hide');
  } else if (player === 'X' && attribute === 'show') {
    borderX.classList.remove('hide');
  } else if (player == 'O' && attribute === 'hide') {
    borderO.classList.add('hide');
  } else if (player == 'O' && attribute === 'show') {
    borderO.classList.remove('hide');
  }
}

function setPlayerWonHighlight(player) {
  if (player === 'X') {
    borderX.classList.remove('hide');
    borderX.classList.add('border-win');
  } else if (player === 'O') {
    borderO.classList.remove('hide');
    borderO.classList.add('border-win');
  } else if (player === 'draw') {
    borderDraw.classList.remove('hide');
    borderDraw.classList.add('border-win');
  }
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
function resetPlayerWonHighlight() {
  if (borderX) {
    borderX.classList.remove('border-win');
    changePlayersTurnHighlight('X', 'hide');
  }

  if (borderO) {
    borderO.classList.remove('border-win');
    changePlayersTurnHighlight('O', 'hide');
  }

  if (borderDraw) {
    borderDraw.classList.remove('border-win');
    borderDraw.classList.add('hide');
  }
}

function resetGame() {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  for (let i = 1; i <= 9; i++) {
    let position = '.position' + i;
    document.querySelector(position).textContent = ' ';
  }
  resetCrossLine();
  disabledOrAble('able');

  if (whoseTurn === 'O') {
    changeTurn();
  }
}

function resetCrossLine() {
  for (let i = 0; i < line.length; i++) {
    let divClassList = line[i].classList;
    for (let i = 0; i < divClassList.length; i++) {
      let divClass = divClassList[i];
      if (
        divClass !== 'line' &&
        divClass !== 'line-h' &&
        divClass !== 'line-dl' &&
        divClass !== 'line-v' &&
        divClass !== 'line-dr'
      ) {
        divClassList.remove(divClass);
      }
    }
  }
}

function startRound() {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  let gameScore = getLocalStorage('@tic-tac-toe: games');

  if (whoseTurn === null || whoseTurn === 'O') {
    setLocalStorage('@tic-tac-toe: turn', 'X');
  }
  changeHTML('.round-number', gameScore.round);

  newRoundButton.classList.add('hide');
  resetRoundButton.classList.remove('hide');
  round.classList.remove('hide');
  newGameButton.classList.add('hide');
  gameOverTag.classList.add('hide');
  continueRoundButton.classList.add('hide');

  setLocalStorage('@tic-tac-toe: isGameStarted', true);
}

function newRound() {
  startRound()
  let gameScore = getLocalStorage('@tic-tac-toe: games');

  if (gameScore.round === 0) {
    setLocalStorage('@tic-tac-toe: games', { ...gameScore, round: 1 });
    changeHTML('.round-number', gameScore.round + 1);
  } else {
    setLocalStorage('@tic-tac-toe: games', {
      ...gameScore,
      round: gameScore.round + 1
    });

    changeHTML('.round-number', gameScore.round + 1);
  }

  resetGame();
  resetPlayerWonHighlight();
  changePlayersTurnHighlight('X', 'show');
  setLocalStorage('@tic-tac-toe: isGameStarted', true);
}

function newGame() {
  let confirmNewGame = confirm(
    'Tem certeza que deseja começar um novo jogo? Os placares serão zerados.'
  );
  if (confirmNewGame) {
    resetScore();
    newRound();
    setLocalStorage('@tic-tac-toe: isGameStarted', true);
  } else {
    return
}
}

function changeTurn() {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  if (whoseTurn === 'X') {
    setLocalStorage('@tic-tac-toe: turn', 'O');
    changePlayersTurnHighlight('X', 'hide');
    changePlayersTurnHighlight('O', 'show');
  } else {
    setLocalStorage('@tic-tac-toe: turn', 'X');
    changePlayersTurnHighlight('O', 'hide');
    changePlayersTurnHighlight('X', 'show');
  }
}

function play(position) {
  let whoseTurn = getLocalStorage('@tic-tac-toe: turn');
  let isGameStarted = getLocalStorage('@tic-tac-toe: isGameStarted');
  position.setAttribute('disabled', 'disabled');

  if (isGameStarted === false) {
    alert('Por favor comece um novo jogo ou continue a rodada!');
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
  } else if ((playerX || playerO) && middleLineH) {
    lineH.classList.add('middle-line-h');
  } else if ((playerX || playerO) && lastLineH) {
    lineH.classList.add('last-line-h');
  } else if ((playerX || playerO) && firstLineV) {
    lineV.classList.add('first-line-v');
  } else if ((playerX || playerO) && middleLineV) {
    lineV.classList.add('middle-line-v');
  } else if ((playerX || playerO) && lastLineV) {
    lineV.classList.add('last-line-v');
  } else if ((playerX || playerO) && diagonalLeft) {
    lineDl.classList.add('diagonal-left');
  } else if ((playerX || playerO) && diagonalRight) {
    lineDr.classList.add('diagonal-right');
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
  let playerLowerCase = player.toLowerCase();
  let tag = 'game-over-' + playerLowerCase;
  
  setPlayerWonHighlight(player);
  gameOverTag.classList.remove('hide');
  gameOverTag.classList.add(tag);
  
  if (player === 'draw') {
    gameOverMsg.textContent = 'Empate';
    changePlayersTurnHighlight('O', 'hide');
    changePlayersTurnHighlight('X', 'hide');
  } else if(player === 'X') {
    gameOverMsg.textContent = player;
    changePlayersTurnHighlight('O', 'hide');
  } else {
    changePlayersTurnHighlight('X', 'hide');
    gameOverMsg.textContent = player;
  }

  newRoundButton.classList.remove('hide');
  resetRoundButton.classList.add('hide');
  newGameButton.classList.remove('hide');

  disabledOrAble('disabled');
}

function allPositionsAreFilled() {
  let positionsFilled = [];
  for (let i = 1; i <= 9; i++) {
    let position = '.position' + i;
    let currentPosition = document.querySelector(position).textContent;

    if (currentPosition === 'X' || currentPosition === 'O') {
      positionsFilled.push({ position: true });
    } else {
      positionsFilled.push({ position: false });
    }
  }

  for (let i = 0; i < positionsFilled.length; i++) {
    if (positionsFilled[i].position === false) {
      return false;
    }
  }

  return true;
}

function changeScore(player) {
  let findScore = '.score-' + player;
  let currentPlayer = 'player' + player;
  let previousScore = getLocalStorage('@tic-tac-toe: games');
  let newScore;

  if (player === 'draw') {
    newScore = previousScore[player] + 1;
    setLocalStorage('@tic-tac-toe: games', {
      ...previousScore,
      [player]: newScore
    });
  } else {
    newScore = previousScore[currentPlayer] + 1;
    setLocalStorage('@tic-tac-toe: games', {
      ...previousScore,
      [currentPlayer]: newScore
    });
  }

  changeHTML(findScore, newScore);
}

function resetScore() {
  setLocalStorage('@tic-tac-toe: games', {
    round: 0,
    playerX: 0,
    playerO: 0,
    draw: 0
  });
  changeHTML('.score-X', 0);
  changeHTML('.score-O', 0);
  changeHTML('.score-draw', 0);
}

function checkWhoWon() {
  if (
    checkIfWonHorizontally('X') ||
    checkIfWonVertically('X') ||
    checkIfWonDiagonally('X')
  ) {
    gameOver('X');
    changeScore('X');
  } else if (
    checkIfWonHorizontally('O') ||
    checkIfWonVertically('O') ||
    checkIfWonDiagonally('O')
  ) {
    gameOver('O');
    changeScore('O');
  } else if (allPositionsAreFilled()) {
    gameOver('draw');
    changeScore('draw');
  }
}
