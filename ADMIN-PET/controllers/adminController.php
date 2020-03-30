<?php

require_once("models/adminModel.php");

class adminController extends adminModel{

    public function verificarSessionController(){
        $session = (isset($_SESSION['start']) && !empty($_SESSION['start']) &&!is_null($_SESSION)) ? true:false;
        return $session;
    }
    
    public function administrarPaginasController($session){
        if($session){

            $pagina = isset($_GET['pg']) && !empty($_GET['pg']) ? $_GET['pg'] : "login";

            $pagina = strtolower(trim($pagina));  
                      
            $arrayPaginas = ["inicio","info","salir_sistema"];

            include_once("views/modules/navegacion.html");

            if(in_array($pagina,$arrayPaginas,true)){
                $pagina .= ".php";
            }else {
                $pagina = "inicio.php";
            }
        }else{
            $pagina = "login.php";
        }     
        return $pagina;
    }

}



?>