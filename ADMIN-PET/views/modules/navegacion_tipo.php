<?php

    if($_SESSION['data']['tipo_usuario']==1){
        include_once("views/modules/navegacion_adm.html");
    }else{
        include_once("views/modules/navegacion_user.html");
    }


?>