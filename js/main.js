/*-----constants -----*/
//we will keep all our images in an image array - and randomize their positioning everytime the game is initialized
const imageArray = [];
const matchArray = imageArray.map();
const mergedDogArray = imageArray.concat(matchArray);

/*-----state variables ----*/
let board;
let player;
let endCondition; 

/*---cached elements---*/
 let scoreboard = document.querySelector(h2);
 let playAgainButton = document.querySelector(button);
 let tiles = document.querySelector('.circles');

/* --- event listeners ---  */
//enables player to reset the board for a new game
playAgainButton.addEventListener('click', initializeGame);

/*----functions----*/

initializeGame();

//this function initializes each new game 
function initializeGame() {
  //the win condition will be set to null
  endCondition = null;
  populateBoard();
}

//populate the board 
function populateBoard() {
   //first, let's shuffle the merged array 
 const shuffledDogArray =   shuffleTiles(mergedDogArray);

  //now let's try distributing the shuffled tiles across the board
  board.forEach((circle, circleIdx) => {
   console.log('this is circle', circle);
   console.log('this is circleIdx', circleIdx);
    circle[i] = shuffledDogArray[i];
  });

//shuffle the dog tiles
function shuffleTiles(dogArray) {
  let i, j, k;
  //let's at least try a fisher-yates shuffle
  //i should start at 0 since everything is zero-indexed
  for (i = 0; i < dogArray.length; i++) {
       j = Math.floor(Math.random() * (i +1));
       dogArray[i] = dogArray[j];
       dogArray[j] = dogArray[k];
  }
    return dogArray;
  }
}

/*---objects---*/

class dog {
    constructor(number, backgroundColor) {
        this.number = number;
        this.backgroundColor = backgroundColor;
    }
}

const swimmingDog = new dog(1, 'blue');
imageArray.push(swimmingDog);

const smilingDog = new dog(2, 'green');
imageArray.push(smilingDog);

const puppyDog = new dog(3, 'yellow');
imageArray.push(puppyDog);

const olderDog = new dog(4, 'red');
imageArray.push(olderDog);

const sleepingDog = new dog(5, 'purple');
imageArray.push(sleepingDog);

const jumpingDog = new dog(6, 'white'); 
imageArray.push(jumpingDog);

const ballDog = new dog(7, 'black');
imageArray,push(ballDog);

const runningDog = new dog(8, 'orange');
imageArray.push(runningDog);