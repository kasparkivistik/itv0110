var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function (req, res) {
    if (req.url.indexOf("/start") > -1) {
        start(req, res);
    } else if (req.url.indexOf("/waiting") > -1) {
        waiting(req, res);
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<head><meta charset="UTF-8"/><link rel="stylesheet" href="https://www.bootswatch.com/3/superhero/bootstrap.min.css"/></head>');
        res.write('<body style="position: relative; text-align: center;"><form style="display: inline-block; vertical-align: middle;" action="/start">');
        res.write('<div>see koht kus mihkel raual see saade on<br></div>');
        res.write('Nimi: <input type="text" name="name" required><br>');
        res.write('<input type="radio" name="value" value="rock" checked/> Kivi<br>');
        res.write('<input type="radio" name="value" value="paper"/> Paber<br>');
        res.write('<input type="radio" name="value" value="scissors"/> Käärid<br>');
        res.write('<input type="submit" value="Alusta"/>');
        res.write('</form>');
        res.write('</body></html>');
        res.end();
    }
}).listen(7938);
console.log('Server running!');

function start(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    fs.readFile('state.json', 'utf8', function (err, data) {
        if (err || !data || data === "") {
            fs.writeFile('state.json', '{}', 'utf8');
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write('<head><meta charset="UTF-8"/><link rel="stylesheet" href="https://www.bootswatch.com/3/superhero/bootstrap.min.css"/></head>');
            res.write('<div>Tekkis viga proovi uuesti.</div><br>');
            res.write('<a href="../">tagasi</a>');
            res.end();
        } else {
            play(query, res, data);
        }
    });
}

function play(query, res, data) {
    var obj = JSON.parse(data);
    var count = Object.keys(obj).length;
    if (count === 0) {
        fs.writeFile('state.json', '{"' + query.name + '":"' + query.value + '"}', 'utf8');
        res.writeHead(302, {'Location': '/waiting'});
        res.end();
    } else if (count === 1) {
        var playerValue = query.value;
        obj[query.name] = playerValue;
        fs.writeFile('state.json', JSON.stringify(obj), 'utf8');
        var opponentNAme = Object.keys(obj)[0];
        var opponentValue = obj[opponentNAme];
        var result = checkResult(playerValue, opponentValue);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<head><meta charset="UTF-8"/><link rel="stylesheet" href="https://www.bootswatch.com/3/superhero/bootstrap.min.css"/></head>');
        res.write("Sa " + result + " mängu " + opponentNAme + " vastu.");
        res.write('<br><a href="../">Uus mäng</a>');
        res.end();
    } else {
        fs.writeFile('state.json', '{"' + query.name + '":"' + query.value + '"}', 'utf8');
        res.writeHead(302, {'Location': '/waiting'});
        res.end();
    }
}

function waiting(req, res) {
    fs.readFile('state.json', 'utf8', function (err, data) {
        if (err || !data || data === "") {
            fs.writeFile('state.json', '{}', 'utf8');
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write('<head><meta charset="UTF-8"/><link rel="stylesheet" href="https://www.bootswatch.com/3/superhero/bootstrap.min.css"/></head>');
            res.write('Tekkis viga proovi uuesti.<br>');
            res.write('<a href="../">tagasi</a>');
            res.end();
        } else {
            obj = JSON.parse(data);
            var count = Object.keys(obj).length;
            if (count === 2) {
                var playerName = Object.keys(obj)[0];
                var opponentName = Object.keys(obj)[1];
                var result = checkResult(obj[playerName], obj[opponentName]);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<head><meta charset="UTF-8"></head>');
                res.write("mäng lõppes " + result + " mängu " + opponentName + " vastu.");
                res.write('<br><a href="../">Uus mäng</a>');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<head><meta charset="UTF-8"/><link rel="stylesheet" href="https://www.bootswatch.com/3/superhero/bootstrap.min.css"/>');
                res.write('<meta http-equiv="refresh" content="1" /></meta>');
                res.write('oota');
                res.end();
            }
        }
    });
}

function checkResult(playerValue, opponentValue) {
    console.log(playerValue, opponentValue);
    if (playerValue === "paper") {
        if (opponentValue === "rock") {
            return "võitsid";
        } else if (opponentValue === "scissors") {
            return "kaotasid";
        }
    } else if (playerValue === "rock") {
        if (opponentValue === "scissors") {
            return "võitsid";
        } else if (opponentValue === "paper") {
            return "kaotasid";
        }
    } else if (playerValue === "scissors") {
        if (opponentValue === "paper") {
            return "võitsid";
        } else if (opponentValue === "rock") {
            return "kaotasid";
        }
    }
    return "viik";
}
