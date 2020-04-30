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
            $query= "SELECT e.* FROM usuario_tiene_estacion ue 
                        RIGHT JOIN estacion e on e.idestacion = ue.estacion_idestacion 
                        WHERE e.estado=1 AND e.nombre LIKE '%{$data->nombre}%' AND ue.estacion_idestacion IS NULL
                        LIMIT 7
            ";
            //$query = "SELECT * FROM estacion WHERE nombre LIKE '%{$data->nombre}%' LIMIT 7";
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

        protected function select_estacion_usuario_Model($data){
            $query = "SELECT id,nombre,apellido FROM usuario WHERE dni='{$data->dni}' AND estado=1";
            $resquery = self::ejecutar_una_consulta($query);
            if($resquery->rowCount() >= 1){
                return ['eval'=>true,'data'=> $resquery->fetch(PDO::FETCH_ASSOC)];
            }   
            return ['eval'=>false,'data'=>[]];         
        }

        protected function insert_estacion_usuario_Model($data){
            $query = "INSERT usuario_tiene_estacion SET 
                        usuario_id='{$data->usuario_id}', estacion_idestacion='{$data->estacion_idestacion}'";
            $resquery = self::ejecutar_una_consulta($query);
            if($resquery->rowCount() >= 1){
                return ['eval'=>true,'data'=>[$data]];
            }   
            return ['eval'=>false,'data'=>[]];     
        }

        protected function select_estacion_to_update_Model($data){
            $query = "SELECT u.id, u.dni, u.nombre as nombre_usuario, u.apellido, e.* FROM estacion e 
                        INNER JOIN usuario_tiene_estacion ue
                        ON e.idestacion = ue.estacion_idestacion 
                        INNER JOIN usuario u 
                        ON u.id = ue.usuario_id
                        WHERE e.nombre LIKE '%{$data->nombre}%'";

            $resquery = self::ejecutar_una_consulta($query);
            if($resquery->rowCount() >= 1){
                $arr_data = [];
                while($estacion = $resquery->fetch(PDO::FETCH_ASSOC)){
                    $arr_data[] = $estacion;
                }
                return ['eval'=>true,'data'=>$arr_data];
            }   
            return ['eval'=>false,'data'=>[]];    
        }


        protected function update_user_station_Model($data){
            $query = "UPDATE usuario_tiene_estacion SET usuario_id={$data->usuario_id} WHERE estacion_idestacion={$data->estacion_idestacion}";
            $resquery = self::ejecutar_una_consulta($query);
            if($resquery->rowCount() >= 1){
                return ['eval'=>true,'data'=>$data];
            }
            return ['eval'=>false,'data'=>$data];
        }

        protected function traerEtiquetasModel($data){
            //$query = "SELECT nombre FROM residuo WHERE usuario_id = '1'";
            $query = "SELECT idresiduo, nombre FROM residuo WHERE residuo.usuario_id = '{$data->id}'";

            $resquery = self::ejecutar_una_consulta($query);
            if($resquery->rowCount()>=1){
                $arrayEtiquetas = [];
                while($etiqueta = $resquery->fetch(PDO::FETCH_ASSOC)){
                    $arrayEtiquetas[] = $etiqueta;
                }
                return ['eval'=>true, 'data'=>$arrayEtiquetas];
            }
            return ['eval'=>false,'data'=>[]];
        }

        protected function select_list_of_label_Model($data){
            $query = "SELECT residuo.idresiduo, residuo.nombre, usuario.dni, usuario.nombre as user_name, usuario.apellido as user_lastname FROM residuo 
                    INNER JOIN usuario ON residuo.usuario_id = usuario.id
                    WHERE usuario.dni = '{$data->dni}'";

            $resquery = self::ejecutar_una_consulta($query);
            if($resquery->rowCount()>=1){
                $arrayEtiquetas = [];
                while($etiqueta = $resquery->fetch(PDO::FETCH_ASSOC)){
                    $arrayEtiquetas[] = $etiqueta;
                }
                return ['eval'=>true, 'data'=>$arrayEtiquetas];
            }
            return ['eval'=>false,'data'=>[]];
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