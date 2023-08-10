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
//we will keep all our images in an image array - and randomize their positioning everytime the game is initialized
//const imageArray = [];
const matchArray = Array.from(imageArray);
const mergedDogArray = imageArray.concat(matchArray);
console.log(mergedDogArray);
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
//holds our matched pairs when we find a match
let matchedPairsArray = [];

/*---cached elements---*/
 let messageEl = document.querySelector('h2');
 let playAgainButton = document.querySelector('button');
 let tiles = [...document.querySelectorAll('.circles')];
 let covers = [...document.querySelectorAll('.game-token')];
 console.log(covers);
//let tileIdx = tiles.indexOf(event.target);


/* --- event listeners ---  */
//enables player to reset the board for a new game
playAgainButton.addEventListener('click', initializeGame);
//allows the player to click on a tile to make a move
document.getElementById('board').addEventListener('click', handleMove);

/*----functions----*/

initializeGame();

//this function initializes each new game 
function initializeGame() {
  //the win condition will be set to null
 match = null;
 endCondition = null;
 //shuffle the tiles
 shuffledTiles = shuffleTiles(mergedDogArray)
 console.log(shuffledTiles);
 //populate the game board
  populateBoard();
  //start the clock
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

function populateBoard() {
 //we should probably use forEach to populate the board elements 
  tiles.forEach((circle, circleIdx) => {
    console.log('this is circle', circle);
    console.log('this is circleIdx', circleIdx);
     tiles[circleIdx].style.backgroundImage = shuffledTiles[circleIdx].backgroundImage; 
     tiles[circleIdx].querySelector('img').setAttribute('src', shuffledTiles[circleIdx].backgroundImage); 
   //  console.log( tiles[circleIdx].querySelector('img').setAttribute('src', shuffledTiles[circleIdx].backgroundImage));
  });
 }

 //compare the user's choices
 function compareChoices(firstChoice, secondChoice) {
  if (firstChoice.src === secondChoice.src) {
    console.log('Match');
    match = true;
  } else {
    console.log('Not a match');
    match = false;
  }
   return match;
}

function evaluatePairs(firstChoiceIdx, secondChoiceIdx, match) {
  console.log('this is evaluate pairs', evaluatePairs);
  console.log('this is firstChoiceIdx', firstChoiceIdx);
  console.log('this is secondChoiceIdx', secondChoiceIdx);
  console.log('this is match', match);
  if (match === true && matchedPairsArray.length <=16) {
    matchedPairsArray.push(firstChoiceIdx);
    matchedPairsArray.push(secondChoiceIdx);
  } else {
    showToken(firstChoiceIdx);
    showToken(secondChoiceIdx);
    hideDog(firstChoiceIdx);
    hideDog(secondChoiceIdx);
  }
  console.log('this is matched pairs array', matchedPairsArray)
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
  if (event.target.type === 'img') {
    return;
  }
  let tileIdx = tiles.indexOf(event.target);
  if (tileIdx === -1) {
    tileIdx = tiles.indexOf(event.target.parentElement);
  }
 // tiles[tileIdx].children[0].children[0].style.visibility = "visible";
 // console.log(tiles[tileIdx].children);
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
  let count = 60;
  messageEl.style.visibility = 'visible';
  messageEl.innerText = count; 
  const timerID = setInterval(() => {
   count--
   if (count) {
    messageEl.innerText = count;
   } else {
    clearInterval(timerID)
    messageEl.style.visibility = 'hidden';
    cbFunc();
   }
  }, 600)

 }

 function checkWinner() {
  if (matchedPairsArray.length === 16 && count >= 0) {
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
     messageBoardEl.innerText = "You win!"
     } else if (win === 'N') {
     messageBoardEl.innerText = "Try again!"
    }
  }
 }

 function renderButton() {
  playAgainButton.style.visibility = (win !== null) ? 'visible' : 'hidden';
 }

 