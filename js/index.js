let boardSize = 4;

let gameState;

let emptyIndex;

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

let keyPressMap = {
    37: LEFT,
    38: UP,
    39: RIGHT,
    40: DOWN
};

let gameOver = false;

$(document).ready(function() {
    renderBoard();
});

function updateTile(value, pos, isRandom = false) {
    let tile = document.getElementById(pos);
    tile.className = 'game-tile';
    tile.textContent = '';
    if (value != 0) {
        tile.classList.add('cell-' + value.toString());
        if (isRandom)
            tile.classList.add('random-cell');
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
    updateTile(value, num, true);
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

    const gameStateShadow = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    gameState.forEach((e, i) => e.forEach((data, j) => gameStateShadow[i][j] = parseInt(new Number(data).toString())));
    let endCondition = !(moveTilesDown(gameStateShadow, false) && moveTilesUp(gameStateShadow, false) && moveTilesLeft(gameStateShadow, false) && moveTilesRight(gameStateShadow, false));
    endCondition = endCondition && emptyIndex.length == 0;
    return endCondition;
}

function renderBoard() {
    gameState = [];
    emptyIndex = [];
    for (var i = 0; i < boardSize; i++) {
        gameState.push([0, 0, 0, 0]);
    }

    for (var i = 0; i < boardSize * boardSize; i++) {
        emptyIndex.push(i);
    }

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

    playGame();
}

function printBoard(gameStatePrint) {
    for (var i = 0; i < boardSize; i++) {
        console.log(i.toString() + JSON.stringify(gameStatePrint[i]));
    }
}

function clearBoard() {
    var board = document.getElementById('board');
    board.innerHTML = '';
}

function playGame() {
    $(window).keydown(function(event) {
        if (event.keyCode in keyPressMap && !gameOver) {
            let move = keyPressMap[event.keyCode];
            let endCondition = gameTerminationCondition();
            if (endCondition) {
                gameOver = true;
                let confirmation = confirm(" Game Over ");
                if (confirmation) {
                    gameOver = false;
                }
                clearBoard();
                renderBoard();
                return;
            }
            switch (move) {
                case UP:
                    moveTilesUp(gameState);
                    break;
                case DOWN:
                    moveTilesDown(gameState);
                    break;
                case LEFT:
                    moveTilesLeft(gameState);
                    break;
                case RIGHT:
                    moveTilesRight(gameState);
                    break;
            }
        }
    });
}

function moveTilesUp(gameState, shouldUpdate = true) {
    console.log("CALLED UP", shouldUpdate)
    printBoard(gameState);
    let mergeFlag = false;
    let shiftFlag = false;
    for (var j = 0; j < boardSize; j++) {
        shiftFlag |= shiftUp(j, gameState);
        for (var i = 1; i < boardSize; i++) {
            if (gameState[i][j] != 0) {
                if (gameState[i - 1][j] == gameState[i][j]) {
                    gameState[i - 1][j] += gameState[i][j];
                    gameState[i][j] = 0;
                    i++;
                    mergeFlag = true;
                } else if (gameState[i - 1][j] == 0) {
                    gameState[i - 1][j] = gameState[i][j];
                    gameState[i][j] = 0;
                    mergeFlag = true;
                }
            }
        }
        shiftFlag |= shiftUp(j, gameState);
    }
    if ((mergeFlag || shiftFlag) && shouldUpdate) {
        updateBoard();
        fillRandomCell();
    }
    return mergeFlag || shiftFlag;
}

function moveTilesDown(gameState, shouldUpdate = true) {
    console.log("CALLED DOWN", shouldUpdate)
    printBoard(gameState);
    let mergeFlag = false;
    let shiftFlag = false;
    for (var j = 0; j < boardSize; j++) {
        shiftFlag |= shiftDown(j, gameState);
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
        shiftFlag |= shiftDown(j, gameState);
    }

    if ((mergeFlag || shiftFlag) && shouldUpdate) {
        updateBoard();
        fillRandomCell();
    }
    return mergeFlag || shiftFlag;
}

function moveTilesLeft(gameState, shouldUpdate = true) {
    console.log("CALLED LEFT", shouldUpdate)
    printBoard(gameState);
    let mergeFlag = false;
    let shiftFlag = false;
    for (var i = 0; i < boardSize; i++) {
        shiftFlag |= shiftLeft(i, gameState);
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
        shiftFlag |= shiftLeft(i, gameState);
    }

    if ((mergeFlag || shiftFlag) && shouldUpdate) {
        updateBoard();
        fillRandomCell();
    }
    return mergeFlag || shiftFlag;
}

function moveTilesRight(gameState, shouldUpdate = true) {
    console.log("CALLED RIGHT", shouldUpdate)
    printBoard(gameState);
    let mergeFlag = false;
    let shiftFlag = false;
    for (var i = 0; i < boardSize; i++) {
        shiftFlag |= shiftRight(i, gameState);
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
        shiftFlag |= shiftRight(i, gameState);
    }

    if ((mergeFlag || shiftFlag) && shouldUpdate) {
        updateBoard();
        fillRandomCell();
    }
    return mergeFlag || shiftFlag;
}

function shiftUp(col, gameState) {
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

function shiftDown(col, gameState) {
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

function shiftLeft(row, gameState) {
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

function shiftRight(row, gameState) {
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