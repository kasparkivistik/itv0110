<script src="app.js"></script>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.php">reffit</a>
            <ul class="nav navbar-nav">
                <li><a onclick="notWorking()">hot</a></li>
                <li><a onclick="notWorking()">new</a></li>
                <li><a onclick="notWorking()">rising</a></li>
                <li><a onclick="notWorking()">top</a></li>
                <li><a onclick="notWorking()">gilded</a></li>
            </ul>
        </div>
        <?php
        if (!isset($_SESSION['username'])) {
            echo '<ul class="nav navbar-nav navbar-right">
                <li><a href="auth.php">log in</a></li>
                <li><a href="signup.php">sign up</a></li>
            </ul>';
        } else {
            echo '<ul class="nav navbar-nav navbar-right">
                <li><a href="createpost.php">make new postitus</a></li>
                <li><a href="logout.php">log out (' . $_SESSION['username'] . ')</a></li>
            </ul>';
        }
        ?>
    </div>
</nav>
