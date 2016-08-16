<?php
	session_start();

	$user = $_POST['usuario'];
	$pass = $_POST['contrasena'];

	//Guardar en sesion
	$_SESSION["currentUser"] = $user;
	$_SESSION["currentpass"] = $user;

	// Conectando, seleccionando la base de datos
	$enlace = mysql_connect('localhost', $user, $pass);
	if (!$enlace) {
    
	} else{
	
		echo "success ";

		//Cargar DB
		$lista_bd = mysql_list_dbs($enlace);

		while ($fila = mysql_fetch_object($lista_bd)) {
     		echo $fila->Database.' ';
		}
	}
	
?>