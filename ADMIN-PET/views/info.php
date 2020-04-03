<!DOCTYPE html>
<html lang="en">
<head>
    
    <?php
        include_once('views/modules/cdnsheader.html');
    ?>

    <title>Info</title>
</head>
<body>
    <?php
        include_once("views/modules/navegacion.html");
    ?>

    <h1>PÁGIANA DE INFORMACIÓN</h1>
    
    <?php

// Object-styled definition of an employee 
$employee_object = new stdClass; 
$employee_object->name = "John Doe"; 
$employee_object->position = "Software Engineer"; 
$employee_object->address = "53, nth street, city"; 
$employee_object->status = "Best"; 
      
// Display the employee contents 
print_r($employee_object);

    ?>

    <?php
        include_once('views/modules/cdnsfooter.html');
    ?>

</body>
</html>