var board;

function gid(x) {
    return document.getElementById(x);
}

function makeBoard(size, bombs) {
    var board = [];

    if (bombs >= size * size) throw "too many bombs for this size";

    // initialize board, filling with zeros
    for (var x = 0; x < size; x++) {
        board[x] = []; // insert empty subarray
        for (var y = 0; y < size; y++) board[x][y] = 0;
    }

    // now fill board with bombs in random positions
    var i = bombs;
    while (i > 0) {
        // generate random x and y in range 0...size-1
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
        // put bomb on x,y unless there is a bomb already
        if (board[x][y] !== 1) {
            board[x][y] = 1;
            i--; // bomb successfully positioned, one less to go
            //console.log("positioned "+x+", "+y+" yet to go "+i);
        }
    }

    return board;
}

function drawBoard(board) {
    var table;
    table = "<table>";

    for (var i = 0; i < board.length; i++) {
        table += "<tr>";

        for (var j = 0; j < board.length; j++) {
            table += "<td class='boardCell' onclick='press("+i+","+j+")'>x</td>";
        }
        table += "</tr>";
    }
    table += "</table";
    gid("place1").innerHTML = "uus sisu";
}

function press(x, y) {
    console.log(x + " " + y);
}

function startGame() {
    var s, value;
    console.log("startGame");
    s = gid("sizeselect");
    value = s.options[s.selectedIndex].value;
    console.log(s);

    var board = makeBoard(parseInt(value), 2);
    drawBoard(board);
}