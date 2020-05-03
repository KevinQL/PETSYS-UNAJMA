<?php
/**
 * en este archivo se maneja el guardado del archivo modelo .json
 */

$data = json_decode($_REQUEST['data']);

$file = $_FILES['archivo'];

//$nombre = $file['name'];
$nombre = "clasificador.json";
$tmg_save = $file['tmp_name'];

//$dir_model_compartido = '../../src/public/modelo_knn';
$dir_model_compartido = '../public';

if(!file_exists($dir_model_compartido)){
    mkdir($dir_model_compartido,0777,true); //creando directorio si no existe...
    $resultado = move_uploaded_file($tmg_save, $dir_model_compartido.'/'.$nombre); //se guarda el modelo json
}else{
    $resultado = move_uploaded_file($tmg_save, $dir_model_compartido.'/'.$nombre); //se guarda el modelo json
    //$resultado = move_uploaded_file($tmg_save, '../public/'.$nombre); //se guarda el modelo json
}

if($resultado){
    
    echo json_encode($data);
    
}else{
    echo json_encode("errrrrror");
}
/*
*/
