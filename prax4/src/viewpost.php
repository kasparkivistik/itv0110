<?php
session_start();
include("config.php");

$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if (!$connection || $connection->connect_error) {
    echo "kle vaata oma andmebaas üle, armas inimene, eks";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>this post \\ Reddit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://bootswatch.com/3/simplex/bootstrap.min.css"/>
    <link rel="stylesheet" href="stylesheet.css"/>
</head>
<body class="centered-wrapper">
<?php
include("header.php");
?>
<?php
$id = $_GET['id'];
$query = "SELECT * FROM 164347_posts WHERE id = $id";
$res = mysqli_query($connection, $query);
while ($row = mysqli_fetch_assoc($res)) {
    $row = array_values($row);
    $sql = "SELECT IFNULL(SUM(vote), 0) AS score FROM 164347_votes WHERE post = $row[0]";
    $points = mysqli_fetch_array(mysqli_query($connection, $sql))[0];
    echo '<div class="centered-content">
    <h3>' . htmlspecialchars($row[4]) . '</h3><p>' . htmlspecialchars($row[1]) . '</p>
    <p>created by <b>' . $row[3] . '</b></p><p>at ' . $row[2] . '</p><p><i>points </i>' . $points . '</p></div><br>';
}
if (isset($_SESSION['username'])) {
    echo '<form method="post">
    <textarea name="comment" placeholder="here you comment"></textarea>
    <input type="submit">
</form>';

    if (isset($_REQUEST['comment'])) {
        $comment = escape($connection, $_REQUEST['comment']);
        $name = $_SESSION['username'];
        $postId = $_GET['id'];
        $sql = "INSERT INTO 164347_comments (content, username, time, post_id) VALUES ('$comment', '$name', NOW(), $postId)";
        $connection->query($sql);
    }
} else {
    echo '<small>in order to comment please <a href="auth.php">log in</a></small>';
}

$commentQuery = "SELECT * FROM 164347_comments WHERE post_id = $id";
$commentResult = mysqli_query($connection, $commentQuery);
echo '<legend>comments</legend>';
while ($commentRow = mysqli_fetch_assoc($commentResult  )) {
    $commentRow = array_values($commentRow);
    echo '<div class="centered-content">
Published by ' . $commentRow[2] . ' at ' . $commentRow[3] . '<br>
<b>' . htmlspecialchars($commentRow[1]) . '</b>
</div><br>';
}
?>
<a href="index.php"><br>Back to main menu</a>
</body>
</html>
