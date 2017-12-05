<?php
session_start();
include("config.php");
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
if (isset($_SESSION["username"]) and isset($_GET["post"])) {
    $user = $_SESSION["username"];
    $post = intval($_GET["post"]);
    $vote = $_GET["score"];
    if ($vote === "up") {
        $vote = 1;
    } else {
        $vote = -1;
    }
    $alreadyVoted = "SELECT * FROM 164347_votes WHERE (author = '$user' and post = $post)";
    $votedDifferently = "SELECT * FROM 164347_votes WHERE (author = '$user' and post = $post and vote = -1*$vote)";
    if (count(mysqli_fetch_array(mysqli_query($connection, $alreadyVoted))) === 0) {
        $addVote = "INSERT INTO 164347_votes (author, post, vote) VALUES ('$user', $post, $vote)";
        $connection->query($addVote);
    } else if (count(mysqli_fetch_array(mysqli_query($connection, $votedDifferently))) !== 0) {
        $update = "UPDATE 164347_votes SET vote = -1*vote WHERE author = '$user' and post = $post";
        $connection->query($update);
    }
}
header("Location: index.php");
?>