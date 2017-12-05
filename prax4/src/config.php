<?php
if (!defined('DB_SERVER')) define('DB_SERVER', 'localhost');
if (!defined('DB_USERNAME')) define('DB_USERNAME', 'st2014');
if (!defined('DB_PASSWORD')) define('DB_PASSWORD', 'progress');
if (!defined('DB_DATABASE')) define('DB_DATABASE', 'st2014');

function escape($db, $string) {
    $string = mysqli_real_escape_string($db, $string);
    $string = htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
    return $string;
    }