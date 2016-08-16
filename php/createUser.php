<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$nombreUser = $_POST["userName"];
	$passUser = $_POST["userPass"];
	$permisosUser = $_POST["userPermission"];

	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, "mysql");
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	// sql to create table
	//$sql = "DROP USER $nombreUser@localhost";
	$sql1  = "CREATE USER '$nombreUser'@'localhost' IDENTIFIED BY '$passUser'\n";
	$sql2 = "GRANT $permisosUser ON * . * TO '$nombreUser'@'localhost' ";
	$sql3 = "FLUSH PRIVILEGES";
	
	//echo $sql2;
	
		if($conn->query($sql3) === TRUE){
			if($conn->query($sql1) === TRUE){
				if($conn->query($sql2) === TRUE){

					echo "Successfully";
				} else{

					echo "Error creating user: " . $conn->error;	
				}
				
			} else{
				echo "Error creating user: " . $conn->error;	
			}
		} else{
			echo "Error creating user: " . $conn->error;
		}
	

	$conn->close();

?>