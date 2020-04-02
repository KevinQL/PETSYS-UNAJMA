<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once("views/modules/cdnsheader.html");
    ?>

    <title>ETIQUETAS</title>
</head>
<body>

    <!-- NAVEGACION -->
    <?php
        include_once("views/modules/navegacion.html");
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
        <p class="lead">Administrar Etiqueta</p>
        <hr class="mt-3">

        <div class="container">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#insertar">INSERTAR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " data-toggle="tab" href="#opciones">OPCIONES</a>
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
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 25%" id="progreso-etiqueta"></div>
                    </div>   
                    <!---->
                    <div class="row py-3 container">
                        <div class="col-md-6">
                            
                            <div class="form-group">
                                <label class="form-control-label" for="txt-nombre">Nombre Etiqueta</label>    
                                <input class="form-control form-control-lg text-uppercase is-invalid" type="text" placeholder="Nombre Etiqueta" id="txt-nombre" onkeyup="evaluarInsertarEtiqueta()">
                                <div class="valid-feedback">Bien! No tienes errores.</div>
                                <div class="invalid-feedback">debe rellenar este campo con un nombre!</div>
                            </div>
                            <!---->
                            <div class="form-group">
                                <label for="exampleTextarea" class="col-form-label" for="txt-detalles">Detalles Etiqueta</label>
                                <textarea class="form-control text-lowercase" id="txt-detalles" rows="3" onkeyup="evaluarInsertarEtiqueta()"></textarea>
                            </div>

                        </div>

                        <!---->                           

                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Peso Promedio</label>
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input type="number" class="form-control form-control-lg is-valid" aria-label="Amount (to the nearest dollar)" id="txt-peso" onkeyup="evaluarInsertarEtiqueta()">      
                                        <div class="input-group-append">
                                            <span class="input-group-text">.kg</span>
                                        </div>      
                                    </div>
                                    <small id="emailHelp" class="form-text text-primary">Este dato Peso Promedio es pcional</small>
                                </div>
                            </div>
                                                    
                            <div class="form-group">
                                <label class="control-label">Precio Valorado</label>
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input type="number" class="form-control form-control-lg is-valid" aria-label="Amount (to the nearest dollar)" id="txt-precio" onkeyup="evaluarInsertarEtiqueta()">
                                        <div class="input-group-append">
                                            <span class="input-group-text">.00</span>
                                        </div>
                                    </div>
                                    <small id="emailHelp" class="form-text text-primary">Este dato Precio Valorado es pcional</small> 
                                </div>
                            </div>     
                        </div>
                    </div>
                    <!---->
                    <!-- BOTON DE GUARDADO  -->
                    <div class="text-center py-4">
                        <button type="button" class="btn btn-outline-primary btn-lg" id="btn-insertar-etiqueta" onclick="btnInsertarEtiqueta()">INSERTAR ETIQUETA</button>
                    </div>                    

                </div>

                <!-- CONTENIDO OPCIONES -->
                <div class="tab-pane fade" id="opciones">
                    <p>Opciones</p>
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