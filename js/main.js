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

const sleepingDog = new dog(5, 'purple', 'img/olderDog.jpg');
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

/*---cached elements---*/
 let message = document.querySelector('h2');
 let playAgainButton = document.querySelector('button');
 let tiles = [...document.querySelectorAll('.circles')];

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

//populate the board 
function populateBoard() {
 //we should probably use forEach to populate the board elements 
  tiles.forEach((circle, circleIdx) => {
    console.log('this is circle', circle);
    console.log('this is circleIdx', circleIdx);
    //this is just for testing
    //change to style.backgroundImage for actual program 
      tiles[circleIdx].style.backgroundColor = shuffledTiles[circleIdx].backgroundColor; 
      tiles[circleIdx].querySelector('img').setAttribute('src', shuffledTiles[circleIdx].backgroundImage); 
  });
 }

 function handleMove(event) {
  const tileIdx = tiles.indexOf(event.target);
  console.log('this is tileIdx in handleMove', tileIdx);
  
}


 //timer function that expires after 60 seconds 
 function renderClock(cbFunc) {Placeholder Text
  let count = 60;
  message.style.visibility = 'visible';
  message.innerText = count; 
  const timerID = setInterval(() => {
   count--
   if (count) {
    message.innerText = count;
   } else {
    clearInterval(timerId)
    message.style.visibility = 'hidden';
    cbFunc();
   }
  }, 60000)

 }
