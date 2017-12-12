<?php
session_start();
include("config.php");

$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if (!$connection || $connection->connect_error) {
    echo "kle vaata oma andmebaas üle, armas inimene, eks";
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Index \\ Reddit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://bootswatch.com/3/simplex/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <link rel="stylesheet" href="stylesheet.css"/>
</head>
<?php
include("header.php");
?>
<body class="centered-wrapper">

<?php
$query = "SELECT 164347_posts.* ,
                  IFNULL(SUM(164347_votes.vote), 0) AS score,
                   (IFNULL(SUM(164347_votes.vote), 0) - 1 / POWER((time_to_sec(timediff(NOW(), 164347_posts.time)) / 3600) + 2, 1.8)) AS hotness
                FROM
                  164347_posts
                LEFT JOIN 164347_votes ON 164347_posts.id = 164347_votes.post
                GROUP BY 164347_posts.id
                ORDER BY  hotness DESC";
$res = mysqli_query($connection, $query);
while ($row = mysqli_fetch_assoc($res)) {
    $row = array_values($row);
    //$sql = "SELECT IFNULL(SUM(vote), 0) AS score FROM 164347_votes WHERE post = $row[0]";
    $points = $row[2];
    echo '<div style="border: 1px solid black; padding: 10px" class="container centered-content">
    <a href="viewpost.php?id=' . $row[0] . '"><h3>' . htmlspecialchars($row[4]) . '</h3></a><p>' . htmlspecialchars($row[1]) . '</p>
    <p>created by <b>' . $row[3] . '</b></p><p>at ' . $row[2] . '</p><p><i>points </i>' . $points . '</p>
<a href="vote.php?post=' . $row[0] . '&score=up"><i class="fa fa-smile-o fa-2x" aria-hidden="true"></i></a>
<a href="vote.php?post=' . $row[0] . '&score=down"><i class="fa fa-frown-o fa-2x" aria-hidden="true"></i></a>
</div><br>';
}
?>
<div class="well well-sm">
    tere see oli minu võrgurakenduste neljanda praksi töö<br>
    ma olen kaspar kivistik mu matriklinumber on 164347IABB<br>
    andke palju punkte palun
</div>
</body>
</html>