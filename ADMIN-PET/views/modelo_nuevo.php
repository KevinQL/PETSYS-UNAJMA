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



<div class="container">
    <div class="row">
        <div class="col-md-8">
            <h1>SCREEM CARRUSEL</h1>   
            
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
        </div>
        <div class="col-md-4">
            <h1>VIDEO IA</h1>
            <button class="btn btn-outline-dark btn-lg" id="btn-tocar">
                INICIAR APP
            </button>
            <hr>
            <div id="canvas">        
            </div>
            <hr>
            <div class="" id="txtResultClas">
                ...
            </div>
        </div>
    </div>
</div>


    <?php
        include_once "./views/modules/cdnsfooter.html";
    ?>
    <script src="./views/js/m_nuevo/scripts.js"></script>
<!---->
</body>
</html>


