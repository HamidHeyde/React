var gameCells = document.getElementsByClassName('gameCell');
for (var i = 0; i < gameCells.length; i++) {
    gameCells[i].onclick = function() {
        setCell(this);
    };
}
document.getElementsByTagName('input')[0].onclick = function() {
    makeMove();
};
var player = document.getElementsByClassName('player')[0];
var firstPlayer = true;
var currentCell;
var boardStatus = ['-', '-', '-',
    '-', '-', '-',
    '-', '-', '-'
];
var moveStatus = [false, false, false,
    false, false, false,
    false, false, false
];
var winnerBoard = {
    '1': [0, 1, 2],
    '2': [3, 4, 5],
    '3': [6, 7, 8],
    '4': [0, 4, 8],
    '5': [2, 4, 6],
    '6': [0, 3, 6],
    '7': [1, 4, 7],
    '8': [2, 5, 8]
};

var renderBoardUnconfirmed = function() {
    for (var key in gameCells) {
        var index = Number(key);
        if (!moveStatus[index]) {
            boardStatus[index] = '-';
            gameCells[key].innerHTML = '-';
        }
    }
};
var renderBoard = function() {
    for (var key in gameCells) {
        var index = Number(key);
        gameCells[key].innerHTML = boardStatus[index];
    }
};

renderBoard();

var setCell = function(cell) {

    //console.log(cell.innerHTML);
    var index = Number(cell.id);
    renderBoardUnconfirmed();

    currentCell = index;
    if (!moveStatus[index]) {
        if (firstPlayer) {
            if (boardStatus[index] == '-') {
                boardStatus[index] = 'X';
            } else if (boardStatus[index] == 'X') {
                boardStatus[index] = '-';
            }
        } else {
            if (boardStatus[index] == '-') {
                boardStatus[index] = 'O';
            } else if (boardStatus[index] == 'O') {
                boardStatus[index] = '-';
            }
        }
    }

    renderBoard();
};
var makeMove = function() {
    if (boardStatus[currentCell] != '-') {
        moveStatus[currentCell] = true;

        if (firstPlayer) {
            player.innerHTML = "Player 2";
            firstPlayer = false;
        } else {
            player.innerHTML = "Player 1";
            firstPlayer = true;
        }

        if (weHaveWinner()) {
            // alert('Yes');
            for (var key in gameCells) {
                var index = Number(key);
                gameCells[key].onclick = null;
            }

            if (firstPlayer) {
                player.innerHTML = "Winner: Player 1";
            } else {
                player.innerHTML = "Winner: Player 2";
            }

        } //  else { alert('no'); }

    } else {
        alert('Please Make a Move!');
    }

};

var weHaveWinner = function() {

    for (var key in winnerBoard) {
        var indices = winnerBoard[key];
        if ((boardStatus[indices[0]] == boardStatus[indices[1]]) &&
            (boardStatus[indices[1]] == boardStatus[indices[2]]) &&
            (boardStatus[indices[0]] !== '-')) {

            gameCells[indices[0]].classList.add('winner');
            gameCells[indices[1]].classList.add('winner');
            gameCells[indices[2]].classList.add('winner');

            return true;
        }
    }

    return false;
}