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

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (index >= 0 && index < board.length && board[index] ==='') {
            board[index] = mark;
        } else {
            console.log('Invalid Move');
        }
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '']
    };

    const checkWinner = () => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    const checkTie = () => {
        return board.every(cell => cell !== '');
    }

    return {
        getBoard,
        setMark,
        resetBoard,
        checkWinner,
        checkTie
    };
})();

const Player = (name, marker) => {
    return {name, marker};
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');


console.log(Gameboard.getBoard());

Gameboard.setMark(0, 'X');
console.log(Gameboard.getBoard());


Gameboard.setMark(1, 'X');
Gameboard.setMark(2, 'X');
console.log(Gameboard.getBoard());
console.log('Winner:', Gameboard.checkWinner());
console.log('Tie', Gameboard.checkTie());

Gameboard.resetBoard();
console.log(Gameboard.getBoard());