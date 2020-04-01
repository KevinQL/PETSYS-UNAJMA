<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        include_once("./views/modules/cdnsheader.html");
    ?>    
    <title>LOGIN</title>
</head>
<body id="particles-js">

    <div class="container">
        <a href="?pg=registrar_usuario">REGISTRARSE</a>
        <h1>INICIAR SESIÓN</h1>
        <form action="" class="card p-4 w-25">
            <div class="form-group">
                <label for="user">USUARIO</label> <br>
                <input type="text" class="form-control" id="user">
            </div>
            <div class="form-group">
                <label for="password">CONTRASEÑA</label> <br>
                <input type="password" class="form-control" id="password">
            </div>
            <div class="form-group">
                <button class="btn btn-success btn-lg" id="btn-ingresar">INGRESAR</button>
            </div>
        </form>    
    </div>




    <?php
        include_once("./views/modules/cdnsfooter.html");
    ?>

</body>
</html>