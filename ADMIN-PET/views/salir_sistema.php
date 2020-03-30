<?php

    unset($_SESSION['start']);
    session_destroy();
    
    echo "Saliendo sistema";

    header("location:?pg=");

?>