<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$QUERY = $_POST['Sinstaxis'];
	$DB = $_POST['DB'];
	$StingQuery = strval($QUERY);
	
	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $DB);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	
	//echo $StingQuery;

	$post = array();
	$ex=mysqli_query($conn ,$StingQuery);
	while ($row = mysqli_fetch_row($ex)) {
			
			 $post[] = $row;
		}

		foreach ($post as $row) 
        { 
            foreach ($row as $element)
            {
                echo $element.'|';
            }
        }

	$conn->close();


?>
