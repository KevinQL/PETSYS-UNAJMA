<?php

require_once("models/mainModel.php");

class adminModel extends mainModel{
    
    protected function consultaSimple($sql){
        if(mainModel::ConnectDB()){
            return "Model->".$sql;
        }else {
            return "error en la consulta";
        }
    }

}

?>