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
            
        }elseif ($data->id === "I-ETIQUETA") {
            # code...
            $etiqueta = new adminController();
            $res_etiqueta = $etiqueta->insert_etiqueta_Controller($data);
            echo json_encode($res_etiqueta);
        }
    
        else {
            echo json_encode("ERROR!!");
        }
    }else{
        echo json_encode("ERROR!!");
    }
    

?>