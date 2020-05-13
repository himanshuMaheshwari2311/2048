let boardSize = 4;

let gameState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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

function getTileId(x, y) {
    return x * boardSize + y;
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

    // init game state 
    let x1 = Math.floor(Math.random() * 4);
    let x2 = Math.floor(Math.random() * 4);
    let y1 = Math.floor(Math.random() * 4);
    let y2 = Math.floor(Math.random() * 4);
    console.log(x1, y1, x2, y2);
    if (x1 == x2) {
        x1 == 0 ? x1++ : x1--;
    }

    gameState[x1][y1] = gameState[x2][y2] = 2;

    var tile = document.getElementById(getTileId(x1, y1));
    tile.classList.add('cell-2');
    tile.textContent = gameState[x1][y1];
    var tile = document.getElementById(getTileId(x2, y2));
    tile.classList.add('cell-2');
    tile.textContent = 2;
    console.log(gameState);
    playGame();
}

function playGame() {
    $(window).keydown(function(event) {
        if (event.keyCode in keyPressMap) {
            console.log(keyPressMap[event.keyCode]);
        }

    })
}