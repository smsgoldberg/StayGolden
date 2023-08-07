const imageArray = [];

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
imageArray.push(ballDog);

const runningDog = new dog(8, 'orange');
imageArray.push(runningDog);



/*-----constants -----*/
//we will keep all our images in an image array - and randomize their positioning everytime the game is initialized
//const imageArray = [];
const matchArray = Array.from(imageArray);
const mergedDogArray = imageArray.concat(matchArray);
console.log(mergedDogArray);
const shuffledTiles = shuffleTiles(mergedDogArray);


/*-----state variables ----*/
let board;
let player;
let endCondition; 

/*---cached elements---*/
 let scoreboard = document.querySelector('h2');
 let playAgainButton = document.querySelector('button');
 let tiles = [...document.querySelectorAll('.circles')];

/* --- event listeners ---  */
//enables player to reset the board for a new game
playAgainButton.addEventListener('click', initializeGame);

/*----functions----*/

initializeGame();

//this function initializes each new game 
function initializeGame() {
  //the win condition will be set to null
 endCondition = null;
 shuffleTiles(mergedDogArray);
 console.log(shuffledTiles);
  //populateBoard(shuffledTiles);
}

function shuffleTiles(dogArray) {
  let len = dogArray.length;
  let i;
  function shuffle() {
   for (i = len -1; i >0; i--) {
     let j = Math.floor(Math.random() * i)
     let temp = dogArray[i];
     dogArray[i] = dogArray[j];
     dogArray[j] = temp;
   }
  }
  return dogArray;
 }
//populate the board 
function populateBoard() {

}


