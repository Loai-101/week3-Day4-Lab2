// Store cached element references.
const sqr = document.querySelectorAll('.sqr');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');
const firstPlayer = document.querySelector('.firstPlayer');
const secondPlayer = document.querySelector('.secondPlayer');
const scoreX = document.getElementById('scoreX'); 
const scoreO = document.getElementById('scoreO');

// Win conditions array
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Game options array
let options = ['', '', '', '', '', '', '', '', ''];
let firstTurn = true;
let currentPlayer =  'X' || 'O';
let running = false;
let scoreXCount = 0;
let scoreOCount = 0;


// score start 0 - 0
scoreX.textContent = `Score X: ${scoreXCount}`;
scoreO.textContent = `Score O: ${scoreOCount}`;

firstPlayer.addEventListener('click', () => {
    if (firstTurn) {
        currentPlayer = 'X';
        firstTurn = false;
    }
    // log the current player
    console.log('firstPlayer X');
    console.log('secondPlayer O');
});

secondPlayer.addEventListener('click', () => {
    if (firstTurn) {
        currentPlayer = 'O';
        firstTurn = false;
    }
    // log the current player
    console.log('firstPlayer O');
    console.log('secondPlayer X');
});

initializeGame();

// Initialize game
function initializeGame() {
    sqr.forEach((sqr, index) => {
        sqr.addEventListener('click', sqrClicked);
        sqr.textContent = options[index];
    });
    restartButton.addEventListener('click', restartGame);
    running = true;
}

// Give the square clicked an index
function sqrClicked(event) {
    const sqrIndex = event.target.id;
    if (options[sqrIndex] != '' || !running) {
        return;
    }
    updateBoard(event.target, sqrIndex);
    checkWinner();
}

// Update the board with the current player's mark
function updateBoard(sqr, index) {
    options[index] = currentPlayer; // directly update board
    sqr.textContent = currentPlayer; // Show the current player's mark
}

// Check if the current player has won
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const sqrA = options[condition[0]];
        const sqrB = options[condition[1]];
        const sqrC = options[condition[2]];
        if (sqrA === '' || sqrB === '' || sqrC === '') {
            continue;
        }
        if (sqrA === sqrB && sqrB === sqrC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        updateScore(currentPlayer);
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes('')) {
        statusText.textContent = 'Draw!';
        running = false;
    } else {
        changePlayer();
    }
}

// Update score for the winning player
function updateScore(winner) {
    if (winner === 'X') {
        scoreXCount++;
        scoreX.textContent = `Score X: ${scoreXCount}`;
    } else if (winner === 'O') {
        scoreOCount++;
        scoreO.textContent = `Score O: ${scoreOCount}`;
    }
    console.log('scoreX' + ` ${scoreXCount}`);
    console.log('scoreO' + ` ${scoreOCount}`);
}

// Change the current player
function changePlayer() {
    // change the current player
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }else{
        currentPlayer = 'X';
    }
    statusText.textContent = `${currentPlayer}'s turn`;
    console.log(currentPlayer);
}


// Restart the game
function restartGame() {
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    sqr.forEach(sqr => sqr.textContent = '');
    running = true;
}

// Initialize the game
initializeGame();