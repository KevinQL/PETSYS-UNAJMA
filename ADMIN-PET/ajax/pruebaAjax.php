<?php

$data = json_decode($_REQUEST['data']);

$file = $_FILES['archivo'];

$nombre = $file['name'];
$tmg_save = $file['tmp_name'];

if(!file_exists('archivos')){
    mkdir('archivos',0777,true);
    $resultado = move_uploaded_file($tmg_save, 'archivos/'.$nombre);
}else{
    $resultado = move_uploaded_file($tmg_save, 'archivos/'.$nombre);
}

if($resultado){
    
    echo json_encode($data);
    
}else{
    echo json_encode("errrrrror");
}
/*
*/