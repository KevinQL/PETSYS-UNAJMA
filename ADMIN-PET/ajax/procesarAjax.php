<?php

    session_start();

    $conAjax = true;

    require_once("../controllers/adminController.php");

    if(!is_null($_POST['data'])){
        
        $data = json_decode($_POST['data']);
    
        if($data->id === "SESSION"){
            # code...
            $session = new adminController();
            $res_session = $session->sessionController($data);
            echo json_encode($res_session);
            
        }
        elseif($data->id === "I-USUARIO-INICIO"){
            # code...
            $usuario = new adminController();
            $res_usuario = $usuario->insert_usuario_inicio_Controller($data);
            echo json_encode($res_usuario);
        }
        elseif ($data->id === "I-ETIQUETA") {
            # code...
            $etiqueta = new adminController();
            $res_etiqueta = $etiqueta->insert_etiqueta_Controller($data);
            echo json_encode($res_etiqueta);
        }
        elseif ($data->id === "I-USUARIO") {
            # code...
            $usuario = new adminController();
            $res_usuario = $usuario->insert_usuario_Controller($data);
            echo json_encode($res_usuario);
        }
        elseif ($data->id === "I-ESTACION") {
            # code...
            $estacion = new adminController();
            $res_estacion = $estacion->insert_estacion_Controller($data);
            echo json_encode($res_estacion);
        }
        elseif ($data->id === "S-ESTACION") {
            # code...
            $estacion_asig = new adminController();
            $res_estacion_asig = $estacion_asig->select_estacion_Controller($data);
            echo json_encode($res_estacion_asig);
        }
    
        else {
            echo json_encode("ERROR!!");
        }
    }else{
        echo json_encode("ERROR!!");
    }
    

?>