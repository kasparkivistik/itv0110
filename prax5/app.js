var playerPicks = [];

var paper = 0;
var rock = 1;
var scissors = 2;


function play(choice) {

    if (playerPicks.length < 3) {
        makeRandomChoice(choice);
    } else {
        //control if player chose more than 3 same in a row
        if (playerPicks[playerPicks.length - 1] === playerPicks[playerPicks.length - 2]
            && playerPicks[playerPicks.length - 2] === playerPicks[playerPicks.length - 3]) {

            console.log('other person TURN');

            if (playerPicks[playerPicks.length - 1] === 0) {
                makeTurn(choice, 2);
            } else {
                makeTurn(choice, playerPicks[playerPicks.length - 1] - 1);
            }
        } else {
            makeRandomChoice(choice);
        }

    }
    playerPicks.push(choice);
}

function makeTurn(playerChoice, secondPlayerChoice) {
    if (!(playerChoice === 0 && secondPlayerChoice === 2)
        && ((playerChoice === 2 && secondPlayerChoice === 0)
            || playerChoice < secondPlayerChoice)) {
        //WON
        console.log('Win ' + playerChoice + ' ' + secondPlayerChoice);
    } else if (playerChoice === secondPlayerChoice) {
        //DRAW
        console.log('Draw ' + playerChoice + ' ' + secondPlayerChoice);
    } else {
        //LOSE
        console.log('Lose ' + playerChoice + ' ' + secondPlayerChoice);
    }
}

$('#playerpaper').click(function () {
    play(paper);
});
$('#playerrock').click(function () {
    play(rock);
});
$('#playerscissors').click(function () {
    play(scissors);
});

