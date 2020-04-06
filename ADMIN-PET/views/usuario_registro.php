<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once("views/modules/cdnsheader.html");
    ?>

    <title>REGISTRARSE</title>
</head>
<body>

    <!-- NAVEGACION -->
    <?php
        include_once("views/modules/navegacion_inicio.html");
    ?>

    <!-- contenido form-->
    <div class="jumbotron container my-3">        
        <hr class="mb-3">
        <div class="container">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#insertar">INSERTAR</a>
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
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 5%" id="progresoUsuario"></div>
                    </div>   
                    <!---->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group w-25 ">
                                <label class="form-control-label" for="txtDni">Dni Usuario</label>    
                                <input class="form-control text-uppercase is-invalid" type="number" placeholder="DNI usuario" id="txtDni" onkeyup="evaluarInsertarUsuario()">
                                <div class="valid-feedback">Bien! No tienes errores.</div>
                                <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                            </div>                        
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-control-label" for="txtNombre">Nombre Usuario</label>    
                                <input class="form-control form-control-lg text-uppercase is-invalid" type="text" placeholder="INGRESE NOMBRES" id="txtNombre" onkeyup="evaluarInsertarUsuario()">
                                <div class="valid-feedback">Bien! No tienes errores.</div>
                                <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="txtUsuario">USUARIO</label>    
                                <input class="form-control text-uppercase is-invalid" type="text" placeholder="ingrese usuario" id="txtUsuario" onkeyup="evaluarInsertarUsuario()">
                                <div class="valid-feedback">Bien! No tienes errores.</div>
                                <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="txtPassword">CONTRASEÑA</label>    
                                <input class="form-control text-uppercase is-invalid" type="password" placeholder="CONTRASEÑA" id="txtPassword" onkeyup="evaluarInsertarUsuario()">
                                <div class="valid-feedback">Bien! No tienes errores.</div>
                                <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-control-label" for="txtApellido">Apellidos Usuario</label>    
                                <input class="form-control form-control-lg text-uppercase is-invalid" type="text" placeholder="apellidos usuario" id="txtApellido" onkeyup="evaluarInsertarUsuario()">
                                <div class="valid-feedback">Bien! No tienes errores.</div>
                                <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                            </div>
                            <div class="form-group">
                                <legend>Seleccionar Nivel de Usuario</legend>
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="customRadio1" value="user" name="radioNivelUsuario" class="custom-control-input" checked="">
                                    <label class="custom-control-label" for="customRadio1">Nivel Usuario</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <legend>Determinar Estado Usuario</legend>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="switchEstado" disabled>
                                    <label class="custom-control-label" for="switchEstado">El Usuario Está Activo</label>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="my-5 mx-auto text-center">
                        <button type="button" class="btn btn-outline-light btn-lg btn-block" id="btnGuardarUsuario" onclick="btnInsertarUsuario_inicio()">GUARDAR USUARIO</button>
                    </div>                        

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

</body>
</html>