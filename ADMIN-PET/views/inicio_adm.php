<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once('views/modules/cdnsheader.html');
    ?>

    <title>INICIO ADMINISTRADOR</title>
</head>
<body>

    <?php
        include_once("views/modules/navegacion_tipo.php");
    ?>

    <!-- CUADR DE VIENDENIDA AL USUARIO-->
    <div class="jumbotron container mt-4">
        <h1 class="display-3">Bienvenido, <?= $_SESSION['data']['nombre'] ?>!</h1>        
        <hr>
        <p class="lead mt-5 pt-5">
            <h5 class="py-2">Bienvenido a la plataforma del administrador.</h5>            
        </p>
    </div>



    <?php        
        include_once('views/modules/cdnsfooter.html');
    ?>

</body>
</html>