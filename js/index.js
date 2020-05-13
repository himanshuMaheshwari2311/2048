let boardSize = 4;

let gameState = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];

$(document).ready(function() {
    renderBoard();
});

function renderBoard() {

    var board = document.getElementById('board');
    console.log(board);

    for (var i = 0; i < boardSize; i++) {
        var row = $('<tr></tr>').appendTo(board);
        for (var j = 0; j < boardSize; j++) {
            let text = 4 * i + j;
            row.append('<td class=\'game-tile\' id=\'' + text + '\'></td>');
        }
    }

    // init game state 
    let startPos1 = Math.floor(Math.random() * 16);
    let startPos2 = Math.floor(Math.random() * 16);
    console.log(startPos1);
    console.log(startPos2);
    for (; startPos1 == startPos2;) {
        startPos2 = Math.floor(Math.random() * 16);
    }
    gameState[startPos1] = gameState[startPos2] = 1;

    console.log(gameState);

    var tile = document.getElementById(startPos1);
    tile.classList.add('cell-2');
    tile.textContent = 2;
    var tile = document.getElementById(startPos2);
    tile.classList.add('cell-2');
    tile.textContent = 2;
}