<?php

    //session_start();

    $conAjax = true;

    require_once("../controllers/adminController.php");

    if(!is_null($_POST['data'])){
        
        $data = json_decode($_POST['data']);
    
        if($data->id === "SESSION"){

            $session = new adminController();
            $res = $session->sessionController($data);
            echo json_encode($res);
            
        }else {
            echo json_encode("ERROR!!");
        }
    }else{
        echo json_encode("ERROR!!");
    }
    

?>