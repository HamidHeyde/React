

var helpers = {};

helpers.weHaveWinner = function (winBoard,board,callback) {

    // var winBoard = Object.assign({}, refrence.state.winnerBoard);
    // var board = refrence.state.boardCells.slice();

    for (var key in winBoard) {
        var indices = winBoard[key];

        if ((board[indices[0]] == board[indices[1]]) &&
            (board[indices[1]] == board[indices[2]]) &&
            (board[indices[0]] !== '-')) {

            // refrence.state.winningCells = indices.slice();
            callback(true,indices);
            // return true;
        }
    }

    callback (false,false);
    // return false;
}


helpers.renderBoardUnconfirmed = function (board,moves,callback) {

    for (var i = 0; i < board.length; i++) {
        if ((!moves[i]) && (board[i] !== '-')) {
            board[i] = '-';
        }
    }

    callback(board);
}

