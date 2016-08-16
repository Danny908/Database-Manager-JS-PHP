<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$nombreBD = $_POST['DBrunning'];

	$nombrePro = $_POST['proName'];
	$paramPro = $_POST['proParam'];
	$queryPro = $_POST['proQuery'];
	$finaTrigger;
	
	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $nombreBD);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$finaTrigger = "CREATE PROCEDURE ".$nombrePro." (".$paramPro.")\n"."BEGIN\n".$queryPro.";\nEND;";

	//echo $finaTrigger;

	if ($conn->query($finaTrigger) === TRUE) {
	    echo "Procedure created successfully";
	} else {
	    echo "Error creating Procedure:\n" . $conn->error;
	}

	$conn->close();

?>