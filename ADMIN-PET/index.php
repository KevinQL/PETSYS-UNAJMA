<?php
    session_start();
    
    require_once("controllers/adminController.php");
    
    $pag = new adminController();

    $session = $pag->verificarSessionController();        
    
    $paginaResult = $pag->administrarPaginasController($session);
    
    include_once("views/".$paginaResult);     


?>