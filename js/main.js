/*-- image array for objects--*/
const imageArray = [];

/*---objects---*/

class dog {
  constructor(number, backgroundColor, backgroundImage) {
      this.number = number;
      this.backgroundColor = backgroundColor;
      this.backgroundImage = backgroundImage; 
  }
}

const swimmingDog = new dog(1, 'blue', 'img/swimmingDog.jpg');
imageArray.push(swimmingDog);

const smilingDog = new dog(2, 'green', 'img/smilingDog.jpg');
imageArray.push(smilingDog);

const puppyDog = new dog(3, 'yellow', 'img/puppyDog.jpg');
imageArray.push(puppyDog);

const olderDog = new dog(4, 'red', 'img/olderDog.jpg');
imageArray.push(olderDog);

const sleepingDog = new dog(5, 'purple', 'img/sleepingDog.jpg');
imageArray.push(sleepingDog);

const beggingDog = new dog(6, 'white', 'img/beggingDog.jpg'); 
imageArray.push(beggingDog);

const ballDog = new dog(7, 'black', 'img/ballDog.jpg');
imageArray.push(ballDog);

const runningDog = new dog(8, 'orange', 'img/runningDog.jpg');
imageArray.push(runningDog);



/*-----constants -----*/
const matchArray = Array.from(imageArray);
const mergedDogArray = imageArray.concat(matchArray);
let shuffledTiles;


/*-----state variables ----*/
let board = [];
let player;
let win = null;
let count = 60;
let gameOver = false;
let firstClickChoice;
let secondClickChoice;
let firstClickChoiceIdx;
let secondClickChoiceIdx;
let match;
let timerId;
let matchedPairsArray = [];

/*---cached elements---*/
let messageEl = document.querySelector('h2');
let playAgainButton = document.querySelector('button');
let tiles = [...document.querySelectorAll('.circles')];
let covers = [...document.querySelectorAll('.game-token')];



/* --- event listeners ---  */

playAgainButton.addEventListener('click', () => {
  initializeGame(); 
});
//allows the player to click on a tile to make a move
document.getElementById('board').addEventListener('click', handleMove);

/*----functions----*/

initializeGame();

//this function initializes each new game 
function initializeGame() {
 matchedPairsArray = [];
 gameOver = false;
 win = null;
 match = null;
 shuffledTiles = shuffleTiles(mergedDogArray)
 populateBoard();
 clearInterval(timerId);
  renderClock(() => {
    checkWinner();
  }
  );
}

function shuffleTiles(dogArray) {
  let len = dogArray.length;
  let i;
   for (i = len -1; i >0; i--) {
     let j = Math.floor(Math.random() * i)
     let temp = dogArray[i];
     dogArray[i] = dogArray[j];
     dogArray[j] = temp;
   }
  return dogArray;
 }

 //populate the board by assigning an image from shuffledTiles to each circle
function populateBoard() {
  tiles.forEach((circle, circleIdx) => {
     tiles[circleIdx].querySelector('img').setAttribute('src', shuffledTiles[circleIdx].backgroundImage);
    hideDog(circleIdx);
    showToken(circleIdx);
  });
    playAgainButton.visibility = 'hidden';
 }


 function compareChoices(firstChoice, secondChoice) {
  if (firstChoice.src === secondChoice.src && firstClickChoiceIdx != secondClickChoiceIdx) {
    match = true;
  } else {
    match = false;
  }
   return match;
}

function evaluatePairs(firstChoiceIdx, secondChoiceIdx, match) {
  if (match === true && matchedPairsArray.length <=16) {
    matchedPairsArray.push(firstChoiceIdx);
    matchedPairsArray.push(secondChoiceIdx);
  } else {
    setTimeout(() => {
    showToken(firstChoiceIdx);
    showToken(secondChoiceIdx);
    hideDog(firstChoiceIdx);
    hideDog(secondChoiceIdx);
  }, 500);
  }
}


//display token
function showToken(tileIdx) {
  tiles[tileIdx].children[0].style.visibility="visible";
  console.log('this is showToken');
}


//hide token
function hideToken(tileIdx) {
  tiles[tileIdx].children[0].style.visibility="hidden";
}


 function handleMove(event) {
  if (event.target.tagName === 'IMG') {
    return;
  }
  let tileIdx = tiles.indexOf(event.target);
  if (tileIdx === -1) {
    tileIdx = tiles.indexOf(event.target.parentElement);
  }

  //if no first click has been made, the first move will be recorded here
  if (!firstClickChoice) {
    firstClickChoice = tiles[tileIdx].children[0].children[0];
    firstClickChoiceIdx = tileIdx;
   hideToken(tileIdx);
   showDog(firstClickChoice);
  } 
   //otherwise, the second click will be assigned
   else {
    secondClickChoice = tiles[tileIdx].children[0].children[0];
    secondClickChoiceIdx = tileIdx;
    hideToken(tileIdx);
    showDog(secondClickChoice);
    tiles[tileIdx].children[0].children[0].style.visibility = "visible";
    //compare the player's choices and evaluate the outcome
    let result = compareChoices(firstClickChoice, secondClickChoice);
    evaluatePairs(firstClickChoiceIdx, secondClickChoiceIdx, result);
    checkWinner();
    firstClickChoice = null, secondClickChoice = null;
  }
}

function showDog(clickChoice) {
  clickChoice.style.visibility="visible";
}

function hideDog(tileIdx) {
  tiles[tileIdx].children[0].children[0].style.visibility="hidden";
}

 //timer function that expires after 60 seconds 
 function renderClock(cbFunc) {
  count = 60;
  messageEl.style.visibility = 'visible';
  messageEl.innerText = count; 
  timerId = setInterval(() => {
   count--
   if (count && gameOver===false) {
    messageEl.innerText = count;
   } else {
    clearInterval(timerId);
    cbFunc();
   }
  }, 600)

 }

 function checkWinner() {
  if (matchedPairsArray.length === 16 && count > 0) {
    win = 'Y';
    gameOver = true;
    displayResults();
    renderButton();
} else if (matchedPairsArray.length < 16 && count === 0) {
    win = 'N';
    gameOver = true;
    displayResults();
    renderButton();
} else {
    return;
}

function displayResults() {
 if (win === 'Y') {
     messageEl.innerText = "You win!";
     } else if (win === 'N') {
     messageEl.innerText = "Try again!";
    }
  }
 }

 function renderButton() {
  playAgainButton.style.visibility = (win !== null) ? 'visible' : 'hidden';
 }

 