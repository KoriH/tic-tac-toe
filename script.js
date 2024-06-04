// IIFE pattern
(function () {

    const InitiateConstants = (() => {
        const createDiv = () => {
            let grid = document.getElementById("grid");
            for (let i = 0; i < 9; i++) {
                let cell = document.createElement('div');
                let cellId = 'tile' + i;
                cell.setAttribute('id', cellId)
                cell.classList.add('cell');
                cell.addEventListener('click', () => {
                    GameController.markTile(cellId);
                })
                grid.appendChild(cell);
            }
        }

        

        return { createDiv }
    })();

    // Constructor for Gameboard object
    const GameBoard = (() => {
        // Gameboard
        let gameBoard = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']];
        
        // return the gameboard
        const getGameBoard = () => {
            return gameBoard;
        }

        const getGameBoardTile = (pos) => {
            const [i, j] = pos; //destruturing
            return gameBoard[i][j];
        }

        // reset it
        const resetGameBoard = () => {
            gameBoard = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']];
        }

        // change the values at speicific values
        const setGameBoard = (pos, val) => {
            const [i, j] = pos; //destruturing
            gameBoard[i][j] = val;
        }

        // So when the constructor returns we get the methods that we want to be able to access publically
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

        const mapTileToBoard = () => {
        }

        const getMapping = (tile) => {
            return mapping[tile];
        }

        return {mapping, getMapping};
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

        const getIsTurn = () => {
            return isTurn;
        }

        const changeTurn = () => {
            isTurn = !isTurn;
        }

        const markTile = (cellId) => {
            let XorO = "O";
            if (getIsTurn()) {
                XorO = "X";
            } else {
                XorO = "O";
            }
            changeTurn();
            GameBoard.setGameBoard(MapTiles.getMapping(cellId), XorO);
            markDiv(cellId);
        }

        const markDiv = (pos) => {
            let tile = document.getElementById(pos);
            let value = document.createElement('p');
            value.textContent = GameBoard.getGameBoardTile(MapTiles.getMapping(pos));
            tile.appendChild(value);
        }

        const checkMovesLeft = () => {
            
        }

        return { getIsTurn, changeTurn, markTile }

    }) ();
    window.GameController = GameController;

    // player
    const Player = (() => {

    }) ();

    // ai
    const Ai = (() => {

        const findBestMove = () => {

        };

        const miniMax = () => {

        }
    }) ();

})();
