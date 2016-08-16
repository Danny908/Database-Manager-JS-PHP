<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$DB = $_POST['nombreDB'];
	$TABLE = $_POST['nombreTB'];

	$Allstructure = array();

	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $DB);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	/* crear una sentencia preparada */
if ($stmt = mysqli_prepare($conn, "DESCRIBE $TABLE")) {

    
    /* ejecutar la consulta */
    mysqli_stmt_execute($stmt);

    /* ligar variables de resultado */
   
    mysqli_stmt_bind_result($stmt, $field, $type, $null, $key, $default, $extra);


    /* obtener valor */
    $flag = 0;
    while(mysqli_stmt_fetch($stmt)){

    	printf("%s %s %s %s %s %s \n",$field, $type, $null, $key, $default, $extra);
    	
    }


    /* cerrar sentencia */
    mysqli_stmt_close($stmt);
}

	

	$conn->close();

?>
