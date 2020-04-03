<?php

    $conAjax = is_null($conAjax)?false:$conAjax;
    if($conAjax){
        require_once "../models/mainModel.php";
    }else{
        require_once "./models/mainModel.php";
    }

    class adminModel extends mainModel{        
        
        //funcion para probar consulta
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

        /**
         * 
         */
        protected function insert_etiqueta_Model($data){
            $query = "INSERT INTO residuo SET
                    nombre = '{$data->txtNombrev}',
                    detalles = '{$data->txtDetallesv}',
                    peso_promedio_kg = '{$data->txtPesov}',
                    precio_valorado_unidad = '{$data->txtPreciov}' ,
                    usuario_id = {$data->usuario_idv}
                ";
            $result = mainModel::ejecutar_una_consulta($query);
            if($result->rowCount() >= 1){
                return ["eval"=>true,'data'=>[$data]];
            }else{
                return ['eval'=>false,'data'=>[]];
            }
        }

    }

?>