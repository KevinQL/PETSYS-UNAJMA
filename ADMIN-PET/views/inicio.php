<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once('views/modules/cdnsheader.html');
    ?>

    <title>INICIO</title>
</head>
<body>

    <!-- NAVEGACION -->
    <?php
        include_once("views/modules/navegacion_tipo.php");
    ?>

    <!-- CUADR DE VIENDENIDA AL USUARIO-->
    <div class="jumbotron container mt-4">
        <h1 class="display-3">Bienvenido, <?= $_SESSION['data']['nombre'] ?>!</h1>        
        <hr>
        <p class="lead mt-5 pt-5">
            <h5 class="py-2">Iniciar el sistema automático </h5>
            <a class="btn btn-warning btn-lg p-3 lead rounded-0" href="?pg=run_nodejs" role="button">INICIAR SISTEMA</a>
        </p>
    </div>



    <?php        
        include_once('views/modules/cdnsfooter.html');
    ?>

</body>
</html>