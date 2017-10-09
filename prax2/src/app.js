var sizeValue;

function makeBoard(size, bombs) {
    var board = [];
    if (bombs >= size * size) {
        alert("Ära pane nii palju pomme, sa debiilik");
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
    var list = [];
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            if ((x + i) >= 0 && (x + i) < size && (y + j) >= 0 && (y + j) < size) {
                list.push([x + i, y + j]);
            }
        }
    }
    return list;
}

function startGame() {
    var size, bombs;
    size = document.getElementById("boardSize");
    sizeValue = size.options[size.selectedIndex].value;
    bombs = document.getElementById("bombs").value;
    if (!bombs) {
        alert("Sisesta palun mõni pomm ka, ole hea");
    } else {
        var board = makeBoard(sizeValue, bombs);
        drawBoard(board);
    }
}

function drawBoard(board) {
    var table;
    table = "<table>";

    for (var i = 0; i < board.length; i++) {
        table += "<tr>";

        for (var j = 0; j < board.length; j++) {
            var cellName = i + "_" + j;
            table += "<td id='" + cellName + "' onclick='clickElement(" + i + ", " + j + ", " + cellName + ", "+board+")'> </td>";
        }
        table += "</tr>";

    }
    table += "</table>";
    document.getElementById("tableLocation").innerHTML = table;
}

function clickElement(x, y, cellName, board) {
    if (board[parseInt(x)][parseInt(y)] === 1) {
        alert("You fucked up");
    } else {
        document.getElementById(cellName).value.innerHTML = neighbours(board.size, parseInt(x), parseInt(y));
    }
}