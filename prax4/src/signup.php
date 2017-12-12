<?php
session_start();
include("config.php");

$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if (!$connection || $connection->connect_error) {
    echo "kle vaata oma server üle, armas inimene, eks";
}

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>sing up \\ Reddit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <link rel="stylesheet" href="https://bootswatch.com/3/simplex/bootstrap.min.css"/>
    <link rel="stylesheet" href="stylesheet.css"/>
</head>
<body class="centered-wrapper">
<?php
include("header.php");
?>
<form class="form-horizontal" method="post">
    <fieldset class="centered-content">
        <legend>sing up to our WONDERFUL site</legend>
        <div class="form-group">
            <label class="col-lg-2 control-label">Username</label>
            <div class="col-lg-10">
                <input type="text" name="username" class="form-control" placeholder="Username"
                       required>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-2 control-label">Full name</label>
            <div class="col-lg-10">
                <input type="text" name="fullname" class="form-control" placeholder="Full name"
                       required>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="col-lg-2 control-label">Email</label>
            <div class="col-lg-10">
                <input type="email" name="email" class="form-control" placeholder="Email" required>
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword" class="col-lg-2 control-label">Password</label>
            <div class="col-lg-10">
                <input type="password" name="password" class="form-control" placeholder="Password"
                       required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Reset everytghing</button>
                <input type="submit" class="btn btn-primary"/>
            </div>
        </div>
    </fieldset>
</form>
<?php

function validifyData($username, $db) {
    $result = mysqli_query($db, "SELECT * FROM 164347_users WHERE user_name = '$username'");
    if (count(mysqli_fetch_array($result)) != 0) {
        $message = "name exists";
        echo "<script type='text/javascript'>alert('$message');</script>";
        return false;
    }
    return true;
}

if (isset($_REQUEST['username']) and isset($_REQUEST['password']) and isset($_REQUEST['fullname']) and isset($_REQUEST['email'])) {
    $username = escape($connection, $_REQUEST['username']);
    $password = escape($connection, $_REQUEST['password']);
    $hash = hash('sha512', $password);
    $fullname = escape($connection, $_REQUEST["fullname"]);
    $email = escape($connection, $_REQUEST["email"]);
    if (validifyData($username, $connection)) {
        $sql = "INSERT INTO 164347_users VALUES ('$username', '$hash', '$fullname', '$email')";
        if ($connection->query($sql) === true) {
            $message = "Success!";
            echo "<script type='text/javascript'>alert('$message');</script>";
            header("Location: index.php");
        }
    }
}
?>
</body>
</html>