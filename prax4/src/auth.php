<?php



?>


<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Log in \\ REDDIT</title>
    <meta name="author" content="Kaspar Kivistik">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://bootswatch.com/3/simplex/bootstrap.min.css"/>
    <link rel="stylesheet" href="">
</head>
<body>
<form>
    <div class="container">
        <label><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" required/>

        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" required/>

        <button type="submit">Login</button>
        <label>
            <input type="checkbox" checked="checked"/>
        </label> Remember me
    </div>

    <div class="container" style="background-color:#f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span>Forgot <a href="#">password?</a></span>
    </div>
</form>
</body>
</html>
