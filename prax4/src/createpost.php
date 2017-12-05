<?php
session_start();
include("config.php");

$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if (!$connection) {
    echo "kle vaata oma server üle, armas inimene, eks";
}

if (!$_SESSION['username']) {
    header("Location: index.php");
}
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Create a new post onto this magnificent site \\ Reddit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://bootswatch.com/3/simplex/bootstrap.min.css"/>
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <link rel="stylesheet" href="stylesheet.css"/>
</head>
<?php
include("header.php");
?>
<body class="centered-wrapper">
<div class="centered-content">
    <form method="post">
        <legend>Hello create new post thanks</legend>
        <label><b>The title of your new postitus</b></label><br>
        <input type="text" style="width: 500px" name="title"/><br>
        <label><b>The content of your new postitus</b></label><br>
        <input type="text" style="width: 500px; height: 250px" name="content"/><br><br>
        <input type="submit">
        <?php

        if (isset($_REQUEST['title']) and isset($_REQUEST['content'])) {
            $title = escape($connection, $_REQUEST['title']);
            $content = escape($connection, $_REQUEST['content']);
            $name = $_SESSION['username'];
            $sql = "INSERT INTO 164347_posts (content, time, username, title) VALUES ('$content', NOW(), '$name', '$title')";
            if ($connection->query($sql) === true) {
                $message = "Success!";
                echo "<script type='text/javascript'>alert('$message');</script>";
                header("Location: index.php");
            }
        }
        ?>
    </form>
</div>
</body>
</html>