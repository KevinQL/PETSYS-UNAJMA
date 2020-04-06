<!DOCTYPE html>
<html lang="en">
<head>
    
    <?php
        include_once('views/modules/cdnsheader.html');
    ?>

    <title>Info</title>
</head>
<body>
    <?php
        include_once("views/modules/navegacion.html");
    ?>

    <h1>PÁGIANA DE INFORMACIÓN</h1>
    
    <?php

    $user = new stdClass;
    $user->nombre = "kevin";
    echo $user->nombre;
    echo "<br>";

    $user->nombre = "maria";
    var_dump($user);
    echo "<br>";

    $user->nombre = "kev";
    var_dump($user);
    echo "<br>";
    echo $user->nombre;

    ?>

    <?php
        include_once('views/modules/cdnsfooter.html');
    ?>

</body>
</html>