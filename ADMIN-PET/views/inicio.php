<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once('views/modules/cdnsheader.html');
    ?>

    <title>INICIO</title>
</head>
<body>

    <?php
        include_once("views/modules/navegacion.html");
    ?>

    <h1>PAGINA DE INICIO</h1>

    <?php

        $user = new adminController();
        var_dump($user->traerUser());
        echo "</br>";
        var_dump($_SESSION['data']['tipo_usuario']);
    ?>




    <?php
        include_once('views/modules/cdnsfooter.html');
    ?>
    <script src="./views/js/main.js"></script>
</body>
</html>