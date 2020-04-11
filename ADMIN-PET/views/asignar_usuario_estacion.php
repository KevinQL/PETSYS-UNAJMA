<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
        include_once("views/modules/cdnsheader.html");
    ?>

    <title>ASIGNAR USUARIO-ESTACION</title>
</head>
<body onload="execute_Estacion_Asignar()">

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
        <p class="lead"></p>
        <hr class="mt-3">

        <div class="container" >
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#asignar" onclick="execute_Estacion_Asignar()">ASIGNAR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " data-toggle="tab" href="#opciones" id="btn-update-estacion" onclick="">ACTUALIZAR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#ayuda">AYUDA</a>
                </li>
            </ul>

         
            <!-- ///////////////////////// CONTENIDOS -->
            <div id="myTabContent" class="tab-content">
                <!--CONTENIDO ASIGNAR-->
                <div class="tab-pane fade active show" id="asignar">
                    <div class="py-3">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-lg" id="txtbuscarEstacion" placeholder="BUSCAR NOMBRE DE ESTACIÓN..." onkeyup="execute_Estacion_Asignar()">
                        </div>
                    </div>

                    <div>
                        <table class="table">
                            <thead>
                                <tr class="table-light">
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">UBICACIÓN</th>
                                    <th scope="col">PROVINCIA</th>
                                    <th scope="col">DEPARTAMENTO</th>
                                    <th scope="col" class="text-center">OPCIONES</th>
                                </tr>
                            </thead>
                            <tbody class="table-hover text-uppercase" id="tblEstacion">
                                    <tr class="table-secondary">
                                        <th scope="row" class="">syspett</th>
                                        <td contenteditable>LAMPA DE ORO</td>
                                        <td contenteditable>ANDAHUAYLAS</td>
                                        <td contenteditable>APURIMAC</td>
                                        <td class="text-center">
                                            <button class="btn btn-warning btn-sm">ASIGNAR</button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table> 
                    </div>
                    
                    <!---->
                                                           
                </div>

                <!-- CONTENIDO ACTULAIZAR -->
                <div class="tab-pane fade" id="opciones">
                <div class="py-3">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-lg" placeholder="BUSCAR NOMBRE DE ESTACIÓN...">
                        </div>
                    </div>

                    <div>
                        <table class="table">
                            <thead>
                                <tr class="table-light">
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">UBICACIÓN</th>
                                    <th scope="col">PROVINCIA</th>
                                    <th scope="col">DEPARTAMENTO</th>
                                    <th scope="col" class="text-center">OPCIONES</th>
                                </tr>
                            </thead>
                            <tbody class="table-hover text-uppercase" id="tblres-update">
                                    <tr class="table-secondary">
                                        <th scope="row" class="">syspett</th>
                                        <td contenteditable>LAMPA DE ORO</td>
                                        <td contenteditable>ANDAHUAYLAS</td>
                                        <td contenteditable>APURIMAC</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary btn-sm">ACTUALIZAR</button>
                                        </td>
                                    </tr>
                                    <tr class="table-secondary">
                                        <th scope="row">BOTELLA</th>
                                        <td>LAMPA DE ORO</td>
                                        <td>ANDAHUAYLAS</td>
                                        <td>APURIMAC</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary btn-sm">ACTUALIZAR</button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table> 
                    </div>
                    
                    <!---->
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