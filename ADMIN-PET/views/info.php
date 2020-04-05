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

    $user = new adminController();
    $data = $user->traerUser();
    var_dump($data->fetch(PDO::FETCH_ASSOC));


    ?>

    <?php
        include_once('views/modules/cdnsfooter.html');
    ?>

</body>
</html>