//===========FUNCTIONS============
var test = function () {
    if (state.firstPlayer) { state.firstPlayer = false; } else { state.firstPlayer = true; }
    renderApp();
};
var setCell = function (e) {

    var index = Number(e.target.id);
    state.currentCell = index;

    var board = state.boardCells.slice();
    var moves = state.boardMoves.slice();
    var fplayer = state.firstPlayer;

    helpers.renderBoardUnconfirmed(board, moves, function (returnedBoard) {
        state.boardCells = returnedBoard;
        renderApp();
    });


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

    state.boardCells = board;

    renderApp();
}

var makeMove = function () {

    var board = state.boardCells.slice();
    var winBoard = Object.assign({}, state.winnerBoard);
    var moves = state.boardMoves.slice();
    var currentCell = state.currentCell;
    var fplayer = state.firstPlayer;

    if (board[currentCell] != '-') {
        moves[currentCell] = true;

        if (fplayer) { fplayer = false; }
        else { fplayer = true; }


        //Updating the correspondent fields
        state.boardCells = board;
        state.boardMoves = moves;
        state.firstPlayer = fplayer;

        helpers.weHaveWinner(winBoard, board, function (winner, indices) {
            if (winner) {
                state.anyWinner = true;
                state.cellClickAction = null;
                state.winningCells = indices;
            };
        });

        renderApp();


    } else {
        alert('Please Make a Move!');
    }

}

//===========GLOBALS============
var ce = React.createElement;
var state = {
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
    cellClickAction: setCell,
    scoreButtonAction: makeMove
};


//===========COMPONENTS===========
var gameBoardRow = function (props) {
    //ce('div', { id: '0', className: "gameCell" });
    var out =
        ce('div', { className: "row" },
            props.data.cells.map(function (element, index) {
                // console.log(this.props);
                return ce('div', {
                    id: (index + props.data.id),
                    key: (index + props.data.id),
                    className: ((props.data.anyWinner) &&
                        (((index + Number(props.data.id)) == props.data.winningCells[0]) ||
                            ((index + Number(props.data.id)) == props.data.winningCells[1]) ||
                            ((index + Number(props.data.id)) == props.data.winningCells[2])))
                        ? "gameCell winner" : "gameCell",
                    onClick: props.data.action
                }, element);
            })
        );
    return out;
};
//gameBoardSection
class gameBoard extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        var out =
            ce('div', { className: "row" },
                ce(gameBoardRow, {
                    data: {
                        id: 0,
                        anyWinner: this.props.anyWinner,
                        cells: this.props.boardCells.slice(0, 3),
                        winningCells: this.props.winningCells,
                        action: this.props.cellClickAction
                    }
                }),
                ce(gameBoardRow, {
                    data: {
                        id: 3,
                        anyWinner: this.props.anyWinner,
                        cells: this.props.boardCells.slice(3, 6),
                        winningCells: this.props.winningCells,
                        action: this.props.cellClickAction
                    }
                }),
                ce(gameBoardRow, {
                    data: {
                        id: 6,
                        anyWinner: this.props.anyWinner,
                        cells: this.props.boardCells.slice(6, 9),
                        winningCells: this.props.winningCells,
                        action: this.props.cellClickAction
                    }
                })
            );

        return out;
    };
};

//gameScore Section
var gameScore = function (props) {

    var out =
        ce('div', { className: "row" },
            ce('div', { className: "row Player" },
                (props.anyWinner)
                    ? ((props.firstPlayer) ? "Winner: Player 2" : "Winner: Player 1")
                    : ((props.firstPlayer) ? "Player 1" : "Player 2")
            ),
            ce('div', { className: "row" },
                ce('input', {
                    id: "btnScore",
                    type: "button",
                    value: "Make Make Your Move!",
                    onClick: props.action
                })
            )
        );

    return out;
};

//Game
var game = function (props) {
    var out =
        ce('div', { className: props.cName },
            ce(gameBoard, {
                anyWinner: state.anyWinner,
                boardCells: state.boardCells,
                boardMoves: state.boardMoves,
                cellClickAction: state.cellClickAction,
                winningCells: state.winningCells
            }),
            ce(gameScore, {
                firstPlayer: state.firstPlayer,
                anyWinner: state.anyWinner,
                action: state.scoreButtonAction
            }));
    return (out);
};

//===== APP RENDERER =======
var renderApp = function () { ReactDOM.render(ce(game, { cName: "wrapper" }), document.getElementById('app')); };
//Rendering App
renderApp();



