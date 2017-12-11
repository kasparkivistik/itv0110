


function changeScore(win, lose) {
    var score = $('$score').text();
    win = win + parseInt(score.substr(0, score.indexOf('-')));
    lose = lose + parseInt(score.substr(0, score.indexOf('-') + 1));
    $('score').text(win + "-" + lose);
}