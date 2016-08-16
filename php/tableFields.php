<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$DB = $_POST['nombreDB'];
	$TB = $_POST['nombreTB'];

	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, "information_schema");
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	
	$query = "SELECT column_name FROM columns WHERE table_name = "."'".$TB."'"." AND table_schema = "."'".$DB."'"."";

	$ex=mysqli_query($conn ,$query);
	while ($row = mysqli_fetch_array($ex)) {
			
			echo $row[0].'|';	
			
		}
		

	$conn->close();


?>
