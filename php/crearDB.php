<?php

	session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$nombreBD = $_POST['DBnombre'];

	// Conectando, seleccionando la base de datos
	$enlace = mysql_connect('localhost', $username, $password);
	if (!$enlace) {
    
	} else{
	
		$sql = "CREATE DATABASE IF NOT EXISTS $nombreBD";
		if (mysql_query($sql, $enlace)) {
		   
		    echo "success ";
		    //Cargar DB
			$lista_bd = mysql_list_dbs($enlace);

			while ($fila = mysql_fetch_object($lista_bd)) {
	     		echo $fila->Database.' ';
			}

		} else {

		}
	}
?>