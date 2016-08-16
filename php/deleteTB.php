<?php 
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];
	
	$DB = $_POST['nombreDB'];
	$dbTable =$_POST['tablaBorrar'];
	$query = "DROP TABLE ".$dbTable;

	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $DB);
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