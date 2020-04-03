<?php

    //session_start();

    $conAjax = true;

    require_once("../controllers/adminController.php");

    if(!is_null($_POST['data'])){
        
        $data = json_decode($_POST['data']);
    
        if($data->id === "SESSION"){
            # code...
            $session = new adminController();
            $res = $session->sessionController($data);
            echo json_encode($res);
            
        }elseif ($data->id === "I-ETIQUETA") {
            # code...
            echo json_encode($data);
        }
    
        else {
            echo json_encode("ERROR!!");
        }
    }else{
        echo json_encode("ERROR!!");
    }
    

?>