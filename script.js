// IIFE pattern
(function () {

    const InitiateConstants = (() => {
        const createDiv = () => {
            let grid = document.getElementById("grid");
            for (let i = 0; i < 9; i++) {
                let cell = document.createElement('div');
                let cellId = 'tile' + i;
                cell.setAttribute('id', cellId);
                cell.classList.add('cell');
                cell.addEventListener('click', () => {
                    GameController.markTile(cellId);
                });
                grid.appendChild(cell);
            }
        }

        return { createDiv }
    })();

    // Constructor for Gameboard object
    const GameBoard = (() => {
        // Gameboard
        let gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];

        // return the gameboard
        const getGameBoard = () => {
            return gameBoard;
        }

        const getGameBoardTile = (pos) => {
            const [i, j] = pos; // destructuring
            return gameBoard[i][j];
        }

        // reset it
        const resetGameBoard = () => {
            gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
        }

        // change the values at specific values
        const setGameBoard = (pos, val) => {
            const [i, j] = pos; // destructuring
            gameBoard[i][j] = val;
        }

        return { getGameBoard, getGameBoardTile, resetGameBoard, setGameBoard };
    })();

    // tile to coordinate mapping
    const MapTiles = (() => {
        let mapping = {
            'tile0': [0, 0],
            'tile1': [0, 1],
            'tile2': [0, 2],
            'tile3': [1, 0],
            'tile4': [1, 1],
            'tile5': [1, 2],
            'tile6': [2, 0],
            'tile7': [2, 1],
            'tile8': [2, 2]
        };

        const getMapping = (tile) => {
            return mapping[tile];
        }

        return { mapping, getMapping };
    })();

    window.InitiateConstants = InitiateConstants;
    window.GameBoard = GameBoard;
    window.MapTiles = MapTiles;

    const initFunctions = [InitiateConstants.createDiv];

    window.onload = () => {
        initFunctions.forEach(fn => fn());
    }

    // turns
    const GameController = (() => {

        let isTurn = true;
        let gameActive = true;

        const getIsTurn = () => {
            return isTurn;
        }

        const changeTurn = () => {
            isTurn = !isTurn;
        }

        const markTile = (cellId) => {
            if (!gameActive || document.getElementById(cellId).innerText !== '') return; // Prevent marking an already marked tile or if game is over

            let XorO = isTurn ? "X" : "O";
            GameBoard.setGameBoard(MapTiles.getMapping(cellId), XorO);
            markDiv(cellId);
            if (checkIfWin()) {
                console.log(`Player with symbol ${XorO} wins!`);
                stopGame();
                return;
            }
            changeTurn();

            if (!isTurn) { // If it's AI's turn
                let bestMove = Ai.findBestMove(GameBoard.getGameBoard());
                GameBoard.setGameBoard(bestMove, "O");
                let cellId = Object.keys(MapTiles.mapping).find(key => MapTiles.mapping[key][0] === bestMove[0] && MapTiles.mapping[key][1] === bestMove[1]);
                markDiv(cellId);
                if (checkIfWin()) {
                    console.log(`Player with symbol O wins!`);
                    stopGame();
                }
                changeTurn();
            }
        }

        const markDiv = (pos) => {
            let tile = document.getElementById(pos);
            tile.innerText = GameBoard.getGameBoardTile(MapTiles.getMapping(pos));
        }

        const checkIfWin = () => {
            let gameBoard = GameBoard.getGameBoard();
            let checker = false;

            // Check the rows
            for (let i = 0; i < 3; i++) {
                let symbol = gameBoard[i][0];
                if (symbol !== '' && gameBoard[i].every(cell => cell === symbol)) {
                    checker = true;
                    return checker;
                }
            }

            // Check the columns
            for (let j = 0; j < 3; j++) {
                let symbol = gameBoard[0][j];
                if (symbol !== '' && gameBoard.every(row => row[j] === symbol)) {
                    checker = true;
                    return checker;
                }
            }

            // Check the diagonals
            let symbol = gameBoard[0][0];
            if (symbol !== '' && gameBoard[1][1] === symbol && gameBoard[2][2] === symbol) {
                checker = true;
                return checker;
            }

            symbol = gameBoard[0][2];
            if (symbol !== '' && gameBoard[1][1] === symbol && gameBoard[2][0] === symbol) {
                checker = true;
                return checker;
            }

            return checker;
        };

        const stopGame = () => {
            gameActive = false;
            console.log("Game stopped.");
        }

        return { getIsTurn, changeTurn, markTile, checkIfWin, stopGame }

    })();
    window.GameController = GameController;

    // ai
    const Ai = (() => {

        const findBestMove = (board) => {
            let bestVal = -Infinity;
            let bestMove = null;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = 'O';
                        let moveVal = minimax(board, 0, false);
                        board[i][j] = '';
                        if (moveVal > bestVal) {
                            bestMove = [i, j];
                            bestVal = moveVal;
                        }
                    }
                }
            }
            return bestMove;
        };

        const minimax = (board, depth, isMax) => {
            let score = evaluate(board);

            if (score === 10) return score - depth;
            if (score === -10) return score + depth;
            if (!isMovesLeft(board)) return 0;

            if (isMax) {
                let best = -Infinity;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] === '') {
                            board[i][j] = 'O';
                            best = Math.max(best, minimax(board, depth + 1, !isMax));
                            board[i][j] = '';
                        }
                    }
                }
                return best;
            } else {
                let best = Infinity;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] === '') {
                            board[i][j] = 'X';
                            best = Math.min(best, minimax(board, depth + 1, !isMax));
                            board[i][j] = '';
                        }
                    }
                }
                return best;
            }
        };

        const evaluate = (board) => {
            for (let row = 0; row < 3; row++) {
                if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
                    if (board[row][0] === 'O') return 10;
                    if (board[row][0] === 'X') return -10;
                }
            }

            for (let col = 0; col < 3; col++) {
                if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
                    if (board[0][col] === 'O') return 10;
                    if (board[0][col] === 'X') return -10;
                }
            }

            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                if (board[0][0] === 'O') return 10;
                if (board[0][0] === 'X') return -10;
            }

            if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                if (board[0][2] === 'O') return 10;
                if (board[0][2] === 'X') return -10;
            }

            return 0;
        };

        const isMovesLeft = (board) => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') return true;
                }
            }
            return false;
        };

        return { findBestMove };
    })();
    window.Ai = Ai;

})();
