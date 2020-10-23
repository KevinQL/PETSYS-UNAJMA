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
        include_once("views/modules/navegacion_tipo.php");
    ?>

    <h1>PÁGIANA DE INFORMACIÓN</h1>
    
    <?php

    $arr = [['nombre'=>'kevin'],['nombre'=>'blanky'],['nombre'=>'julio']];

    //var_dump($arr);
    foreach ($arr as $value) {
        # code...
        //var_dump($value);
        echo "-> {$value['nombre']}";

        echo "<br>";
    }

    ?>

    <?php
        include_once('views/modules/cdnsfooter.html');
    ?>

</body>
</html>