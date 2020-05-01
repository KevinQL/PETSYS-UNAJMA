<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modelo Existente</title>
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
    <script src="./views/js/m_existente/sketch.js"></script>

</head>
<body>
<!---->
    <?php    
        include_once "./views/modules/navegacion.html";                
    ?>


    <div class="jumbotron container my-4 pt-4">

        <div class="row col-md-12">            
            <button class="btn btn-lg btn-outline-warning px-5 w-25 d-inline-block " onclick="subirModelo()">SUBIR MODELO</button>
        </div>        
        
        <hr class="mt-1">
        
        <?php 
        //poner condicional
        if(file_exists("../src/public/modelo_knn/modelo.json")){
            //echo "Existe!!";            
        ?>
        <div class="row">

            <div class="col-md-12 pb-5">
                <br>                
                <input type="text" class="form-control d-inline-block w-25" onkeyup="buscarEtiqueta(this)" placeholder="USUARIO DNI">   
                <small class="text-muted d-block text-small mb-1">Cargar las etiquetas de un usuario determinado.</small>                                
                <span class="mr-1"><i class="fas fa-user-check fa-lg"></i></span>
                <span class="mt-2 text-success text-uppercase usuario-nombre"><?php echo "{$_SESSION['data']['nombre']} {$_SESSION['data']['apellido']}"?></span>
            </div>

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

            </div>
        </div>
        
        <?php 
            //fin if 
            }
            //En caso de que no existe el archivo
            else{
                echo "No existe!";
            
        ?>

        <div class="row">
           <p>No Tienes Cargado un Modelo</p>                 
        </div>
        
        <?php
            //fin else
            }
        ?>

    </div>



    <?php
        include_once "./views/modules/cdnsfooter.html";
    ?>
    <script src="./views/js/m_existente/scripts.js"></script>
<!---->
</body>
</html>


