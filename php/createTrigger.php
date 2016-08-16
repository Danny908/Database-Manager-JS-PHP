<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$nombreBD = $_POST['DBrunning'];

	$nombreTri = $_POST['triName'];
	$timeTri = $_POST['triTime'];
	$actionTri =  $_POST['triAction'];
	$tableTri = $_POST['triTable'];
	$queryTri = $_POST['triQuery'];
	$finaTrigger;
	
	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $nombreBD);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$finaTrigger = "CREATE TRIGGER ".$nombreTri."\n".$timeTri." ".$actionTri." ON ".$tableTri."\nFOR EACH ROW\nBEGIN\n".$queryTri."\nEND;";

	//echo $finaTrigger;

	if ($conn->query($finaTrigger) === TRUE) {
	    echo "Trigger created successfully";
	} else {
	    echo "Error creating Trigger:\n" . $conn->error;
	}

	$conn->close();

?>