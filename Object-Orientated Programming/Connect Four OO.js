/* PART ONE
**Make *Game* Into a Class**

The starter code contains a Connect Four game which is a bunch of disconnected functions and a few global variables.

This can make it hard to see how things work, and would make it hard to restart a game (quick—which variables would you have to reset to start a game?)

Let’s move this to being a class.

Initially, we’ll start with one class, ***Game***. The players will still just be numbers for player #1 and #2.

- What are the instance variables you’ll need on the ***Game***?
    - for example: height, width, and the board will move from global variables to instance attributes on the class. What else should move?
- Make a constructor that sets default values for these
- Move the current functions onto the class as methods
    - This will require mildly rewriting some of these to change how you access variables and call other methods

You should end up with all of the code being in the ***Game*** class, with the only other code being a single line at the bottom:
*/

/* PART TWO
**Small Improvements**

Make it so that you have a button to “start the game” — it should only start the game when this is clicked, and you should be able to click this to restart a new game.

Add a property for when the game is over, and make it so that you can’t continue to make moves after the game has ended.
*/

/* PART THREE
**Make Player a Class**

Right now, the players are just numbers, and we have hard-coded player numbers and colors in the CSS.

Make it so that there is a ***Player*** class. It should have a constructor that takes a string color name (eg, “orange” or “#ff3366”) and store that on the player instance.

The ***Game*** should keep track of the current player *object*, not the current player number.

Update the code so that the player pieces are the right color for them, rather than being hardcoded in CSS as red or blue.

Add a small form to the HTML that lets you enter the colors for the players, so that when you start a new game, it uses these player colors.
*/


/* CONNECT 4
 Player 1 and 2 alternate turns. On each turn, a piece is dropped down the column until a player gets four-in-a-row (horiz, vert, or diag) or until the board fills (tie).
 */

class Game {
    constructor(p1, p2, height = 6, width = 7) {
      this.players = [p1, p2];
      this.height = height;
      this.width = width;
      this.currPlayer = p1;
      this.makeBoard();
      this.makeHtmlBoard();
      this.gameOver = false;
    }
  
    /** makeBoard: create in-JS board structure:
     *   board = array of rows, each row is array of cells  (board[y][x])
     */
    makeBoard() {
      this.board = [];
      for (let y = 0; y < this.height; y++) {
        this.board.push(Array.from({ length: this.width }));
      }
    }
  
    /** makeHtmlBoard: make HTML table and row of column tops.  */
  
    makeHtmlBoard() {
      const board = document.getElementById('board');
      board.innerHTML = '';
  
      // make column tops (clickable area for adding a piece to that column)
      const top = document.createElement('tr');
      top.setAttribute('id', 'column-top');
  
      // store a reference to the handleClick bound function 
      // so that we can remove the event listener correctly later
      this.handleGameClick = this.handleClick.bind(this);
      
      top.addEventListener("click", this.handleGameClick);
  
      for (let x = 0; x < this.width; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
      }
  
      board.append(top);
  
      // make main part of board
      for (let y = 0; y < this.height; y++) {
        const row = document.createElement('tr');
      
        for (let x = 0; x < this.width; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }
      
        board.append(row);
      }
    }
  
    //findSpotForCol: given column x, return top empty y (null if filled)
  
    findSpotForCol(x) {
      for (let y = this.height - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }
  
    //placeInTable: update DOM to place piece into HTML board 
  
    placeInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.style.backgroundColor = this.currPlayer.color;
      piece.style.top = -50 * (y + 2);
  
      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }
  
    //endGame: announce game end
  
    endGame(msg) {
      alert(msg);
      const top = document.querySelector("#column-top");
      top.removeEventListener("click", this.handleGameClick);
    }
  
    //handleClick: handle click of column top to play piece
  
    handleClick(evt) {
      // get x from ID of clicked cell
      const x = +evt.target.id;
  
      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
  
      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
  
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }
  
      // check for win
      if (this.checkForWin()) {
        this.gameOver = true;
        return this.endGame(`The ${this.currPlayer.color} player won!`);
      }
  
      // switch players
      this.currPlayer =
        this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  
    //checkForWin: check board cell-by-cell for "does a win start here?" 
  
    checkForWin() {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      const _win = cells =>
        cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.height &&
            x >= 0 &&
            x < this.width &&
            this.board[y][x] === this.currPlayer
        );
  
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
  }
  
  class Player {
    constructor(color) {
      this.color = color;
    }
  }
  
  document.getElementById('start-game').addEventListener('click', () => {
    let p1 = new Player(document.getElementById('p1-color').value);
    let p2 = new Player(document.getElementById('p2-color').value);
    new Game(p1, p2);
  });