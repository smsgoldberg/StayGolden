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
let endCondition; 
let firstClickChoice;
let secondClickChoice;
let match;

/*---cached elements---*/
 let messageEl = document.querySelector('h2');
 let playAgainButton = document.querySelector('button');
 let tiles = [...document.querySelectorAll('.circles')];
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
  renderClock();
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
    //this is just for testing
    //change to style.backgroundImage for actual program 
      tiles[circleIdx].style.backgroundImage = shuffledTiles[circleIdx].backgroundImage; 
      tiles[circleIdx].querySelector('img').setAttribute('src', shuffledTiles[circleIdx].backgroundImage); 
  });
 }

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

 function handleMove(event) {
  const tileIdx = tiles.indexOf(event.target);
  console.log('this is tileIdx in handleMove', tileIdx);
  console.log(tiles[tileIdx]);
  tiles[tileIdx].children[0].style.visibility = "visible";
  if (!firstClickChoice) {
    firstClickChoice = tiles[tileIdx].children[0]
    console.log('this is firstClickChoice', firstClickChoice) 
  } else {
    secondClickChoice = tiles[tileIdx].children[0];
    console.log('this is secondClickChoice', secondClickChoice);
  }
  compareChoices(firstClickChoice, secondClickChoice);
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
