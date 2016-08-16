<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$nombreBD = $_POST['DBrunning'];
	$viewName = $_POST['nombreVista'];
	$viewSintax = $_POST['sistanxisView'];
	
	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $nombreBD);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	// sql to create view
	$view = "CREATE VIEW view_".$viewName." AS ".$viewSintax;
	
	if ($conn->query($view) === TRUE) {
	    echo "successfully";
	} else {
	    echo "fail " . $conn->error;
	}

	$conn->close();

?>