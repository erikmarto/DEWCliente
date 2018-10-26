const DEBUG = true;
let mine;
let gameDiv;
window.onload = function () {
    gameDiv = document.getElementById('game');
    gameDiv.addEventListener("contextmenu", function (evt) {
        evt.preventDefault(); return false;
    });

    let controlBtns = document.getElementById('btnGroup').getElementsByTagName('button');
    for (let i = 0; i < controlBtns.length; i++) {
        controlBtns[i].addEventListener('click', startGame, false);
    }

    if (DEBUG) {
        let debugButton = document.createElement('button');
        debugButton.id = 'showBoard';
        debugButton.className = 'btn btn-danger';
        debugButton.innerHTML = "Show whole board.";
        document.getElementById('btnGroup').appendChild(debugButton);
        debugButton.addEventListener('click', showBoard , false);

        debugButton = document.createElement('button');
        debugButton.id = 'showMines';
        debugButton.className = 'btn btn-danger';
        debugButton.innerHTML = "Show tiles with mines.";
        document.getElementById('btnGroup').appendChild(debugButton);
        debugButton.addEventListener('click', showMines , false);
    }
}

//clase celda
class Celda {
    constructor() {
        this.status = 'unclicked';
        this.hasBomb = false;
        this.isFlagged = false;
        this.surroundingBombs = 0;
    }

}

//clase tablero
class Minesweeper {
    constructor(rows, cols, maxMines, gameDiv) {
        this.rows = rows; //number of rows
        this.cols = cols; //number of columns
        this.maxMines = maxMines; //number of mines
        this.bombCoords = []; //position of every mine
        this.gameDiv = gameDiv; //html node containing the game
        this.gameBoard = []; //game board array
        this.flags = 0;
        this.isFirstClick = true;
    }

    /** Populates gameBoard and adds mines to it.
     * 
     */
    createBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.gameBoard[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.gameBoard[i][j] = new Celda();
            }
        }
    }

    /** Generates mines and populates board with them
     * 
     */
    genMines(clickX, clickY) {
        let _x;
        let _y;
        let _hasMine;

        //checks if mine is surrounded by the clicked tile so no mines generate on a 9x9 grid around it
        let _isOk = (n1, m1, n2, m2) => {
            let _nOk = n1 - n2 > 1 || n1 - n2 < -1;
            let _mOk = m1 - m2 > 1 || m1 - m2 < -1;
            return _mOk || _nOk;
        };

        while (this.bombCoords.length < this.maxMines) {
            _x = parseInt((Math.random()) * this.rows);
            _y = parseInt((Math.random()) * this.cols);

            //checks if cell in _x_y coords already has a bomb
            _hasMine = false;
            if (_isOk(clickX, clickY, _x, _y)) {
                for (let i = 0; i < this.bombCoords.length && !_hasMine; i++) {
                    if (_x == this.bombCoords[i][0] && _y == this.bombCoords[i][1]) {
                        _hasMine = true;
                    }
                }

                if (!_hasMine || this.bombCoords.length === 0) {
                    this.bombCoords.push([_x, _y]);
                }
            }
        }
        //adds mines to field
        for (let i = 0; i < this.bombCoords.length; i++) {
            _x = this.bombCoords[i][0];
            _y = this.bombCoords[i][1];
            //for debug purposes
            this.gameBoard[_x][_y].hasBomb = true;
        }

        for (let i = 0; i < this.bombCoords.length; i++) {
            this.calculateSurroundingMines(this.bombCoords[i]);
        }
    }

    drawBoard() {
        let _img;
        let _rowDiv;
        let _cells;
        //creates board and appends it to game node
        for (let i = 0; i < this.rows; i++) {
            _rowDiv = document.createElement('div');
            _rowDiv.className = "row gameRow";
            for (let j = 0; j < this.cols; j++) {
                _img = document.createElement('img');
                _img.id = i + "-" + j;
                _img.src = "img/blank.gif";
                _rowDiv.appendChild(_img);
            }
            this.gameDiv.appendChild(_rowDiv);
        }
        //event handlers
        _cells = this.gameDiv.getElementsByTagName('img');
        for (let i = 0; i < _cells.length; i++)
            _cells[i].addEventListener('mousedown', chkEvnt, false);
    }

    calculateSurroundingMines(bombLocation) {
        let _x = bombLocation[0];
        let _y = bombLocation[1];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (_x + i >= 0 && _x + i < this.rows && _y + j >= 0 && _y + j < this.cols) {
                    this.gameBoard[_x + i][_y + j].surroundingBombs++;
                }
            }
        }
    }

    drawCell(x, y, ele) {
        let _cell = this.gameBoard[x][y];
        let _draw = (x, y, img) => {
            document.getElementById(`${x}-${y}`).src = img;
        }
        switch (ele) {
            case 'mine':
                _draw(x, y, 'img/bombdeath.gif');
                break;
            case 'blank':
                _draw(x, y, `img/open${_cell.surroundingBombs}.gif`);
                break;
            case 'flag':
                _draw(x, y, `img/bombflagged.gif`);
                break;
            case 'unflag':
                _draw(x, y, `img/blank.gif`)
                break;
            default: break;
        }
    }

    checkCell(x, y, click, node) {
        let _currentCell = this.gameBoard[x][y];

        if (this.isFirstClick) {
            this.isFirstClick = false;
            this.genMines(x, y);
        }

        if (_currentCell.status === 'unclicked') { //checks if button has already been clicked
            console.log(x + '-' + y)
            switch (click) {
                case 1: //leftclick
                    _currentCell.status = 'clicked';
                    if (_currentCell.hasBomb) {
                        this.drawCell(x, y, 'mine');
                    } else {
                        this.drawCell(x, y, 'blank');
                        if (_currentCell.surroundingBombs === 0) {
                            //reveal all blanks
                        }
                    }
                    break;
                case 3: //rightclick
                    if (this.gameBoard[x][y].isFlagged) {
                        this.gameBoard[x][y].isFlagged = false;
                        this.flags--;
                        this.drawCell(x, y, 'unflag');

                    } else {
                        this.gameBoard[x][y].isFlagged = true;
                        this.flags++;
                        this.drawCell(x, y, 'flag');
                    }
                    break;
            }

        }
    }
/** Colors tiles which contain mines for debug purposes
     * 
     * 
     */
    showMinesDebug() {
        for (let i = 0; i < this.bombCoords.length; i++) {
            document.getElementById(`${this.bombCoords[i][0]}-${this.bombCoords[i][1]}`).src = "img/blankBomb.gif";
        }
    }
    /** Reveal the whole board.
     * 
     * 
     */
    showBoardDebug() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.checkCell(i, j, 1, document.getElementById(`${i}-${j}`));
    }
}



//methods
startGame = (e) => {
    let _ui = document.getElementById('minesweeper');

    _ui.removeChild(gameDiv);

    gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    gameDiv.className = 'container';

    _ui.appendChild(gameDiv);

    switch (e.target.id) {
        case 'principiante':
            mine = new Minesweeper(8, 8, 10, gameDiv);
            mine.createBoard();
            mine.drawBoard();
            break;
        case 'intermedio':
            mine = new Minesweeper(16, 16, 40, gameDiv);
            mine.createBoard();
            mine.drawBoard();
            break;
        case 'experto':
            mine = new Minesweeper(16, 31, 99, gameDiv);
            mine.createBoard();
            mine.drawBoard();
            break;
        case 'custom':
            let _x, _y, _m;
            _x = prompt("Enter rows: ");
            _y = prompt("Enter columns: ");
            _m = prompt("Enter mines: ");
            mine = new Minesweeper(_x, _y, _m, gameDiv);
            mine.createBoard();
            mine.drawBoard();
            break;
        default: break;
    }
}

chkEvnt = (e) => {
    let _targetNode = e.target;
    let _xy = _targetNode.id.split('-');
    let _x = _xy[0];
    let _y = _xy[1];
    let _click = e.which;

    mine.checkCell(_x, _y, _click, _targetNode);
}

showBoard = () => {
    if (mine != null)
        mine.showBoardDebug();
}

showMines = () => {
    if(mine != null)
        mine.showMinesDebug();
}