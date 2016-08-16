<?php 
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];
	
	$dbName =$_POST['DBrunning'];
	$query = "DROP DATABASE ".$dbName;

	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	if ($conn->query($query) === TRUE) {
	    echo "TRUE";
	} else {
	    echo $conn->error;
	}

	$conn->close();

?>