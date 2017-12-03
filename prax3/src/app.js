var sizeValue;
var board;
var bombs;
var clicks;
var boardSize = document.getElementById("boardSize");
var playerName = document.getElementById("player");

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
    if (bombs <= 0 || playerName.value === "") {
        alert("Täida kõik lahtrid ära, ole nii armas ja ära pane nime sisse koma, sa tolgus");
    } else {
        board = makeBoard(sizeValue, bombs);
        if (board !== []) {
            drawBoard(board);
        }
    }
}

function clickElement(x, y, cell) {
    var playerName = document.getElementById("player").value;
    clicks += 1;
    if (board[parseInt(x)][parseInt(y)] === 1) {
        sendResults("Lost");
        log("Kaotus! Käike: " + clicks + ", mängu sooritas: " + playerName);
        if (confirm("Oh sind totukest, sa kaotasid")) {
            init();
        }
    } else {
        cell.innerHTML = neighbours(board.length, parseInt(x), parseInt(y));
        cell.style.backgroundColor = "dimgray";
        cell.onclick = null;
        if (Math.pow(board.length, 2) - bombs === clicks) {
            log("Võit! Käike: " + clicks + ", mängu sooritas: " + playerName);
            sendResults("Victory");
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
    txt.innerHTML = txt.innerHTML + text + "<br>";
}

function sendResults(wonOrLost) {
    var url;
    var player = document.getElementById("player").value;
    var boardValue = boardSize.options[boardSize.selectedIndex].value;
    var bombValue = document.getElementById("bombs").value;
    url = "http://dijkstra.cs.ttu.ee/~kkivis/cgi-bin/server.py";
    url += "?table=" + boardValue + "&player=" + player
        + "&bombs=" + bombValue + "&moves=" + clicks
        + "&state=" + wonOrLost;
    fetch(url).then(x => x.text());
}

function showResults() {
    var url = "http://dijkstra.cs.ttu.ee/~kkivis/cgi-bin/server.py?op=show";
    window.open(url, "server");
}

function saveResults() {
    if (playerName.value ===  "") {
        alert("Sisesta mängijale nimi, sa ei saa muud moodi salvestada");
    } else {
        $.ajax({
            type: "POST",
            url: "http://dijkstra.cs.ttu.ee/~kkivis/cgi-bin/score.py",
            data: JSON.stringify({
                boardSize: document.getElementById("bombs").value,
                player: document.getElementById("playerName").value,
                board: boardSize.options[boardSize.selectedIndex].value
            }),
            contentType: "application.json",
            dataType: 'json'
        });
    }
}
