import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import helpers from './helpers'

var BoardRow = function (props) {
    var out =
        <div className="row">
            {props.data.cells.map(function (element, index) {
                return <div
                    id={index + Number(props.data.id)}
                    key={index + Number(props.data.id)}
                    className=
                    {((props.data.anyWinner) &&
                        (((index + Number(props.data.id)) == props.data.winningCells[0]) ||
                            ((index + Number(props.data.id)) == props.data.winningCells[1]) ||
                            ((index + Number(props.data.id)) == props.data.winningCells[2])))
                        ? "gameCell winner" : "gameCell"}
                    onClick={props.data.action}>{element}</div>
            })}
        </div>;
    return out;
}

var Board = function (props) {
    var board = props.boardCells.slice();
    var out =
        <div className="row" >
            <BoardRow data={{
                id: 0, cells: board.slice(0, 3), action: props.cellClickAction,
                anyWinner: props.anyWinner, winningCells: props.winningCells
            }} />
            <BoardRow data={{
                id: 3, cells: board.slice(3, 6), action: props.cellClickAction,
                anyWinner: props.anyWinner, winningCells: props.winningCells
            }} />
            <BoardRow data={{
                id: 6, cells: board.slice(6, 9), action: props.cellClickAction,
                anyWinner: props.anyWinner, winningCells: props.winningCells
            }} />
        </div>;
    return out;

};

var Score = function (props) {
    var out =
        <div className="row" >
            <div className="row player">
                {(props.anyWinner)
                    ? ((props.firstPlayer) ? "Winner: Player 2" : "Winner: Player 1")
                    : ((props.firstPlayer) ? "Player 1" : "Player 2")}
            </div>
            <div className="row">
                <input type="button" value="Make Make Your Move!"
                    onClick={props.scoreButtonAction} />
            </div>
        </div>;
    return out;

};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCell: 0,
            firstPlayer: true,
            anyWinner: false,
            boardCells:
                ['-', '-', '-',
                    '-', '-', '-',
                    '-', '-', '-'],
            boardMoves:
                [false, false, false,
                    false, false, false,
                    false, false, false],
            winningCells: [2, 4, 6],
            winnerBoard:
            {
                '1': [0, 1, 2],
                '2': [3, 4, 5],
                '3': [6, 7, 8],
                '4': [0, 4, 8],
                '5': [2, 4, 6],
                '6': [0, 3, 6],
                '7': [1, 4, 7],
                '8': [2, 5, 8]
            },
            cellClickAction: this.setCell.bind(this),
            scoreButtonAction: this.makeMove.bind(this)
        };
    }

    makeMove = function () {

        var board = this.state.boardCells.slice();
        var winBoard = Object.assign({}, this.state.winnerBoard);
        var moves = this.state.boardMoves.slice();
        var currentCell = this.state.currentCell;
        var fplayer = this.state.firstPlayer;

        if (board[currentCell] != '-') {
            moves[currentCell] = true;

            if (fplayer) { fplayer = false; }
            else { fplayer = true; }

            this.setState(() => {
                return {
                    boardCells: board,
                    boardMoves: moves,
                    firstPlayer: fplayer
                };
            });


            if (helpers.weHaveWinner(this)) {

                this.setState(() => {
                    return {
                        anyWinner: true,
                        cellClickAction: null,
                    };
                });
            }


        } else {
            alert('Please Make a Move!');
        }

    }
    setCell = function (e) {

        // e.preventDefault();
        // e.stopPropagation();

        // console.log(window.history);
        // console.log(window.location);

        // window.history.pushState({}, null, e.target.id);
        

        // console.log(window.history);
        // console.log(window.location);

        helpers.renderBoardUnconfirmed(this);

        var index = Number(e.target.id);

        this.setState(() => { return { currentCell: index }; });
        // this.state.currentCell = index;

        var board = this.state.boardCells.slice();
        var moves = this.state.boardMoves.slice();
        var fplayer = this.state.firstPlayer;


        if (!moves[index]) {
            if (fplayer) {
                if (board[index] == '-') {
                    board[index] = 'X';
                } else if (board[index] == 'X') {
                    board[index] = '-';
                }
            } else {
                if (board[index] == '-') {
                    board[index] = 'O';
                } else if (board[index] == 'O') {
                    board[index] = '-';
                }
            }
        }

        this.setState(() => { return { boardCells: board }; });
        // this.state.boardCells = board;
    }


    render() {
        return (
            <div className="wrapper" >
                <Board
                    anyWinner={this.state.anyWinner}
                    boardCells={this.state.boardCells}
                    boardMoves={this.state.boardMoves}
                    cellClickAction={this.state.cellClickAction}
                    winningCells={this.state.winningCells} />
                <Score
                    anyWinner={this.state.anyWinner}
                    firstPlayer={this.state.firstPlayer}
                    scoreButtonAction={this.state.scoreButtonAction} />
            </div>
        );
    }
}

export default App;