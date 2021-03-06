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
                    // $arrayPaginas = ["salir_sistema","inicio","etiqueta",'adm_usuario','adm_estacion','asignar_usuario_estacion', 'modelo_nuevo',"modelo_existente","run_nodejs","info"];
                    $arrayPaginas = ["salir_sistema","inicio_adm",'adm_usuario','adm_estacion','asignar_usuario_estacion',"info",  "validar_usuario_adm"];
                    $pagina = $this->pagina_sistema($pagina, $arrayPaginas, "inicio_adm.php");
                }else{
                    $arrayPaginas = ["salir_sistema","inicio","info", "run_nodejs","etiqueta",'modelo_nuevo',"modelo_existente"];
                    $pagina = $this->pagina_sistema($pagina, $arrayPaginas, "inicio.php");
                }

            }else{

                $pagina = isset($_GET['pg']) && !empty($_GET['pg']) ? $_GET['pg'] : "login";
                $pagina = strtolower(trim($pagina));                          
                $arrayPaginas = ['login',"usuario_registro"];

                if(in_array($pagina,$arrayPaginas,true)){
                    $pagina .= ".php";
                }else {
                    $pagina = "login.php";
                }                
            
            }  

            return $pagina;

        }

        /**
         * Devuelve la página indicada para cada nivel de usuario 
         */
        public function pagina_sistema($pagina, $arr_pags, $pag_def){
            $res_pag = $pag_def;
            if(in_array($pagina, $arr_pags,true)){
                $res_pag = $pagina . ".php";
            }  
            return $res_pag;
        }


        /**
         * 
         */
        public function traerUser(){
            $result = adminModel::sqlSingle("SELECT * FROM usuario");
            return $result;
        }

        /**
         * 
         */
        public function mensajeController(){
            return "plantilla Controller Response OK!";
        }

        /**
         * 
         */
        public function sessionController($data){
            //Recibiendo datos de la página
            $user = $this->txtres($data->userv);
            $password = $this->txtres($data->passwordv);
            //enviado datos al modelo
            $resModel = adminModel::obtenerUsuarioSession($user,$password);
            //evaluando resultados
            if($resModel['eval']){           
                //Obtener datos. y devolviendo resultado a la pagina (vista-usuario)
                $resData = $resModel['data'];
                //Iniciando session
                session_start();
                $_SESSION['start']=true;
                $_SESSION['data']=$resData;
                //Retornando los datos a la vista
                return ['eval'=>true,'data'=>$resData];                
            }else{
                return ['eval'=>false,'data'=>[]];
            }
        }


        /**
         * @return Array
         * @param String $data
         * Funcion que insertar etiquetas en la db
         */
        public function insert_etiqueta_Controller($data){  

            $dataModel = new stdClass; 

            $dataModel->txtNombrev = $this->txtres($data->txtNombrev);
            $dataModel->txtDetallesv = $this->txtres($data->txtDetallesv);
            $dataModel->txtPesov = $this->txtres($data->txtPesov);
            $dataModel->txtPreciov = $this->txtres($data->txtPreciov);            
            $dataModel->usuario_idv = self::usuario()['id'];

            $resModel = adminModel::insert_etiqueta_Model($dataModel);
            
            return $resModel;            

        }

        /**
         * @return Array
         * @param Object $data
         * Funcion que insertar usuarios en la db
         */
        public function insert_usuario_Controller($data){  

            $password_hash = self::encriptar_desencriptar($this->txtres($data->txtPasswordv),'');

            $dataModel = new stdClass; 

            $dataModel->dni = $this->txtres($data->txtDniv);
            $dataModel->nombre = $this->txtres($data->txtNombrev);
            $dataModel->apellido = $this->txtres($data->txtApellidov);
            $dataModel->user = $this->txtres($data->txtUsuariov);                        
            $dataModel->password = $password_hash;                        
            $dataModel->tipo_usuario = ( $this->txtres($data->radioNivelUsuariov)==="administrador" ) ? 1 : 2 ;                        
            $dataModel->estado = ( $this->txtres($data->switchEstadov) ) ? 1 : 0 ;                        

            $resModel = adminModel::insert_usuario_Model($dataModel);
            
            return $resModel;            
            
        }

        /**
         * @return Array
         * @param Object $data
         * Funcion que insertar usuarios en la db
         */
        public function insert_usuario_inicio_Controller($data){  
            $data->radioNivelUsuariov = 'usuario';
            $data->switchEstadov = false;
            $password_hash = self::encriptar_desencriptar($this->txtres($data->txtPasswordv),'');
            
            $dataModel = new stdClass; 

            $dataModel->dni = $this->txtres($data->txtDniv);
            $dataModel->nombre = $this->txtres($data->txtNombrev);
            $dataModel->apellido = $this->txtres($data->txtApellidov);
            $dataModel->user = $this->txtres($data->txtUsuariov);                        
            $dataModel->password = $password_hash;                        
            $dataModel->tipo_usuario = ( $this->txtres($data->radioNivelUsuariov)==="administrador" ) ? 1 : 2 ;                        
            $dataModel->estado = ( $data->switchEstadov ) ? 1 : 0 ;                        

            $resModel = adminModel::insert_usuario_Model($dataModel);
            
            return $resModel;            
            
        }


        /**
         * 
         * 
         */
        public function insert_estacion_Controller($data){
            
            $dataModel = new stdClass;

            $dataModel->nombre = $this->txtres($data->txtNombrev);
            $dataModel->ubicacion = $this->txtres($data->txtUbicacionv);
            $dataModel->departamento = $this->txtres($data->txtDepartamentov);
            $dataModel->provincia = $this->txtres($data->txtProvinciav);
            $dataModel->distrito = $this->txtres($data->txtDistritov);
            $dataModel->estado = ( $data->estadov ) ? 1 : 0;

            $resModel = self::insert_estacion_Model($dataModel);

            return $resModel;
        }

        /**
         * 
         */
        public function select_estacion_Controller($data){
            $dataModel = new stdClass;

            $dataModel->nombre = $this->txtres($data->txtbuscarv);

            $resModel = self::select_estacion_Model($dataModel);

            return $resModel;
        }

        /**
         * 
         */
        public function select_estacion_usuario_Controller($data){
            $dataModel = new stdClass;

            $dataModel->dni = $data->txtDniv;

            $resModel = self::select_estacion_usuario_Model($dataModel);

            return $resModel;
        }
        /**
         * 
         */
        public function insert_estacion_usuario_Controller($data){
            $dataModel = new stdClass;

            $dataModel->usuario_id = $data->id_userv;
            $dataModel->estacion_idestacion = $data->id_stationv;
            

            $resModel = self::insert_estacion_usuario_Model($dataModel);

            return $resModel;
        }

        /**
         * 
         */
        public function select_estacion_to_update_Controller($data){
            $dataModel = new stdClass;

            $dataModel->nombre = $data->txtBuscarv;

            $resModel = self::select_estacion_to_update_Model($dataModel);

            return $resModel;
        }

        /**
         * 
         */
        public function update_user_station_Controller($data){
            $dataModel = new stdClass;

            $dataModel->usuario_id = $data->id_userv;
            $dataModel->estacion_idestacion = $data->id_stationv;

            $resModel = self::update_user_station_Model($dataModel);

            return $resModel;
        }


        public function traerEtiquetas_Controller($id){

            $dataModel = new stdClass;
            $dataModel->id = $id;
            $resModel = self::traerEtiquetasModel($dataModel);

            return $resModel;            
        }


        public function select_list_of_label_Controller($data){
            
            $dataModel = new stdClass;
            $dataModel->dni = $data->dni;
            $resModel = self::select_list_of_label_Model($dataModel);
            return $resModel;
        }


        public function update_tipoUsuario_Controller($data){
            $dataModel = new stdClass;
            $dataModel->id = $data->id_user;
            $dataModel->tipo_usuario = $data->valor_tipoUser;
            $resModel = self::update_tipoUsuario_Model($dataModel);
            return $resModel;
        }


        public function update_validarUsuario_Controller($data){
            $dataModel = new stdClass;
            $dataModel->id = $data->id_user;
            $dataModel->estado = $data->valor_validarUser;
            $resModel = self::update_validarUsuario_Model($dataModel);
            return $resModel;
        }


        public function obtenerUsuario_Controller($data){
            $resModel = self::obtenerUsuario_Model($data);
            return $resModel;
        }


        public function actualizarUsuario_Controller($data){
            $dataModel = new stdClass;

            $dataModel->id = $data->idv;
            $dataModel->dni = $data->dniv;
            $dataModel->nombre = $data->nombrev;
            $dataModel->apellido = $data->apellidov;

            $resModel = self::actualizarUsuario_Model($dataModel);
            return $resModel;
        }

        public function eliminarUsuario_Controller($data){
            $dataModel = new stdClass;
            
            $dataModel->id = $data->idv;
            $resModel = self::eliminarUsuario_Model($dataModel);
            return $resModel;
        }


        public function obtenerEstacion_Controller($data){
            $resModel = self::obtenerEstacion_Model($data);
            return $resModel;
        }

        public function actuaizarEstacion_Controller($data){
            $dataModel = new stdClass;

            $dataModel->idestacion = $data->idv;
            $dataModel->nombre = $data->nombrev;
            $dataModel->ubicacion = $data->ubicacionv;
            $dataModel->departamento = $data->departamentov;
            $dataModel->provincia = $data->provinciav;
            $dataModel->distrito = $data->distritov;

            $resModel = self::actuaizarEstacion_Model($dataModel);
            return $resModel;
        }

        public function eliminarEstacion_Controller($data){
            $dataModel = new stdClass;
            
            $dataModel->idestacion = $data->idv;
            $resModel = self::eliminarEstacion_Model($dataModel);
            return $resModel;
        }

        //------------------------------------------------------------------------------


        /**
         * Datos del usuario actual registrado o logueado
         */
        private function usuario(){
            session_start();
            return $_SESSION['data'];
        }


        /**
         * Parametro
         * @param {string} $variable
         * @return {string}
         * 
         * Limpia los espacios al principio y alfinal y luego lo convierte a minuscula
        */
        private function txtres($variable){
            return mb_strtolower(trim($variable),'UTF-8');            
        }



    }



?>