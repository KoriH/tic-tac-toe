// IIFE pattern
(function () {
    // Constructor for Gameboard object
    const GameBoard = (() => {
        // Gameboard
        let gameBoard = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']];
        
        // return the gameboard
        const getGameBoard = () => {
            return gameBoard;
        }

        // reset it
        const resetGameBoard = () => {
            gameBoard = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']];
        }

        // change the values at speicific values
        const setGameBoard = (i, j, val) => {
            gameBoard[i][j] = val;
        }

        // So when the constructor returns we get the methods that we want to be able to access publically
        return { getGameBoard, resetGameBoard, setGameBoard };
    })();

    // So that the gameboard is created on window load.
    window.GameBoard = GameBoard;
})();
