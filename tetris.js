/* =================================
   TETRIS
================================= */

const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const COLS = 10;
const ROWS = 20;
const BLOCK = 18;

ctx.scale(BLOCK, BLOCK);

let board;
let piece;
let score = 0;
let lines = 0;
let gameRunning = false;
let dropCounter = 0;
let lastTime = 0;
let dropInterval = 700;


/* =================================
   PIECES
================================= */

const pieces = [
    [[1, 1, 1, 1]],

    [
        [1, 1],
        [1, 1]
    ],

    [
        [0, 1, 0],
        [1, 1, 1]
    ],

    [
        [0, 1, 1],
        [1, 1, 0]
    ],

    [
        [1, 1, 0],
        [0, 1, 1]
    ],

    [
        [1, 0, 0],
        [1, 1, 1]
    ],

    [
        [0, 0, 1],
        [1, 1, 1]
    ]
];


/* =================================
   RESET BOARD
================================= */

function createBoard() {

    return Array.from(
        { length: ROWS },
        () => Array(COLS).fill(0)
    );

}


/* =================================
   NEW PIECE
================================= */

function newPiece() {

    const shape =
        pieces[
            Math.floor(
                Math.random() * pieces.length
            )
        ];

    return {
        matrix: shape.map(row => [...row]),
        x: Math.floor(COLS / 2) - 1,
        y: 0
    };

}


/* =================================
   DRAW
================================= */

function draw() {

    ctx.fillStyle = "#0b1b1d";

    ctx.fillRect(
        0,
        0,
        COLS,
        ROWS
    );

    drawBoard();
    drawPiece();

}


/* =================================
   DRAW BOARD
================================= */

function drawBoard() {

    board.forEach((row, y) => {

        row.forEach((value, x) => {

            if (value) {

                ctx.fillStyle = "#FDC1AF";

                ctx.fillRect(
                    x,
                    y,
                    1,
                    1
                );

            }

        });

    });

}


/* =================================
   DRAW PIECE
================================= */

function drawPiece() {

    piece.matrix.forEach(
        (row, y) => {

            row.forEach(
                (value, x) => {

                    if (value) {

                        ctx.fillStyle =
                            "#ECEF8D";

                        ctx.fillRect(
                            piece.x + x,
                            piece.y + y,
                            1,
                            1
                        );

                    }

                }
            );

        }
    );

}


/* =================================
   COLLISION
================================= */

function collision() {

    for (
        let y = 0;
        y < piece.matrix.length;
        y++
    ) {

        for (
            let x = 0;
            x < piece.matrix[y].length;
            x++
        ) {

            if (
                piece.matrix[y][x] &&
                (
                    board[piece.y + y] === undefined ||
                    board[piece.y + y][piece.x + x] === undefined ||
                    board[piece.y + y][piece.x + x]
                )
            ) {

                return true;

            }

        }

    }

    return false;

}


/* =================================
   MERGE
================================= */

function merge() {

    piece.matrix.forEach(
        (row, y) => {

            row.forEach(
                (value, x) => {

                    if (value) {

                        board[
                            piece.y + y
                        ][
                            piece.x + x
                        ] = 1;

                    }

                }
            );

        }
    );

}


/* =================================
   ROTATE
================================= */

function rotatePiece() {

    const oldMatrix = piece.matrix;

    piece.matrix =
        piece.matrix[0].map(
            (_, index) =>
                piece.matrix.map(
                    row => row[index]
                ).reverse()
        );

    if (collision()) {

        piece.matrix = oldMatrix;

    }

}


/* =================================
   CLEAR LINES
================================= */

function clearLines() {

    let cleared = 0;

    outer:
    for (
        let y = ROWS - 1;
        y >= 0;
        y--
    ) {

        for (
            let x = 0;
            x < COLS;
            x++
        ) {

            if (!board[y][x]) {

                continue outer;

            }

        }

        board.splice(y, 1);

        board.unshift(
            Array(COLS).fill(0)
        );

        cleared++;
        y++;

    }

    if (cleared > 0) {

        lines += cleared;

        score +=
            cleared === 1 ? 100 :
            cleared === 2 ? 300 :
            cleared === 3 ? 500 :
            800;

        document.getElementById(
            "score"
        ).textContent = score;

        document.getElementById(
            "lines"
        ).textContent = lines;

    }

}


/* =================================
   DROP
================================= */

function drop() {

    piece.y++;

    if (collision()) {

        piece.y--;

        merge();

        clearLines();

        piece = newPiece();

        if (collision()) {

            gameOver();

        }

    }

    dropCounter = 0;

}


/* =================================
   MOVE
================================= */

function move(direction) {

    piece.x += direction;

    if (collision()) {

        piece.x -= direction;

    }

}


/* =================================
   GAME LOOP
================================= */

function update(time = 0) {

    if (!gameRunning) {

        draw();

        return;

    }

    const deltaTime =
        time - lastTime;

    lastTime = time;

    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {

        drop();

    }

    draw();

    requestAnimationFrame(update);

}


/* =================================
   START
================================= */

function startGame() {

    board = createBoard();

    score = 0;
    lines = 0;

    document.getElementById(
        "score"
    ).textContent = "0";

    document.getElementById(
        "lines"
    ).textContent = "0";

    piece = newPiece();

    gameRunning = true;

    lastTime = 0;
    dropCounter = 0;

    requestAnimationFrame(update);

}


/* =================================
   GAME OVER
================================= */

function gameOver() {

    gameRunning = false;

    ctx.fillStyle = "rgba(0,0,0,0.75)";

    ctx.fillRect(
        0,
        0,
        COLS,
        ROWS
    );

    ctx.fillStyle = "#FDC1AF";

    ctx.font = "1px monospace";

    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        COLS / 2,
        ROWS / 2
    );

}


/* =================================
   RESET
================================= */

function resetGame() {

    board = createBoard();

    score = 0;
    lines = 0;

    gameRunning = false;

    document.getElementById(
        "score"
    ).textContent = "0";

    document.getElementById(
        "lines"
    ).textContent = "0";

    draw();

}


/* =================================
   KEYBOARD
================================= */

document.addEventListener(
    "keydown",
    event => {

        if (!gameRunning) return;

        if (event.key === "ArrowLeft") {

            move(-1);

        }

        if (event.key === "ArrowRight") {

            move(1);

        }

        if (event.key === "ArrowDown") {

            drop();

        }

        if (event.key === "ArrowUp") {

            rotatePiece();

        }

        if (event.code === "Space") {

            while (!collision()) {

                piece.y++;

            }

            piece.y--;

            drop();

        }

        draw();

    }
);


/* =================================
   BUTTONS
================================= */

document.getElementById(
    "start"
).addEventListener(
    "click",
    startGame
);

document.getElementById(
    "reset"
).addEventListener(
    "click",
    resetGame
);


/* =================================
   INITIAL DRAW
================================= */

board = createBoard();

piece = newPiece();

draw();