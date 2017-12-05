<?php
session_start();
include("config.php");

$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if (!$connection) {
    echo "kle vaata oma db üle, armas inimene, eks";
}
?>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Authenticate yourself \\ REDDIT</title>
    <meta name="author" content="Kaspar Kivistik">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://bootswatch.com/3/simplex/bootstrap.min.css"/>
    <link rel="stylesheet" href="stylesheet.css">
</head>
<?php
include("header.php");
?>
<body class="centered-wrapper">
<form class="centered-content form-horizontal" method="post">
    <fieldset>
        <legend>log in to this WONDERFUL site</legend>
        <div class="form-group">
            <label class="col-lg-2 control-label">Username</label>
            <div class="col-lg-10">
                <input type="text" class="form-control" name="username" placeholder="Username" required>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-2 control-label">Password</label>
            <div class="col-lg-10">
                <input type="password" class="form-control" name="password" placeholder="Password" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
                <input type="submit" class="btn btn-primary"/>
            </div>
        </div>
    </fieldset>
    <?php
    if (isset($_REQUEST['username']) and isset($_REQUEST['password'])) {
        $username = $_REQUEST['username'];
        $password = escape($connection, $_REQUEST['password']);
        $query = "SELECT * FROM 164347_users WHERE user_name = '$username' AND password = '$password'";
        if (count(mysqli_fetch_array(mysqli_query($connection, $query)))) {
            $_SESSION['username'] = $username;
            $message = "successfully logged in";
            echo "<script type='text/javascript'>alert('$message');</script>";
            header("Location: index.php");
        } else {
            echo "<script type='text/javascript'>alert(\"invalid username or password\");</script>";
        }
    }
    ?>
</form>
</body>
</html>
