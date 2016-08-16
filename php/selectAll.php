<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$DB = $_POST['nombreDB'];
	$TB = $_POST['nombreTB'];

	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $DB);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$query = "SELECT * FROM $TB";

	$ex=mysqli_query($conn ,$query);
	$rowNum = mysqli_num_fields($ex);
	echo $rowNum.'|';

	while ($property = mysqli_fetch_field($ex)) {
    echo $property->name.'|';
	}
	echo "\n";

	$rowNum = mysqli_num_fields($ex)-1;
	$saltador = 0;
    while ($row = mysqli_fetch_array($ex)) {
		
		for($a = 0; $a <= $rowNum; $a++ ){
			if($saltador == $rowNum){

				$saltador = -1;
				echo "$row[$a]|\n";

			}else{
				echo "$row[$a]|";	
			}
			$saltador++;
		}
		

    }


	

	$conn->close();


?>
