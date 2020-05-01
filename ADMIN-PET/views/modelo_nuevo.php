<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modelo Nuevo</title>
    <?php
        include_once "./views/modules/cdnsheader.html";
    ?>

    <!-- p5 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
    <!-- ml5 -->
    <script src="https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"></script>
    <!-- scripts me -->
    <script src="./views/js/m_nuevo/sketch.js"></script>

</head>
<body>
<!---->
    <?php
        
        include_once "./views/modules/navegacion.html";
       
    ?>


    <div class="jumbotron container my-4">

        <div class="col-md-4">
            <h4>Buscar Usuario</h4>                    
            <input type="text" class="form-control d-inline-block" onkeyup="buscarEtiqueta(this)" placeholder="INGRESE DNI">   
            <span class="mr-1"><i class="fas fa-user-check fa-lg"></i></span>
            <span class="py-2 d-inline-block text-small text-success usuario-nombre text-uppercase"><?php echo "{$_SESSION['data']['nombre']} {$_SESSION['data']['apellido']}"?></span>
        </div>        
        
        <hr class="my-4">
        
        <div class="row">
            <div class="col-md-4">                
                <div id="canvas">     
                    la camara está en funcionamiento... 
                </div>
                <hr>
                <div class="" id="txtResultClas">
                    Espereando respuesta...
                </div>
            </div>
            <!-- segunda seccion-->
            <div class="col-md-8">                
                <div class="bg-success p-2 mb-4 text-center">                    
                    <i class="fas fa-robot fa-2x"></i>                  
                </div>              

                <div>
                    <h4>SELECCIONAR ETIQUETA</h4>                    
                    <div class="form-group" id="option-select">
                        <?php
                                                    
                            $set_Etiquetas = new adminController();                            
                            $dataRes = $set_Etiquetas->traerEtiquetas_Controller($_SESSION["data"]["id"]);
                            
                            if($dataRes['eval']){
                                $myHtml = '
                                    <select class="custom-select form-control text-uppercase" id="etiqueta_select" onclick="obtenerEtiqueta_s()">
                                        <option selected="0" value="-1" class="form-control form-control-lg p-2 bg-light ">Seleccionar Etiqueta</option> 
                                    ';
                                foreach ($dataRes['data'] as $value) {
                                    # code...
                                    $myHtml .= "
                                        <option value='{$value['idresiduo']}' name='{$value['nombre']}' class='form-control p-2 bg-light' >{$value['nombre']}</option> 
                                    ";
                                }     
                                $myHtml .= '</select>';    
                                
                                echo $myHtml;
                            }else{
                                echo "No existen etiquetas. Debe crearlas...";
                            }

                        ?>
                        <!--
                        <select class="custom-select form-control" id="etiqueta_select">                            
                            <option selected="0" value="1" class="form-control form-control-lg p-2 bg-light ">Seleccionar Etiqueta</option>                   
                            <option value="3" name="PAPEL" class="form-control p-2 bg-light" >PAPEL</option>
                            <option value="7" name="BOTELLA" class="form-control p-2 bg-light ">BOTELLA</option>
                        </select>
                        -->
                    </div>    
                </div>

                <div class="py-2 text-center">
                    <span>ENTRENAR: </span> <span class="res"></span>
                    <br>
                    <button class="btn btn-outline-success btn-lg p-5 d-block w-100 text-uppercase btnEntrenarTxt btnentrenar">Seleccionar etiqueta</button>
                </div>  

                <hr>
                <h4>RESULTADO MODELO</h4>    
                <button class="btn btn-primary btn-lg d-inline-block py-3 px-5" onclick="GuardarNeurona()">OBTENER MODELO</button>
                
                <!--
                <button class="btn btn-outline-success btn-lg btnentrenar">
                    BOTELLA
                </button> 
                <button class="btn btn-outline-success btn-lg btnentrenar">
                    NADA
                </button>    
                <hr>
                <button class="btn btn-outline-danger btn-lg" onclick="GuardarNeurona()">
                    GUARDAR
                </button> 
                <button class="btn btn-outline-danger btn-lg" onclick="CargarNeurona()">
                    CARGAR
                </button>     
                -->
            </div>
        </div>
    </div>



    <?php
        include_once "./views/modules/cdnsfooter.html";
    ?>
    <script src="./views/js/m_main.js"></script>
    <script src="./views/js/m_nuevo/scripts.js"></script>
<!---->
</body>
</html>


