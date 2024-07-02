const Gameboard = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //return the current state of the board
    const getBoard = () => board;

    //sets the mark on target index
    const setMark = (index, mark) => {
        //check if the index is valid and the cell is empty
        if (index >= 0 && index < board.length && board[index] === '') {
            //in this spot, put mark
            board[index] = mark;
        } else {
            //log error if move is invalid
            console.log('Invalid Move');
        }
    };

    //resets to intial state
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    //check for winner
    const checkWinner = () => {
        //go down each [] in winingCombination
        for (let combination of winningCombinations) {
            //a b c takes on selected combination
            const [a, b, c] = combination;
            //if a has a mark, & a equals b, & a equals c and not empty
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                //then this letter inside is winner!
                return board[a];
            }
        }
        //or return no winner
        return null;
    };

    //check tie
    const checkTie = () => {
        //return tie is every cell is not ''
        return board.every(cell => cell !== '');
    };

    //makes these functions global
    return {
        getBoard,
        setMark,
        resetBoard,
        checkWinner,
        checkTie
    };
})();

//factory to make player objects
const Player = (name, marker) => {
    return { name, marker };
};

let player1;
let player2;
let currentPlayer;

const startGame = () => {
    const player1Name = document.getElementById('player1-name').value || 'Player 1';
    const player2Name = document.getElementById('player2-name').value || 'Player 2';

    player1 = Player(player1Name, 'X');
    player2 = Player(player2Name, 'O');
    currentPlayer = player1;

    document.getElementById('current-player').textContent = `Current Player: ${currentPlayer.name} (${currentPlayer.marker})`;

    Gameboard.resetBoard();
    renderGameboard();
}

//renders gameboard on website
const renderGameboard = () => {
    const gameboardContainer = document.getElementById('gameboard');
    gameboardContainer.innerHTML = '';

    //goes thru each cell to render
    Gameboard.getBoard().forEach((cell, index) => {
        //creates a div for current render
        const cellElement = document.createElement('div');
        //adds class of cell
        cellElement.classList.add('cell');
        //shows current mark
        cellElement.textContent = cell;
        //adds click on the index square
        cellElement.addEventListener('click', () => handleCellClick(index));
        //appends the stuff we have done
        gameboardContainer.appendChild(cellElement);
    });
};

//click on a index
const handleCellClick = (index) => {
    const messageElement = document.getElementById('message');
    if (Gameboard.getBoard()[index] === '') {
        //set mark on index with current players marker
        Gameboard.setMark(index, currentPlayer.marker);
        //show the board
        renderGameboard();

        //check winner
        const winner = Gameboard.checkWinner();
        if (winner) {
            messageElement.textContent = `${currentPlayer.name} (${currentPlayer.marker}) wins!`;
            Gameboard.resetBoard();
            renderGameboard();
            return;
        }

        //check tie
        if (Gameboard.checkTie()) {
            messageElement.textContent = 'It\'s a tie!';
            Gameboard.resetBoard();
            renderGameboard();
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.getElementById('current-player').textContent = `Current Player: ${currentPlayer.name} (${currentPlayer.marker})`;
        messageElement.textContent = '';
    } else {
        messageElement.textContent = 'Invalid move! Cell already taken.';
    }
};

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', startGame);

renderGameboard();