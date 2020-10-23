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
        <p class="lead"></p>
        <hr class="mt-3">

        <div class="container" >
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#asignar" onclick="execute_Estacion_Asignar()">ASIGNAR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " data-toggle="tab" href="#opciones" id="btn-update-estacion" onclick="execute_update_Estacion_Asignar()">ACTUALIZAR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#ayuda">AYUDAii</a>
                </li>
            </ul>

         
            <!-- ///////////////////////// CONTENIDOS -->
            <div id="myTabContent" class="tab-content">
                <!--CONTENIDO ASIGNAR-->
                <div class="tab-pane fade active show" id="asignar">
                    <div class="py-3">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-lg text-uppercase" id="txtbuscarEstacion" placeholder="BUSCAR NOMBRE DE ESTACIÓN..." onkeyup="execute_Estacion_Asignar()">
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
                                    <!--
                                    <tr class="table-secondary">
                                        <th scope="row" class="">syspett</th>
                                        <td contenteditable>LAMPA DE ORO</td>
                                        <td contenteditable>ANDAHUAYLAS</td>
                                        <td contenteditable>APURIMAC</td>
                                        <td class="text-center">
                                            <button class="btn btn-warning btn-sm">ASIGNAR</button>
                                        </td>
                                    </tr>
                                    -->
                            </tbody>
                        </table> 
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">BUSCAR USUARIO PARA ASIGNAR</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="cerrarModal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <input type="text" id="aueM_txtDni" class="form-control text-uppercase" onkeyup="execute_obtener_Usuario_Est()" placeholder="INGRESE DNI USUARIO">                                    
                                </div>
                                <div class="form-group">
                                    <label for="nombre">NOMBRE:</label>
                                    <input type="text" id="aueM_txtNombre" class="form-control text-uppercase text-white" placeholder="DATOS PERSONALES..." disabled>
                                    <label for="apellido">APELLIDO:</label>
                                    <input type="text" id="aueM_txtApellido" class="form-control text-uppercase text-white" placeholder="DATOS PERSONALES..." disabled>
                                </div>
                                <div class="form-group text-center pt-4">
                                    <button id="aueM_btnAsignar" onclick="execute_Usuario_Estacion()" class="btn btn-warning btn-lg" >ASIGNAR A ESTACIÓN</button>                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input type="hidden" id="aueM_id_station">
                                <input type="hidden" id="aueM_id_user">
                                <span><small>Hola mundo</small></span>
                            </div>
                            </div>
                        </div>
                    </div>                    
                    <!--FIN MODAL-->           
                    <!---->
                                                           
                </div>

                <!-- CONTENIDO ACTULAIZAR -->
                <div class="tab-pane fade" id="opciones">
                <div class="py-3">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-lg" id="txtupdate-estacion" onkeyup="execute_update_Estacion_Asignar()" placeholder="BUSCAR NOMBRE DE ESTACIÓN...">
                        </div>
                    </div>

                    <div>
                        <table class="table">
                            <thead>
                                <tr class="table-light">
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">UBICACIÓN</th>
                                    <th scope="col">ENCARGADO</th>
                                    <th scope="col">PROVINCIA</th>
                                    <th scope="col" class="text-center">OPCIONES</th>
                                </tr>
                            </thead>
                            <tbody class="table-hover text-uppercase" id="tblres-update">
                                    <!--
                                    <tr class="table-secondary" id="regis-1">
                                        <th inval="nombre" scope="row" class="modif-name" contenteditable>syspett</th>
                                        <td inval="ubicacion" class="modif-ubicacion" contenteditable>LAMPA DE ORO</td>
                                        <td>ANDAHUAYLAS</td>
                                        <td>APURIMAC</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary btn-sm" onclick="estudiarEtiqueta(this,'1')" id="btn11">ACTUALIZAR</button>                                            
                                        </td>
                                    </tr>
                                    -->
                            </tbody>
                        </table> 
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="updateUEModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel2">BUSCAR USUARIO PARA ASIGNAR</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="UPD_cerrarModal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <input type="text" id="UPD_aueM_txtDni" class="form-control text-uppercase" onkeyup="execute_upd_obtener_Usuario_Est()" placeholder="INGRESE DNI USUARIO">                                    
                                </div>
                                <div class="form-group">
                                    <label for="nombre">NOMBRE:</label>
                                    <input type="text" id="UPD_aueM_txtNombre" class="form-control text-uppercase text-white" placeholder="DATOS PERSONALES..." disabled>
                                    <label for="apellido">APELLIDO:</label>
                                    <input type="text" id="UPD_aueM_txtApellido" class="form-control text-uppercase text-white" placeholder="DATOS PERSONALES..." disabled>                                    
                                </div>
                                <div class="form-group text-center pt-4">
                                    <button id="UPD_aueM_btnAsignar" onclick="execute_upd_Usuario_Estacion()" class="btn btn-warning btn-lg" >ACTUALIZAR ASIGNACIÓN</button>                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input type="hidden" id="UPD_aueM_id_station">
                                <input type="hidden" id="UPD_aueM_id_user">
                                <input type="hidden" id="UPD_aueM_id_user_select">
                                <span><small>Hola mundo</small></span>
                            </div>
                            </div>
                        </div>
                    </div>                    
                    <!--FIN MODAL-->                               
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