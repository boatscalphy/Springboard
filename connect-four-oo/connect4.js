/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {
  constructor(p1, p2) {
    this.width = 7;
    this.height = 6;
    this.gameActive = true;
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.players = [p1, p2];
    this.activePlayer = 1;
  };

  /** makeBoard: create in-JS board structure:
  *   board = array of rows, each row is array of cells  (board[y][x])
  */

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  };

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = "";
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    const handleClickCallback = this.handleClick.bind(this);
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', handleClickCallback);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    };

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
  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  };

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    const playerInd = (this.activePlayer) - 1;
    const playerColor = this.players[playerInd].color;
 
    if (playerColor) {
      piece.style.backgroundColor = playerColor;
    }
    
    else {
      piece.classList.add(`p${this.activePlayer}`);
    }

    piece.style.top = `${-50 * (y + 2)}px`;
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
    setTimeout(() => piece.style.top = 0, 0);
  };

  /** endGame: announce game end */

  endGame(msg) {
    this.gameActive = false;
    setTimeout(() => alert(msg), 500);
  };

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    
    if (this.gameActive) {
       // get x from ID of clicked cell
      const x = +evt.target.id;

      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }

      // place piece in board and add to HTML table
      this.board[y][x] = this.activePlayer;
      this.placeInTable(y, x);
      
      // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.activePlayer} won!`);
      }
      
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }
        
      // switch players
      this.activePlayer = this.activePlayer === 1 ? 2 : 1;
    }
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.activePlayer
      );
    }
  
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win.call(this, horiz) || _win.call(this, vert) || _win.call(this, diagDR) || _win.call(this, diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {

    let colorCheck = new Option().style;
    colorCheck.backgroundColor = color;

    if (colorCheck.backgroundColor) {
      this.color = color;
    }

    else {
      this.color = null;
    }

  }
}

const p1Color = document.getElementById('p1-color');
const p2Color = document.getElementById('p2-color');

document.querySelector("button").addEventListener('click', () => {
  const player1 = new Player(p1Color.value);
  const player2 = new Player(p2Color.value);
  p1Color.value = ""
  p2Color.value = ""

  const connectFour = new Game(player1, player2);
  connectFour.makeBoard();
  connectFour.makeHtmlBoard();
})

