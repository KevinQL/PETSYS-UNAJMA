<?php

    $conAjax = is_null($conAjax)?false:$conAjax;
    if($conAjax){
        require_once "../models/mainModel.php";
    }else{
        require_once "./models/mainModel.php";
    }

    class adminModel extends mainModel{
        
        protected function consultaSimple($sql){
            if(mainModel::ConnectDB()){
                return "Model->".$sql;
            }else {
                return "error en la consulta";
            }
        }
        
        protected function sqlSingle($sql){
            $result = mainModel::ejecutar_una_consulta($sql);
            return $result;
        }


        /**
         * 
         */
        protected function obtenerUsuarioSession($user,$password){
            $query = "SELECT id,dni,nombre,apellido,user,password,tipo_usuario,estado FROM usuario WHERE user='{$user}' AND password='{$password}' AND estado=1";
            $result = mainModel::ejecutar_una_consulta($query);
            if($result->rowCount() >= 1){
                return ['eval'=>true,'data'=>$result];
            }else{
                return ['eval'=>false, 'data'=>[]];
            }
        }

    }

?>