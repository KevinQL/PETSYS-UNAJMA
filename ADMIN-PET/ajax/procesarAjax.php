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
        elseif ($data->id === "S-USUARIO-ESTACION") {
            # code...
            $estacion_asig = new adminController();
            $res_estacion_asig = $estacion_asig->select_estacion_usuario_Controller($data);
            echo json_encode($res_estacion_asig);
        }
        elseif ($data->id === "I-ESTACION-USUARIO") {
            # code...
            $estacion_asig = new adminController();
            $res_estacion_asig = $estacion_asig->insert_estacion_usuario_Controller($data);
            echo json_encode($res_estacion_asig);
        }
        elseif ($data->id === "S-ESTACION-CONFIG") {
            # code...
            $estacion_asig = new adminController();
            $res_estacion_asig = $estacion_asig->select_estacion_to_update_Controller($data);
            echo json_encode($res_estacion_asig);
        }
        elseif ($data->id === "UPDATE_USER_STATION") {
            # code...
            $estacion_asig = new adminController();
            $res_estacion_asig = $estacion_asig->update_user_station_Controller($data);            
            echo json_encode($res_estacion_asig);
        }
        elseif ( $data->id === "S-ETIQUETAS-MN"){
            $etiqueta = new adminController();
            $res_etiqueta= $etiqueta->select_list_of_label_Controller($data);  
            echo json_encode($res_etiqueta);
        }
        
        elseif ( $data->id === "UPDATE_TIPOUSUARIOS_ADM"){
            $obj = new adminController();
            $res_sql = $obj->update_tipoUsuario_Controller($data);
            echo json_encode($res_sql);
        }

        elseif ( $data->id === "UPDATE_VALIDARUSUARIOS_ADM"){
            $obj = new adminController();
            $res_sql = $obj->update_validarUsuario_Controller($data);
            echo json_encode($res_sql);
        }
        // obtener usuarios en la tabl
        elseif ( $data->id === "obtener-usarios"){
            $obj = new adminController();
            $res_sql = $obj->obtenerUsuario_Controller($data);
            echo json_encode($res_sql);
        }
        // actualizaar usuarios en la tabl
        elseif ( $data->id === "actualizar-usuario"){
            $obj = new adminController();
            $res_sql = $obj->actualizarUsuario_Controller($data);
            echo json_encode($res_sql);
        }
        // actualizaar usuarios en la tabl
        elseif ( $data->id === "eliminar-usuario"){
            $obj = new adminController();
            $res_sql = $obj->eliminarUsuario_Controller($data);
            echo json_encode($res_sql);
        }


        else {
            echo json_encode("ERROR!!");
        }
    }else{
        echo json_encode("ERROR!!");
    }
    

?>