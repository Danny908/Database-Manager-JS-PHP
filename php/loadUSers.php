<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, "mysql");
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$query = "SELECT host, user, password FROM mysql.user;";

	$ex=mysqli_query($conn,$query);
	
	
	while ($row = mysqli_fetch_array($ex)) {
			
			echo $row[0].'|'.$row[1].'|'.$row[2]."|";	
			
		}
		
	$conn->close();
?>
