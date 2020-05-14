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
    tile.classList.add('cell-' + value.toString());
    tile.textContent = value;
}

function fillRandomCell() {
    let pos = Math.floor(Math.random() * (emptyIndex.length));
    num = emptyIndex[pos];

    let x1 = Math.floor(num / boardSize);
    let y1 = num % boardSize;

    let value = (Math.floor(Math.random() * 2) + 1) * 2;
    gameState[x1][y1] = value;

    updateEmptyIndeices();
    console.log(emptyIndex);
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

    console.log("Calling once");
    fillRandomCell();
    console.log("Calling Twice");
    fillRandomCell();
    console.log(gameState);
    playGame();
}

function playGame() {
    $(window).keydown(function(event) {
        if (event.keyCode in keyPressMap) {
            let move = keyPressMap[event.keyCode];
            switch (move) {
                case UP:
                    moveTilesUp();
                    break;
                case DOWN:
                    moveTilesDown();
                    break;
                case LEFT:
                    moveTilesLeft();
                    break;
                case RIGHT:
                    moveTilesRight();
                    break;
            }
        }
        console.log(gameState);
    });
}

function moveTilesUp() {
    // x--
    let upFlag = false;
    for (var j = 0; j < boardSize; j++) {
        for (var i = 1; i < boardSize; i++) {
            if (gameState[i][j] != 0) {
                if (gameState[i - 1][j] == gameState[i][j]) {
                    gameState[i - 1][j] += gameState[i][j];
                    gameState[i][j] = 0;
                    upFlag = true;
                } else if (gameState[i - 1][j] == 0) {
                    gameState[i - 1][j] = gameState[i][j];
                    gameState[i][j] = 0;
                    upFlag = true;
                }
            }
        }
        shiftColumn(j);
    }

    console.log(upFlag);
    if (upFlag)
        fillRandomCell();
}

function shiftColumn(col) {
    let count = 0;
    for (var i = 0; i < boardSize; i++) {
        if (gameState[i][col] != 0)
            gameState[count++][col] = gameState[i][col];
    }

    while (count < boardSize) {
        gameState[count++][col] = 0;
    }
}

function moveTilesDown() {

}

function moveTilesLeft() {

}

function moveTilesRight() {

}