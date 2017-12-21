console.log("run");

if (localStorage.getItem("result")) {
    $("#result").text(localStorage.getItem("result"));
    localStorage.removeItem("result");
    localStorage.removeItem("waiting");
} else if (localStorage.getItem("waiting") === "true") {
    refresh();
    localStorage.removeItem("waiting");
}

function postMove(move) {
    var xhr = new XMLHttpRequest();
    var name = $("#player-name").val();
    xhr.open("GET", "xhr://dijkstra.cs.ttu.ee:7842/?player=" + name + "&option=" + move + "&reset=false");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                var response = xhr.responseText;
                if (response.length > 2) {
                    localStorage.setItem("result", response);
                } else {
                    localStorage.setItem("waiting", "true");
                }
            }
        }
    };
    xhr.send();
}

function requestResult() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://dijkstra.cs.ttu.ee:7842/?player=\"none\"&option=\"none\"&reset=waiting");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = xhr.responseText;
                if (response.length > 2) {
                    $("#result").text(response);
                    clearGame();
                } else {
                    localStorage.setItem("waiting", "true");
                    refresh();
                }
            }
        }
    };
    xhr.send();
}

function refresh() {
    $("#result").text("waiting for other player...");
    setTimeout(function () {
        requestResult();
    }, 5000);
}

function clearGame() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://dijkstra.cs.ttu.ee:7842/?player=\"none\"&option=\"none\"&reset=true");
    xhr.send();
}