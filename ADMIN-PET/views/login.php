<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LOGIN</title>
</head>
<body>
    <h1>PÁGINA DE LOGUIN</h1>
    <?php
        $validarDatos=true;
        if($validarDatos){
            //session_start();
            $_SESSION['start']="kvin";
            echo $_SESSION['start'];
        }
    ?>
</body>
</html>