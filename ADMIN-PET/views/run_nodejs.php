<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once('views/modules/cdnsheader.html');
        $nombre = "{$_SESSION['data']['nombre']},{$_SESSION['data']['id']}";
    ?>

    <title>INICIO</title>
</head>
<body>

    <!-- NAVEGACION -->
    <?php
        include_once("views/modules/navegacion_tipo.php");
    ?>

    <!-- CUADR DE VIENDENIDA AL USUARIO-->
    <div class="container mt-5">

        <iframe src="http://localhost:3000/<?=$nombre?>" width="100%" height="700px" frameborder="0" allowfullscreen allow='microphone *; camera *'></iframe>

    </div>

    <?php        
        include_once('views/modules/cdnsfooter.html');
    ?>

</body>
</html>