<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once('views/modules/cdnsheader.html');
    ?>

    <title>VALIDAR USUARIO ADMINISTRADOR</title>
</head>
<body>

    <?php
        include_once("views/modules/navegacion_tipo.php");
    ?>
    <!-- datos usuario -->
    <div class="container my-3">
        <span class="bg-dark text-info">
            <h6>
                <small class="text-muted">
                    USUARIO
                </small>
                </br>
                <?= strtoupper($_SESSION["data"]["apellido"]) ?>,                     
                <?= strtoupper($_SESSION["data"]["nombre"]) ?>                     
            </h6>  
        </span>
    </div>

    <!-- CUADR DE VIENDENIDA AL USUARIO-->
    <div class="jumbotron container">
        <h3>VALIDAR USUARIOS REGISTRADOS</h3>
        <hr>
        <table class="table">
            <thead class="thead-light">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">DNI</th>
                <th scope="col">Tipo Usuario</th>
                <th scope="col" class="text-center">Validar</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    // echo $pag->mensajeController();
                    // value / checked
                    $result = $pag->traerUser();
                    if($result->rowCount()>=1){
                        $num = 1;
                        while($user = $result->fetch(PDO::FETCH_ASSOC)){
                        
                ?>
                    <tr class="reg-<?=$user['id']?>">
                        <th scope="row"><?= $num++ ?></th>
                        <td><?= $user['nombre'] ?></td>
                        <td><?= $user['apellido'] ?></td>
                        <td><?= $user['dni'] ?></td>
                        <td>
                            <div class="form-group">
                                <select id="tu<?=$user['id']?>" class="form-control" onchange="actualizar_tipoUsuario(this,'<?=$user['id']?>')">
                                    <option value="1" <?=($user['tipo_usuario']==1)?'selected':''?>>Administrador</option>
                                    <option value="2" <?=($user['tipo_usuario']==2)?'selected':''?>>Usuario</option>
                                </select>
                            </div>
                        </td>
                        <td class="text-center">
                            <div class="form-check">
                                <input class="form-check-input position-static" type="checkbox" 
                                    id="v<?=$user['id']?>" 
                                    value="option1" aria-label="..." 
                                    <?=($user['estado']==1)?'checked':''?> 
                                    onchange="actualizar_validarUsuario(this, '<?=$user['id']?>')" >
                            </div>
                        </td>
                    </tr>
                <?php
                        }
                    }
                ?>
            </tbody>
        </table>
        
    </div>



    <?php        
        include_once('views/modules/cdnsfooter.html');
    ?>
    
    <script src="./views/js/adm_validarUsuario.js"></script>

</body>
</html>