<?php
	@session_start();

	$username = $_SESSION["currentUser"];
	$password = $_SESSION["currentpass"];

	$nombreBD = $_POST['bd'];
	$nombreTabla = $_POST['nameTable'];
	$campoNombre =  $_POST['camName'];
	$tipoDato = $_POST['typeData'];
	$longitudDato = $_POST['longData'];
	$nuloDato = $_POST['nulData'];
	$datoDefault = $_POST['defaultData'];
	$autoIncrementable = $_POST['autoIncrement'];
	$llavePrimaria = $_POST['primaryKey'];
	$noRegistros = $_POST['numReg']-1;


	// Conectando, seleccionando la base de datos
	$conn = new mysqli('localhost', $username, $password, $nombreBD);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	// sql to create table
	$sql = "CREATE TABLE IF NOT EXISTS ".$nombreTabla."(";
	$sqlEnd = ");";
	$pk = "PRIMARY KEY(";
	$pkEnd = ")";
	$finalQuery;
	$subletter;

	//Estructura de para crear tabla.
	$structure;
	$structure2;
	$sipk = 0;
	for($a = 1; $a <= $noRegistros; $a++){

		if($tipoDato[$a] == "Int" && $longitudDato[$a] != ""){

			$structure = $structure."$campoNombre[$a] "."$tipoDato[$a]($longitudDato[$a]) "."$nuloDato[$a] "."$autoIncrementable[$a]";	
		}else if($tipoDato[$a] == "Varchar" && $longitudDato[$a] != ""){

			$structure = $structure."$campoNombre[$a] "."$tipoDato[$a]($longitudDato[$a]) "."$nuloDato[$a] "."$autoIncrementable[$a]";	

		}else{

			$structure = $structure."$campoNombre[$a] "."$tipoDato[$a] "."$nuloDato[$a] "."$autoIncrementable[$a]";
		}
		
		if($datoDefault[$a] == ""){

			$structure = $structure.",\n";			

		}else{

			$structure = $structure." DEFAULT  '$datoDefault[$a]',\n";
		}

		
		if($llavePrimaria[$a] != ""){
			$sipk = 1;
			$structure2 =$structure2." `$llavePrimaria[$a]`,";
		}

	}
	if($sipk == 1){

			$finalQuery = "$sql\n"."$structure\n"."$pk\n".$structure2."$pkEnd\n".$sqlEnd;
			$subletter = -5;

		} else{
			$finalQuery = "$sql\n"."$structure\n"."$structure2\n".$sqlEnd;
			$subletter = -6;
		}

		
		$finalQuery2 = substr($finalQuery, 0, $subletter);

		if($subletter == -6){

			
			$finalQuery2 = $finalQuery2."$sqlEnd";
		}else{

			$finalQuery2 = $finalQuery2."$pkEnd\n".$sqlEnd;
			
		}

		

	if ($conn->query($finalQuery2) === TRUE) {
	    echo "$finalQuery2"."|Table created successfully";
	} else {
	    echo "$finalQuery2"."|Error creating table: " . $conn->error;
	}

	$conn->close();

?>