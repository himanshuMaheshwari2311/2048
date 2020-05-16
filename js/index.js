let boardSize = 4;

let gameState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let emptyIndex = [
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
];

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const emptyRow = [0, 0, 0, 0];

let keyPressMap = {
    37: LEFT,
    38: UP,
    39: RIGHT,
    40: DOWN
};

$(document).ready(function() {
    renderBoard();
});

function updateTile(value, pos) {
    let tile = document.getElementById(pos);
    tile.className = 'game-tile';
    tile.textContent = '';
    if (value != 0) {
        tile.classList.add('cell-' + value.toString());
        tile.textContent = value;
    }
}

function updateBoard() {
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            updateTile(gameState[i][j], i * boardSize + j);
        }
    }
}

function fillRandomCell() {
    updateEmptyIndeices();
    let pos = Math.floor(Math.random() * (emptyIndex.length));
    num = emptyIndex[pos];

    let x1 = Math.floor(num / boardSize);
    let y1 = num % boardSize;

    let value = (Math.floor(Math.random() * 2) + 1) * 2;
    gameState[x1][y1] = value;

    updateEmptyIndeices();
    updateTile(value, num);
    return;
}

function updateEmptyIndeices() {
    list = [];
    for (var i = 0; i < boardSize; i++)
        for (var j = 0; j < boardSize; j++)
            if (gameState[i][j] == 0)
                list.push(i * boardSize + j);
    emptyIndex = list;
}

function gameTerminationCondition() {
    let gameStateShadow = [...gameState];
    let endCondition = moveTilesDown(gameStateShadow) && moveTilesUp(gameStateShadow) && moveTilesLeft(gameStateShadow) && moveTilesRight(gameStateShadow);
    endCondition &= emptyIndex.length == 0;
    console.log("Endcondition", endCondition);
    return endCondition;

}

function renderBoard() {

    var board = document.getElementById('board');

    for (var i = 0; i < boardSize; i++) {
        var row = $('<tr></tr>').appendTo(board);
        for (var j = 0; j < boardSize; j++) {
            let id = 4 * i + j;
            row.append('<td class=\'game-tile\' id=\'' + id + '\'></td>');
        }
    }
    updateEmptyIndeices();
    fillRandomCell();
    fillRandomCell();

    printBoard();
    playGame();
}

function printBoard() {
    for (var i = 0; i < boardSize; i++) {
        console.log(i.toString() + JSON.stringify(gameState[i]));
    }
}

function playGame() {
    $(window).keydown(function(event) {
        if (event.keyCode in keyPressMap) {
            let move = keyPressMap[event.keyCode];
            // gameTerminationCondition();
            switch (move) {
                case UP:
                    // console.log("Board:UP");
                    moveTilesUp(gameState);
                    break;
                case DOWN:
                    // console.log("Board:DOWN");
                    moveTilesDown(gameState);
                    break;
                case LEFT:
                    // console.log("Board:LEFT");
                    moveTilesLeft(gameState);
                    break;
                case RIGHT:
                    // console.log("Board:RIGHT");
                    moveTilesRight(gameState);
                    break;
            }
        }
        // printBoard();
    });
}

function moveTilesUp(gameState) {
    let mergeFlag = false;
    let shiftFlag = false;
    for (var j = 0; j < boardSize; j++) {
        shiftFlag |= shiftUp(j);
        for (var i = 1; i < boardSize; i++) {
            if (gameState[i][j] != 0) {
                if (gameState[i - 1][j] == gameState[i][j]) {
                    gameState[i - 1][j] += gameState[i][j];
                    gameState[i][j] = 0;
                    i++;
                    mergeFlag = true;
                } else if (gameState[i - 1][j] == 0) {
                    gameState[i - 1][j] = gameState[i][j];
                    mergeFlag[i][j] = 0;
                    flag = true;
                }
            }
        }
        shiftFlag |= shiftUp(j);
    }

    if (mergeFlag || shiftFlag) {
        fillRandomCell();
        updateBoard();
    }
    printBoard();
    return mergeFlag || shiftFlag;
}

function moveTilesDown(gameState) {
    let mergeFlag = false;
    let shiftFlag = false;
    for (var j = 0; j < boardSize; j++) {
        shiftFlag |= shiftDown(j);
        for (var i = boardSize - 2; i >= 0; i--) {
            if (gameState[i][j] != 0) {
                if (gameState[i + 1][j] == gameState[i][j]) {
                    gameState[i + 1][j] += gameState[i][j];
                    gameState[i][j] = 0;
                    i--;
                    mergeFlag = true;
                } else if (gameState[i + 1][j] == 0) {
                    gameState[i + 1][j] = gameState[i][j];
                    gameState[i][j] = 0;
                    mergeFlag = true;
                }
            }
        }
        shiftFlag |= shiftDown(j);
    }

    if (mergeFlag || shiftFlag) {
        fillRandomCell();
        updateBoard();
    }
    printBoard();
    return mergeFlag || shiftFlag;
}

function moveTilesLeft(gameState) {
    let mergeFlag = false;
    let shiftflag = false;
    for (var i = 0; i < boardSize; i++) {
        shiftflag |= shiftLeft(i);
        for (var j = 1; j < boardSize; j++) {
            if (gameState[i][j] != 0) {
                if (gameState[i][j - 1] == gameState[i][j]) {
                    gameState[i][j - 1] += gameState[i][j];
                    gameState[i][j] = 0;
                    j++;
                    mergeFlag = true;
                } else if (gameState[i][j - 1] == 0) {
                    gameState[i][j - 1] = gameState[i][j];
                    gameState[i][j] = 0;
                    mergeFlag = true;
                }
            }
        }
        shiftflag |= shiftLeft(i);
    }

    if (mergeFlag || shiftflag) {
        fillRandomCell();
        updateBoard();
    }
    printBoard();
    return mergeFlag || shiftflag;
}

function moveTilesRight(gameState) {
    let mergeFlag = false;
    let shiftflag = false;
    for (var i = 0; i < boardSize; i++) {
        shiftflag |= shiftRight(i);
        for (var j = boardSize - 2; j >= 0; j--) {
            if (gameState[i][j] != 0) {
                if (gameState[i][j + 1] == gameState[i][j]) {
                    gameState[i][j + 1] += gameState[i][j];
                    gameState[i][j] = 0;
                    j--;
                    mergeFlag = true;
                } else if (gameState[i][j + 1] == 0) {
                    gameState[i][j + 1] = gameState[i][j];
                    gameState[i][j] = 0;
                    mergeFlag = true;
                }
            }
        }
        shiftflag |= shiftRight(i);
    }

    if (mergeFlag || shiftflag) {
        fillRandomCell();
        updateBoard();
    }
    printBoard();
    return mergeFlag || shiftFlag;
}

function shiftUp(col) {
    let count = 0;
    const compareCol = [gameState[0][col], gameState[1][col], gameState[2][col], gameState[3][col]];
    for (var i = 0; i < boardSize; i++) {
        if (gameState[i][col] != 0)
            gameState[count++][col] = gameState[i][col];
    }

    while (count < boardSize) {
        gameState[count++][col] = 0;
    }
    const currentCol = [gameState[0][col], gameState[1][col], gameState[2][col], gameState[3][col]];
    return !(compareCol.toString() === currentCol.toString());
}

function shiftDown(col) {
    let count = boardSize - 1;
    const compareCol = [gameState[0][col], gameState[1][col], gameState[2][col], gameState[3][col]];
    for (var i = boardSize - 1; i >= 0; i--) {
        if (gameState[i][col] != 0)
            gameState[count--][col] = gameState[i][col];
    }

    while (count >= 0) {
        gameState[count--][col] = 0;
    }
    const currentCol = [gameState[0][col], gameState[1][col], gameState[2][col], gameState[3][col]];
    return !(compareCol.toString() === currentCol.toString());
}

function shiftLeft(row) {
    let count = 0;
    const compareRow = gameState[row].slice();
    for (var i = 0; i < boardSize; i++) {
        if (gameState[row][i] != 0)
            gameState[row][count++] = gameState[row][i];
    }

    while (count < boardSize) {
        gameState[row][count++] = 0;
    }

    return !(compareRow.toString() === gameState[row].toString());
}

function shiftRight(row) {
    let count = boardSize - 1;
    const compareRow = gameState[row].slice();
    for (var i = boardSize - 1; i >= 0; i--) {
        if (gameState[row][i] != 0)
            gameState[row][count--] = gameState[row][i];
    }

    while (count >= 0) {
        gameState[row][count--] = 0;
    }
    return !(compareRow.toString() === gameState[row].toString());
}