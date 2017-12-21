var http = require("http");
var url = require("url");

var chosenName;
var chosenOption;
var state;

var firstName;
var secondName;
var firstOption;
var secondOption;

var winStr;

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://dijkstra.cs.ttu.ee');
    var gameResultStr;
    var urlParts = url.parse(req.url, true);

    var parse = parseUrl(urlParts);
    var newGame = function () {
        shouldNewGameStart(parse);
    };
    var bothPlayers = function () {
        haveBothPlayersChosen(newGame());
    };
    var gameResult = function (res) {
        gameResultStr = getGameResult(bothPlayers());
    };
    gameResult();
    res.end(gameResultStr);
    chosenName = null;
    chosenOption = null;

}).listen(7842);

function getGameResult() {
    var str;
    if (winStr) {
        str = winStr;
    }
    return str;
}

function haveBothPlayersChosen() {
    if (!winStr) {
        if (chosenName && chosenOption && firstName && firstOption) {
            secondName = chosenName;
            secondOption = chosenOption;
            winStr = createGameResultStr();
        } else if (chosenName && chosenOption) {
            firstName = chosenName;
            firstOption = chosenOption;
        }
    }
}

function shouldNewGameStart() {
    if (state === "true") {
        clearVariables();
    }
}

function parseUrl(urlParts) {
    if (urlParts.query["reset"] === "false") {
        chosenName = urlParts.query["player"];
        chosenOption = urlParts.query["option"];
    }
    state = urlParts.query["reset"];
}

function clearVariables() {
    winStr = null;
    firstName = null;
    secondName = null;
    firstOption = null;
    secondOption = null;
}

function createGameResultStr() {
    var result = gameResult();
    if (result === 1) {
        return firstName + "  won";
    } else if (result === 2) {
        return secondName + " won";
    } else if (result === 3) {
        return "tie";
    }
}

function gameResult() {
    if (firstOption === "scissors") {
        if (secondOption === "paper") {
            return 1;
        } else if (secondOption === "rock") {
            return 2;
        } else {
            return 3;
        }
    } else if (firstOption === "paper") {
        if (secondOption === "scissors") {
            return 2;
        } else if (secondOption === "rock") {
            return 1;
        } else {
            return 3;
        }
    } else if (firstOption === "rock") {
        if (secondOption === "scissors") {
            return 1;
        } else if (secondOption === "paper") {
            return 2;
        } else {
            return 3;
        }
    }
}
