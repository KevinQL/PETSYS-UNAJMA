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
            $query = "SELECT id,dni,nombre,apellido,user,password,tipo_usuario,estado FROM usuario WHERE user='{$user}' AND estado=1";
            $result = mainModel::ejecutar_una_consulta($query);
            if($result->rowCount() >= 1){
                $arr = [];
                $eval = false;
                while($user = $result->fetch(PDO::FETCH_ASSOC)){
                    if(self::encriptar_desencriptar($password,$user['password'])){
                        $arr = $user;
                        $eval = true;
                    }
                }
                return ['eval'=>$eval,'data'=>$arr];
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

        protected function insert_usuario_Model($data){
            $query = "INSERT INTO usuario SET
                    dni = '{$data->dni}',
                    nombre = '{$data->nombre}',
                    apellido = '{$data->apellido}',
                    user = '{$data->user}',
                    password = '{$data->password}',
                    tipo_usuario = {$data->tipo_usuario},
                    estado = {$data->estado}
                ";
            
            $result = mainModel::ejecutar_una_consulta($query);
            if($result->rowCount() >= 1){
                return ["eval"=>true,'data'=>[$data]];
            }else{
                return ['eval'=>false,'data'=>[]];
            }
        }

        protected function insert_estacion_Model($data){
            $query = "INSERT INTO estacion SET
                    nombre = '{$data->nombre}',
                    ubicacion = '{$data->ubicacion}',
                    departamento = '{$data->departamento}',
                    provincia = '{$data->provincia}',
                    distrito = '{$data->distrito}',
                    estado = {$data->estado}
                ";
            $result = mainModel::ejecutar_una_consulta($query);
            if($result->rowCount() >= 1){
                return ["eval"=>true,'data'=>[$data]];
            }else{
                return ['eval'=>false,'data'=>[]];
            }
        }

        protected function select_estacion_Model($data){
            $query = "SELECT * FROM estacion WHERE nombre LIKE '%{$data->nombre}%' LIMIT 2";
            $resultQuery = self::ejecutar_una_consulta($query);
            if($resultQuery->rowCount() >= 1){
                $arr_data = [];
                while($register = $resultQuery->fetch(PDO::FETCH_ASSOC) ){
                    $arr_data[] = $register;
                }
                return ['aval'=>true,'data'=>$arr_data];
            }else{
                return['eval'=>false,'data'=>[]];
            }
        }



        //-------------------------------------------------------------------------------
        /**
         * si es verad encripta y sino desencripta
         * @param boolean $encriptar
         * Contraseña a encriptar o desencriptar
         * @param string $password
         * @return string boolean
         * 
         * Función que encripta y desencripta
         */        
        protected function encriptar_desencriptar($password,$password_db){
            if(trim($password_db) === ''){
                return password_hash($password, PASSWORD_DEFAULT);
            }else{
                return password_verify($password,$password_db);
            }
        }



    }

?>