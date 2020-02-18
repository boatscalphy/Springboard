/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let gameActive = true;
let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let row = [];
  // Create array of null values with length of the width;
  for (let i = 0; i < WIDTH; i++) {
    row.push(null);
  };
  // Push array of null values from previous loop into board HEIGHT amount of times.
  for (let i = 0; i < HEIGHT; i++) {
    board.push([...row]);
  };

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  // Create first table row to give user options to drop piece into board.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // Within the first table row there will be WIDTH number of columns for users to place their piece.
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    // Create HEIGHT number of rows for the board.
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // Within each row there will need to be WIDTH number of cells for the pieces to be placed in.
      // Create and append WIDTH number of td tags to place into the tr created in the previous for loop.
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    // Once the row is filled with WIDTH td tags add that tr to the DOM.
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = (HEIGHT-1); i >= 0; i--) {
    if (board[i][x] === null) {
      return i
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  const tCell = document.getElementById(`${y}-${x}`);

  tCell.append(piece);

  piece.classList.toggle(`piece`);
  piece.classList.toggle(`player-${currPlayer}`);
  setTimeout( () => piece.classList.toggle(`dropped`),0);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(() => alert(msg), 500);
  gameActive = false;
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  if (gameActive) {
    let x = evt.target.id;
    // get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    board[y][x] = currPlayer;
    placeInTable(y, x);
  
    // check for win
    if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }
  
    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if (checkForTie()) {
      return endGame('Its a tie!')
    }
    // switch players
    // TODO: switch currPlayer 1 <-> 2
    currPlayer = currPlayer === 1 ? 2 : 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // First for loop iterates through the rows of the array starting at the first 1 which is the very top of the board.
  for (let y = 0; y < HEIGHT; y++) {
    // Second loop will iterate through the column of the array once the row is specified. board[y][x].
    // Once the x and y values are assigned in the for loop we can now create an array of 4 indices to check against the board and see if the current player owns a piece in each of the 4 indices.
    for (let x = 0; x < WIDTH; x++) {
      // Win condition is 4 consecutive peices either horizontally, vertically, diagonally going to the right or left.
      // Horizontal win condition will have the y static and increase x by 1 index 4 times. (ex: [[0,0], [0,1], [0,2], [0,3]])
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // Vertical win condition x stays static and y increases as the column stays the same but the row changes. (ex: [[0,0], [1,0], [2,0], [3,0]])
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // DiagDR condition is if a pieces move in the direction similar to a backslash (\). (ex: [[0,0],[1,1],[2,2],[3,3]])
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // DiagDL condition if a peices move in the direction similar to a forward slash (/) (ex: [[0,5],[1,4],[2,3],[3,4])
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // Use the _win function to check if any of the arrays (horiz, vert, diagDr, diagDL) contain only the currPlayer's peice if so there is a winner.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function checkForTie () {
  return !board.some((arr) => arr.includes(null));
}

makeBoard();
makeHtmlBoard();
