/*
 * Create a list that holds all of your cards
 */


let cardListIconClasses = [
'fa-diamond',
'fa-diamond',
'fa-paper-plane-o',
'fa-paper-plane-o',
'fa-anchor',
'fa-anchor',
'fa-bolt',
'fa-bolt',
'fa-cube',
'fa-cube',
'fa-bomb',
'fa-bomb',
'fa-leaf',
'fa-leaf',
'fa-bicycle',
'fa-bicycle'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardDeck = document.getElementById('deck');
cardDeck.classList.add('deck');
 let shuffledArray = shuffle(cardListIconClasses);

 for (let i = 0; i < 16; i++) {
   const newElement = document.createElement('li');
   newElement.classList.add('card');
   const iconElement = document.createElement('i');
   iconElement.classList.add('fa' , shuffledArray[i]);
   newElement.appendChild(iconElement);
   cardDeck.appendChild(newElement);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 // # of moves(flipping two cards will be considered as a move)

 let counter = 0;

 const numberOfMoves = () => {
   counter ++;
   const movesText = document.querySelector('.moves')
   if (counter === 1) {
     movesText.innerHTML = "1 move"
   } else {
     movesText.innerHTML = `${counter} moves`
   }
   const stars = document.querySelector('.stars');
   const starElement = document.getElementsByClassName('fa-star');
   if (counter == 12) {
     setTimeout(function () {
       alert("Game Over!!");
       stop();
     },100)
   } else if (counter == 9) {
     let secondStar = starElement[1];
     secondStar.classList.remove('fa-star');
   } else if (counter == 6) {
     let firstStar = starElement[0];
     firstStar.classList.remove('fa-star');
   }
 }


 // Start Button

 const header = document.querySelector('.header');
 const btn = document.createElement("BUTTON");        // Create a <button> element
 const btnText = document.createTextNode("start");       // Create a text node
 btn.appendChild(btnText);                                // Append the text to <button>
 header.appendChild(btn);
 btn.classList.add('start-btn');
 btn.setAttribute("style", "bvertical-align:middle;");
 btn.setAttribute("id", "startBtn");

 //  Cards preview when starting the game

 const startBtn = document.querySelector('.start-btn');
 startBtn.addEventListener('click', function () {
   const cards = document.getElementsByClassName('card');
   const cardsArray = Array.from(cards);
   setTimeout(function () {
     for (let card of cardsArray) {
       card.classList.add('show', 'open');
     }
   }, 100);
   setTimeout(function () {
     for (let card of cardsArray) {
       card.classList.remove('show', 'open');
     }
   }, 3000);
   start();
 });


 // flipping cards

 const allCards = document.querySelectorAll('.card');
 let openCards = [];
 let matchedCards = [];

 startBtn.addEventListener('click', function () {
   allCards.forEach(card => {
     card.addEventListener('click', function () {
       card.classList.add('flipInY');
       if(openCards.length < 2){
         if (!card.classList.contains('open') || !card.classList.contains('show')) {
           card.classList.add('show' , 'open');
           openCards.push(card);

           if (openCards.length == 2) {
             numberOfMoves();
             // If cards match
             if(openCards[0].childNodes[0].className === openCards[1].childNodes[0].className){
               openCards.forEach(card => {
                 card.classList.remove('show', 'open');
                 card.classList.add('match', "bounceIn");
                 matchedCards.push(card);
                 if(matchedCards.length === 16) {
                   setTimeout(function () {
                     let timeTakenToFinish = playDuration.split(" : ");
                      alert(`Congratulations .... You win!! it took you ${timeTakenToFinish[0]} min, ${timeTakenToFinish[1]} sec, and ${timeTakenToFinish[2]} mSec`);
                      stop();
                   }, 100);
                 }
               })
               openCards=[];
               // If cards don't match
             } else {
               openCards[0].classList.add('shake', 'incorrect');
               openCards[1].classList.add('shake', 'incorrect');

               setTimeout(function(){
                 openCards.forEach(card => {
                   card.classList.remove('show' , 'open', 'shake', 'incorrect');
                 })
                   openCards=[];
               }, 1000);
             }
          }
         }
       }

     });
   });
 });


 //  reset the game

 const reset = document.querySelector('.restart');

 reset.addEventListener('click', function () {
   const boardGrids = document.querySelectorAll('.card');
   boardGrids.forEach(grid => {
     if (grid.classList.contains('open') || grid.classList.contains('show') || grid.classList.contains('match')) {
       grid.classList.remove('show', 'open', 'match', 'bouncIn', 'flipInY');
     }

   })
   numberOfMoves(counter = -1);
   stopWatch.innerHTML = "00:00:00";
   location.reload();
 });


// Stop Button

const stopBtn = document.createElement("BUTTON");        // Create a <button> element
const stopBtnText = document.createTextNode("stop");       // Create a text node
stopBtn.appendChild(stopBtnText);                                // Append the text to <button>
header.appendChild(stopBtn);
stopBtn.classList.add('stop-btn');
stopBtn.setAttribute("style", "bvertical-align:middle;");
stopBtn.addEventListener('click', function () {
  stop();
})

//  Timer
const stopWatch = document.createElement('h1');
header.appendChild(stopWatch);
stopWatch.setAttribute("id", "timerLabel");
stopWatch.innerHTML = "00:00:00"

let status = 0; // 0:stop 1:running
let time = 0;

function start() {
  status = 1;

  setTimeout(function () {
    timer();
  }, 3200);
}

function stop() {
  status = 0;
}

let playDuration;
function timer() {
  if(status == 1){
    setTimeout(function(){
      time++;
      let min = Math.floor(time/100/60);
      let sec = Math.floor(time/100);
      let mSec = time % 100;

      if(min < 10) {
        min = "0" +min;
      }
      if(sec >= 60) {
        sec = sec %60;
      }
      if(sec < 10) {
        sec = "0" +sec;
      }

      playDuration = document.getElementById("timerLabel").innerHTML = `${min} : ${sec} : ${mSec}`;
      timer();
    }, 10 ) // delay = 10
  }
}

// Hint

const hintBtn = document.querySelector(".hintBtn");

hintBtn.addEventListener('click', function () {
  let randomIndex =   Math.floor(Math.random()*16);
  let firstHint = allCards[randomIndex]
  let firstHintAddClass = firstHint.classList.add('show', 'open', 'hint');
  allCards.forEach(card => {
    if (!card.classList.contains('open') && !card.classList.contains('hint') && (card.childNodes[0].classList.value.split(" ")[1] === allCards[randomIndex].childNodes[0].classList.value.split(" ")[1])) {
      card.classList.add('show' , 'open', 'hint');
    }
    setTimeout(function () {
      let firstHintRemoveClass = firstHint.classList.remove('show', 'open');
      card.classList.remove('show' , 'open');
    }, 2000);

  })

});
