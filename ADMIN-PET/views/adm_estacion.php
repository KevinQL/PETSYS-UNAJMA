<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once("views/modules/cdnsheader.html");
    ?>

    <title>ADM. ESTACIÓN</title>
</head>
<body>

    <!-- NAVEGACION -->
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

    <!-- contenido form-->
    <div class="jumbotron container">
        <p class="lead">Administrar Estación</p>
        <hr class="mt-3">

        <div class="container">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#insertar">INSERTAR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " data-toggle="tab" href="#opciones" onclick="cargar_estacion()">OPCIONES</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#ayuda">AYUDA</a>
                </li>
            </ul>

        
            <!-- ///////////////////////// CONTENIDOS -->
            <div id="myTabContent" class="tab-content">
                <!--CONTENIDO INSERTAR-->
                <div class="tab-pane fade active show" id="insertar">
                    <!-- progress bar -->
                    <div class="progress my-2">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 5%" id="progresoEstacion"></div>
                    </div>   
                    <!---->
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <div class="row">                            
                                <div class="form-group col-md-12">
                                    <label class="form-control-label d-block text-left" for="txtNombre">Nombre Estación</label>    
                                    <input class="form-control text-uppercase is-invalid" type="text" placeholder="INGRESE NOMBRE ESTACIÓN" id="txtNombre" onkeyup="evaluar_Estacion()">
                                    <div class="valid-feedback text-left">Bien! No tienes errores.</div>
                                    <div class="invalid-feedback text-left">debe rellenar este campo con un nombre!</div>
                                </div>   
                            </div>
                            <div class="row">                            
                                <div class="form-group col-md-7">
                                    <label class="form-control-label" for="txtUbicacion">Ubicación Estación</label>    
                                    <input class="form-control text-uppercase is-invalid" type="text" placeholder="INGRESE UBICACIÓN O DIRECCION" id="txtUbicacion" onkeyup="evaluar_Estacion()">
                                    <div class="valid-feedback text-left">Bien! No tienes errores.</div>
                                    <div class="invalid-feedback text-left">debe rellenar este campo con un nombre!</div>
                                </div>  
                                <div class="form-group col-md-5">
                                    <label class="form-control-label" for="txtDepartamento">Departamento Estación</label>    
                                    <input class="form-control text-uppercase is-invalid" type="text" placeholder="INGRESE DEPARTAMENTO" id="txtDepartamento" onkeyup="evaluar_Estacion()">
                                    <div class="valid-feedback">Bien! No tienes errores.</div>
                                    <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                                </div>    
                            </div> 
                            <div class="row">                            
                                <div class="form-group col-md-7">
                                    <label class="form-control-label" for="txtProvincia">Provincia Estación</label>    
                                    <input class="form-control text-uppercase is-invalid" type="text" placeholder="INGRESE PROVINCIA" id="txtProvincia" onkeyup="evaluar_Estacion()">
                                    <div class="valid-feedback text-left">Bien! No tienes errores.</div>
                                    <div class="invalid-feedback text-left">debe rellenar este campo con un nombre!</div>
                                </div>  
                                <div class="form-group col-md-5">
                                    <label class="form-control-label" for="txtDistrito">Distrito Estación</label>    
                                    <input class="form-control text-uppercase is-invalid" type="text" placeholder="INGRESE DISTRITO" id="txtDistrito" onkeyup="evaluar_Estacion()">
                                    <div class="valid-feedback">Bien! No tienes errores.</div>
                                    <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                                </div>    
                            </div> 

                            <div class="row">
                                <div class="my-5 col-md-12">
                                    <button type="button" class="btn btn-outline-light btn-lg btn-block" id="btnGuardarEstacion" onclick="execute_Estacion()">GUARDAR ESTACIÓN</button>
                                </div>  
                            </div>

                        </div>
                    </div>                                          
                </div>

                <!-- CONTENIDO OPCIONES -->
                <div class="tab-pane fade" id="opciones">

                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Ubicación</th>
                                <th scope="col">Departamento</th>
                                <th scope="col">provincia</th>
                                <th scope="col">distrito</th>
                                <th scope="col">Actualizar</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody id="res-tbl-estacion">
                            <tr class="reg+ID">
                                <th scope="row">1</th>
                                <td>Syspet</td>
                                <td>Lampa de oro</td>
                                <td>apurimac</td>
                                <td>Andahuaylas</td>
                                <td>Andahuaylas</td>
                                <td>
                                    <button type="button" class="btn btn-warning" onclick="actualizarEstacion('reg-1')">Actualizar</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger" onclick="eliminarEstacion('reg-1')">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
                <!-- CONTENIDO AYUDA -->
                <div class="tab-pane fade" id="ayuda">
                    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
                </div>
            </div>            

        </div>

    </div>








    <?php        
        include_once("views/modules/cdnsfooter.html");        
    ?>
    <script src="./views/js/adm_estacion_modif.js"></script>


</body>
</html>