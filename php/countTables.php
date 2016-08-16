<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$nombreBD = $_POST['insertIn'];

	// Conectando, seleccionando la base de datos
	$enlace = mysql_connect('localhost', $username, $password);
	if (!$enlace) {
    
	} else{
	
		$sql = "SHOW TABLES FROM $nombreBD";
		$resultado = mysql_query($sql);

		while ($fila = mysql_fetch_row($resultado)) {
		    echo "$fila[0]\n";
		}

		mysql_free_result($resultado);
	}	

?>