<?php
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sing up // Reddit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://bootswatch.com/3/simplex/bootstrap.min.css"/>
</head>
<body>
<form>
    <div class="container">
        <p><label><b>Email</b></label></p>
        <input type="text" placeholder="Enter Email" required>

        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password"required>

        <label><b>Repeat Password</b></label>
        <input type="password" placeholder="Repeat Password" required>
        <input type="checkbox" checked="checked"> Remember me
        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

        <div>
            <button type="button">Cancel</button>
            <button type="submit">Sign Up</button>
        </div>
    </div>
</form>
</body>
</html>
