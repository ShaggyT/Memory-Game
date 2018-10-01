# Memory Game
This is the project for Udacity's [ Front-End Web Developer](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001) Nanodegree Program. It was developed using HTMl, CSS, and JavaScript. It focuses on DOM manipulation and object-oriented programming.


## Project Overview

Memory Game is a complete browser-based card matching game (also known as Concentration).
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!


###  How the Game Works
- Each turn:

  - The player flips one card over to reveal its underlying symbol.
  - The player then turns over a second card, trying to find the corresponding card with the same symbol.
  - If the cards match, both cards stay flipped over.
  - If the cards do not match, both cards are flipped face down.
  - The user wins once all cards have been correctly matched and if the number of moves to match those cards are less than or equal to 12.
  - If the number of moves are greater than 12, and all cards weren't matched, the user lose the game.


###  Dependencies

- vanilla.js
- jQuery
- CSS3
- HTML5
- bootstrap
- font-awesome


## Installation

  1. Download or clone the repository
  ```
    - git clone git@github.com:ShaggyT/Memory-Game.git
    - cd Memory-Game
  ```
  2. Open the client folder and right click on ```index.html``` and choose a browser

  3. View in your browser

###  Live Preview
To play the game, [Click Here!](memorygameudacity.netlify.com)

###  Screenshots

<img src="img/screenshot1.png" width=294 margin=5 style="margin: 0px 5px">

<img src="img/screenshot2.png" width=300 style="margin: 0px 5px">

<img src="img/screenshot3.png" width=300 style="margin: 0px 5px">
