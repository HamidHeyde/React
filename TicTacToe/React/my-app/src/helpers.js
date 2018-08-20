import React, { Component } from 'react';

var helpers = {};


helpers.weHaveWinner = function (refrence) {

    var winBoard = Object.assign({}, refrence.state.winnerBoard);
    var board = refrence.state.boardCells.slice();

    for (var key in winBoard) {
        var indices = winBoard[key];

        if ((board[indices[0]] == board[indices[1]]) &&
            (board[indices[1]] == board[indices[2]]) &&
            (board[indices[0]] !== '-')) {

            refrence.state.winningCells = indices.slice();
            return true;
        }
    }

    // callback (false,false);
    return false;
}


helpers.renderBoardUnconfirmed = function (refrence) {
    var board = refrence.state.boardCells.slice();
    var moves = refrence.state.boardMoves.slice();

    // board.map(function (element,i) {
    //     if ((!moves[i])&&(board[i]!=='-')) {  (board[i] = '-'); }
    // });

    for (var i = 0; i < board.length; i++) {
        if ((!moves[i]) && (board[i] !== '-')) {
            board[i] = '-';
        }
    }

    // this.setState(()=>{return {boardCells:board};});
    refrence.state.boardCells = board;
}

export default helpers;