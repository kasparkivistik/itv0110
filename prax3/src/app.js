var sizeValue;
var board;
var bombs;
var clicks;

function makeBoard(size, bombs) {
    board = [];
    if (bombs >= size * size) {
        alert("Ära pane nii palju pomme, sa totu");
    } else {
        for (var x = 0; x < size; x++) {
            board[x] = [];
            for (var y = 0; y < size; y++) board[x][y] = 0;
        }
    }

    var i = bombs;
    while (i > 0) {
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
        if (board[x][y] !== 1) {
            board[x][y] = 1;
            i--;
        }
    }
    return board;
}

function neighbours(size, x, y) {
    var count = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            if ((x + i) >= 0 && (x + i) < size && (y + j) >= 0 && (y + j) < size) {
                if (board[x + i][y + j] === 1) {
                    count += 1;
                }
            }
        }
    }
    return count;
}

function init() {
    var size;
    clicks = 0;
    size = document.getElementById("boardSize");
    sizeValue = size.options[size.selectedIndex].value;
    bombs = document.getElementById("bombs").value;
    if (bombs <= 0) {
        alert("Sisesta palun mõni pomm ka, ole hea");
    } else {
        board = makeBoard(sizeValue, bombs);
        if (board !== []) {
            drawBoard(board);
        }
    }
}

function clickElement(x, y, cell) {
    clicks += 1;
    if (board[parseInt(x)][parseInt(y)] === 1) {
        if (confirm("Oh sind totukest, sa kaotasid")) {
            init();
        }
        log("Kaotus! Käike: " + clicks + ", mängu sooritas: " + document.getElementById("playerName").value);
    } else {
        cell.innerHTML = neighbours(board.length, parseInt(x), parseInt(y));
        cell.style.backgroundColor = "dimgray";
        if (Math.pow(board.length, 2) - bombs === clicks) {
            log("Võit! Käike: " + clicks + ", mängu sooritas: " + document.getElementById("playerName").value);
            sendResults();
            if (confirm("Hea töö, tegid ära mängu")) {
                init();
            }
        }
    }
}

function drawBoard() {
    var table = "<table>";
    for (var i = 0; i < board.length; i++) {
        table += "<tr>";
        for (var j = 0; j < board.length; j++) {
            var cellId = "id_" + i + "_" + j;
            table += "<td id=" + cellId + " onclick='clickElement(" + i + "," + j + "," + cellId + ")'></td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    document.getElementById("tableLocation").innerHTML = table;
}

function log(text) {
    var txt = document.getElementById("labelLog");
    txt.innerHTML =  txt.innerHTML + text + "<br>";
}

// see on prax3 jaoks serveri asjad

/*var request;
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
*/

function sendResults() {
    var url;
    var player = document.getElementById("playerName");
    var boardSize = document.getElementById("boardSize");
    boardSize = boardSize.options[boardSize.selectedIndex].value;
    var bombValue = document.getElementById("bombs").value;
    url = "http://dijkstra.cs.ttu.ee/~kkivis/cgi-bin/results.py";
    url += "?board=" + boardSize + "&player=" + player + "&bombs=" + bombValue;
    fetch(url).then(r => r.text()).then();
}

function showResults() {
    var url = "http://dijkstra.cs.ttu.ee/~kkivis/cgi-bin/results.py";
    window.open(url, "results");
}