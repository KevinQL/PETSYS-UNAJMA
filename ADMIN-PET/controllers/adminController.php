<?php

    $conAjax = is_null($conAjax)?false:$conAjax;
    if($conAjax){
        require_once "../models/adminModel.php";
    }else{
        require_once "./models/adminModel.php";
    }

    class adminController extends adminModel{

        public function verificarSessionController(){
            $session = (isset($_SESSION['start']) && !empty($_SESSION['start']) &&!is_null($_SESSION)) ? true:false;
            return $session;
        }
        
        public function administrarPaginasController($session){

            if($session){
                
                $pagina = isset($_GET['pg']) && !empty($_GET['pg']) ? $_GET['pg'] : "login";
                $pagina = strtolower(trim($pagina));   

                //Validando niveles de seguridad. [1]:NIVEL ADMINISTRADOR
                if($_SESSION['data']['tipo_usuario']==1){
                    $arrayPaginas = ["salir_sistema","inicio","info",'registrar_usuario',"etiqueta"];
                }else{
                    $arrayPaginas = ["salir_sistema","inicio","info","etiqueta"];
                }              

                if(in_array($pagina,$arrayPaginas,true)){
                    $pagina .= ".php";
                }else {
                    $pagina = "inicio.php";
                }

            }else{

                $pagina = isset($_GET['pg']) && !empty($_GET['pg']) ? $_GET['pg'] : "login";
                $pagina = strtolower(trim($pagina));                          
                $arrayPaginas = ['login',"registrar_usuario"];

                if(in_array($pagina,$arrayPaginas,true)){
                    $pagina .= ".php";
                }else {
                    $pagina = "login.php";
                }                
            
            }  

            return $pagina;

        }



        public function traerUser(){
            $result = adminModel::sqlSingle("SELECT * FROM usuario");
            return $result->fetch(PDO::FETCH_ASSOC);
        }


        /**
         * 
         */
        public function sessionController($data){

            $user = $this->txtres($data->user);
            $password = $this->txtres($data->password);

            $resModel = adminModel::obtenerUsuarioSession($user,$password);
            
            if($resModel['eval']){           

                $resData = $resModel['data']->fetch(PDO::FETCH_ASSOC);
                if($user == $resData['user'] && $password == $resData['password']){
                    session_start();
                    $_SESSION['start']=true;
                    $_SESSION['data']=$resData;
                    return ['eval'=>true,'data'=>$resData];
                }
            }else{
                return ['eval'=>false,'data'=>[]];
            }
        }

        /**
         * Parametro
         * @param {string} $variable
         * @return {string}
         * 
         * Limpia los espacios al principio y alfinal y luego lo convierte a minuscula
         */
        private function txtres($variable){
            return strtolower(trim($variable));
        }

    }



?>