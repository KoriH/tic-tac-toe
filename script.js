(function () {
    const GameBoard = (() => {
        let gameBoard = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']];
        console.log(gameBoard);
        
        const getGameBoard = () => {
            return gameBoard;
        }

        const resetGameBoard = () => {
            gameBoard = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']];
        }

        const setGameBoard = (i, j, val) => {
            gameBoard[i][j] = val;
        }

        return { getGameBoard, resetGameBoard, setGameBoard };
    })();
    window.GameBoard = GameBoard;
})();
