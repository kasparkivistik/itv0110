var board;

function getId(x) {
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

function neighbours(size, x, y) {
    var list = [];
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            // square is not a neighbour of itself
            if (i === 0 && j === 0) continue;
            // check whether the the neighbour is inside board bounds
            if ((x + i) >= 0 && (x + i) < size && (y + j) >= 0 && (y + j) < size) {
                list.push([x + i, y + j]);
            }
        }
    }
    return list;
}

function drawBoard(board) {
    var table;
    table = "<table>";

    for (var i = 0; i < board.length; i++) {
        table += "<tr>";

        for (var j = 0; j < board.length; j++) {
            table += "<td class='boardCell' onclick='press(" + i + "," + j + ")'>x</td>";
        }
        table += "</tr>";
    }
    table += "</table";
    getId("place1").innerHTML = table;
}

function press(x, y) {
    console.log(x + " " + y);
}

function startGame() {
    var s, value, bombs;
    console.log("startGame");
    s = getId("sizeSelect");
    console.log("index: " + s.selectedIndex);
    value = s.options[s.selectedIndex].value;
    console.log(s);
    s = getId("bombs");
    bombs = s.value;
    console.log(bombs);
    if (!bombs) {
        alert("No bombs inserted");
    }


    var board = makeBoard(parseInt(value), parseInt(bombs));
    drawBoard(board);
}

function log(text) {
    var logString = getId("log");
    logString.value = logString.value + text;
}

// see on prax3 jaoks serveri asjad

var request;
var url;
var response;
var eresp;

function myUpdateFun() {
    console.log(request.readyState);
    if (request.readyState === 4) {
        console.log("Server is done!");
        if (request.status === 200) {
            console.log("Server sent data ok!");
            response = request.responseText;
            eresp = JSON.parse(response);
            console.log(eresp);
            var s = "";
            for (var i = 0; i < eresp.length; i++) {
                for (var j = 0; j < eresp[i]; j++) {
                    s += " " + eresp[i][j];
                }
            }
            getId("results").innerHTML = s;
        } else if (request.status === 404)
            alert("Request URL does not exist");
        else
            alert("Error: status code is " + request.status);
    }

}

function ajaxCall() {
    request = new XMLHttpRequest();
    url = "http://dijkstra.cs.ttu.ee/~tammet/cgi-bin/otsi.py";
    request.open("GET", url, true);
    request.onreadystatechange = myUpdateFun;
    request.send(null);
}
