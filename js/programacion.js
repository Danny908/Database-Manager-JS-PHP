
$(document).ready(function(){

	$("#bdName").attr('disabled', true);
	$("#crearDB").attr('disabled', true);
	$(".eliminar").attr('disabled', true);
	$("#loadDB").attr('disabled', true);
	$("#sesionStar").removeAttr('disabled', true);

	//DBList
	var loadDBList = [];
	var listTables = [];

	//Iniciar Secion
	var user;
	var pass;
	var allCampos;
	$("#sesionStar").click(function(){

		user = $(".user").val();
		pass = $(".pass").val();


		if(user == "" || pass == ""){

			alert("Rellene los dos campos.");

		}else{

			$.ajax({
				type: "POST",
				url: "http://localhost/mygestordb/php/conectarDB.php",
				data: ({
					usuario: user,
					contrasena: pass

				}),
				dataType: "html",
				success: function(validar){

					var correcto = validar.split(" ");
					loadDBList = correcto;
					
					if(correcto[0] == "success"){

						var contador = 0;
						for(var llenarDB = 2; llenarDB <= correcto.length-2; llenarDB++){

							if(correcto[llenarDB] == 'mysql' || correcto[llenarDB] == 'phpmyadmin'){

								continue;
							}else{

								$("#loadDB").append("<option value="+correcto[llenarDB]+">"+correcto[llenarDB]+"</option>");

							}
							
							contador++;
						}

						//Habilitar campos
						$("#bdName").removeAttr('disabled');
						$("#bdName").css({
							"border": "1px solid #ffcccc",
							"background-color": "#ffffe6"
						});
						
						$("#crearDB").removeAttr('disabled');
						$("#crearDB").css({
							"background-color": "#ff4d4d",
							"border": "solid 1px black",
							"color": "white"
						});

						$(".eliminar").removeAttr('disabled');
						$(".eliminar").css({
							"background-color": "#ff4d4d",
							"border": "solid 1px black",
							"color": "white"
						});

						$("#loadDB").removeAttr('disabled');

						$(".user").attr('disabled', true);
						$(".user").css({
							"border": "1px solid #b3b3b3",
							"background-color": "#e6e6e6"
						});

						$(".pass").attr('disabled', true);
						$(".pass").css({
							"border": "1px solid #b3b3b3",
							"background-color": "#e6e6e6"
						});
						$("#sesionStar").attr('disabled', true);
						$("#sesionStar").css({
							"background-color": "#8c8c8c",
							"border": "solid 1px black",
							"color": "#cccccc"
						});


					} else{
						alert('Datos incorrectos,\nAcceso denegado.')
					}
				}

			});	

		}//CERRAR ELSE

	});//CERRAR INICIAR SECION BUTTON

	//Crear nueva BD
	var nombreDATABASE;
	$("#crearDB").click(function(){

		nombreDATABASE = $("#bdName").val();

		if(nombreDATABASE == ""){
		
					alert('Ingrese un nombre para la base de datos.');
		} else{

			$.ajax({
				type: "POST",
				url: "http://localhost/mygestordb/php/crearDB.php",
				data:({

					DBnombre: nombreDATABASE
				}),
				dataType: "html",
				success: function(crear){

					var crear_actualizar = crear.split(" ");

					if(crear_actualizar[0] == "success"){
						$("#loadDB").empty();

						var contador = 0;
						for(var llenarDB = 2; llenarDB <= crear_actualizar.length-2; llenarDB++){

							$("#loadDB").append("<option value="+crear_actualizar[llenarDB]+">"+crear_actualizar[llenarDB]+"</option>");
							contador++;
						}
					} else{

						alert('Error, caracter ingresado no valido o la base de datos ya existe.');
					}

				}

			});

		}

	});

	//CARGAR INTERFAZ TABLAS
	var BDselected;
	
	$("#loadDB").change(function(){

		$("#consultas").css({

					"display": "none",
				});

		BDselected = $("#loadDB").val();

		if(BDselected != "1"){

			$("#navegacion-menu").removeAttr('hidden');
			$("#load_interfaz").show();
			$("#currentBD").empty();
			$("#currentBD").show();
			$("#currentBD").append(BDselected);

			$("#listFiled").empty();

				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});

				
				$("#load_interfaz").load('navegacion/estructura.html', function(){
					
					$.ajax({
						type: "POST",
						url: "http://localhost/mygestordb/php/countTables.php",
						data:({

							insertIn: BDselected

						}),
						dataType: "html",
						success: function(noTables){

							listTables = noTables.split("\n");
							var numTable = listTables.length-1;

							for(var c = 0; c <= numTable; c++){

								$("#listFiled").append("<a href='#' class='listas' id='tablesLinks' value='"+listTables[c]+"'>"+listTables[c]+"</a><br>");
							}
							RefreshListener();
							if(numTable == 0){

								$("#noDB").show();

							}else{

								$("#noDB").hide();

							}

						}

					});

					//Contador de interfaz
					var a;
					var b;
					var colorFlag;
					var nombreTabla;
					$("#createTable").click(function(){

						nombreTabla = $("#tableName").val();
						var numCampos = $("#noCampos").val();
						

						//Validar el que el nombre de la tabla no sea nulo y el # de campos sea integer.
						if(nombreTabla == ""){

							$("#tableName").focus();
							alert('Por favor asigne un nombre a la tabla.');

						}else{
							if($.isNumeric(numCampos)){

								$("#tableStructure").hide();
								$("#tablas").removeAttr('hidden');
								$("#createNT").hide();

								colorFlag = 0;
								for(a = 1;a <= numCampos; a++){

									$("#tableData").append("<tr id='campoData"+a+"''><td><input id='nombreCampo' class='dataStyle'></input></td><td><select id='tipo' class='dataStyle'><option>Varchar</option><option>Int</option><option>Float</option><option>Double</option><option>Date</option></select></td><td><input id='longitud' class='dataStyle'></input></td><td><select id='nulo' class='dataStyle'><option>NOT NULL</option><option>NULL</option></select></td><td><input id='predeterminado' class='dataStyle'></input></td><td><select id='incrementable' class='dataStyle'><option></option><option>auto_increment</option></select></td><td><input id='llavepri' type='checkbox'></input></td></tr>");

									if(colorFlag == 0){
										colorFlag = 1;

										$("#campoData"+a).css({

											"background-color": "#ffffff"

										});
										
									} else if(colorFlag == 1){
										colorFlag = 0;


										$("#campoData"+a).css({

											"background-color": "#ffffb3",

										});

									}

									
									
								}
								

							} else{

								$("#noCampos").val('');
								$("#noCampos").focus();
								alert('Por favor ingrese un dato numerico.');
							}	
						}
						

					});

					$("#insertar").click(function(){
						//Segundo contador de interfaz
						var extraFile = parseInt($("#plusTData").val()) + a-1;

						for(b = a; b <= extraFile; b++){

							$("#tableData").append("<tr id='campoData"+b+"''><td><input id='nombreCampo' class='dataStyle'></input></td><td><select id='tipo' class='dataStyle'><option>Varchar</option><option>Int</option><option>Float</option><option>Double</option><option>Date</option></select></td><td><input id='longitud' class='dataStyle'></input></td><td><select id='nulo' class='dataStyle'><option>NOT NULL</option><option>NULL</option></select></td><td><input id='predeterminado' class='dataStyle'></input></td><td><select id='incrementable' class='dataStyle'><option></option><option>auto_increment</option></select></td><td><input id='llavepri' type='checkbox'></input></td></tr>");

								if(colorFlag == 0){
									colorFlag = 1;

									$("#campoData"+b).css({

										"background-color": "#ffffff"

									});
									
								} else if(colorFlag == 1){
									colorFlag = 0;


									$("#campoData"+b).css({

										"background-color": "#ffffb3",

									});

								}

						}

						a = b;


					});

					//crear nueva tabla
					var campoNombre = [];
					var tipoDato = [];
					var longitudDato = [];
					var nuloTF = [];
					var preterminadoDato = [];
					var autoIcrementable = [];
					var llavePrimaria = [];
					$("#finalizar").click(function(){
						
						//Recojer datos de la tabla.
						var pass1 = true;
						var pass2 = true;
						for(var f = 1; f <= a-1; f++){

							campoNombre[f] = $("#campoData"+f+" #nombreCampo").val();
							if(campoNombre[f] == ""){

								alert('Faltan datos en el formulario.');
								$("#campoData"+f+" #nombreCampo").focus();
								pass1 = false;
								break;

							}

							tipoDato[f] = $("#campoData"+f+" #tipo").val();
							longitudDato[f] = $("#campoData"+f+" #longitud").val();
							if(tipoDato[f] == "Varchar" && longitudDato[f] == ""){

								alert('Ingrese longitud a varchar.');
								$("#campoData"+f+" #longitud").focus();
								pass2 = false;
								break;

							}

							nuloTF[f] = $("#campoData"+f+" #nulo").val();
							preterminadoDato[f] = $("#campoData"+f+" #predeterminado").val();
							
							autoIcrementable[f] = $("#campoData"+f+" #incrementable").val();
							
							var pkT = 0;
							if($("#campoData"+f+" #llavepri").is(':checked') == true){

								pkT = 1;
								
								llavePrimaria[f] = campoNombre[f];
							}else{

								llavePrimaria[f] = "";
							}

						}

						if(pass1 == true && pass2 == true){

							$.ajax({

							type: 'POST',
							url: "http://localhost/mygestordb/php/createTables.php",
							data:({

								bd: BDselected,
								nameTable: nombreTabla,
								camName: campoNombre,
								typeData: tipoDato,
								longData: longitudDato,
								nulData : nuloTF,
								defaultData: preterminadoDato,
								autoIncrement: autoIcrementable,
								primaryKey: llavePrimaria,
								numReg: a

							}),
							dataType: 'html',
							success: function(insercion){

								var result = insercion;
								var LastQuery = result.split("|");
								$("#sqlQuery").empty();
								$("#sqlQuery").show();
								$("#sqlQuery").append(LastQuery[0]);
								$("#tableData").hide();
								$("#successTable").empty();
								$("#successTable").append(LastQuery[1]);
								$("#successTable").show();
								$("#finalizar").hide();
								$("#insertar").hide();
								$(".txt").hide();
								$("#plusTData").hide();
							}

						});

						$("#listFiled").empty();

						$.ajax({
						type: "POST",
						url: "http://localhost/mygestordb/php/countTables.php",
						data:({

							insertIn: BDselected

						}),
						dataType: "html",
						success: function(noTables){

							var listTables = noTables.split("\n");
							var numTable = listTables.length-1;

							for(var c = 0; c <= numTable; c++){

								$("#listFiled").append("<a href='#' class='listas' id='tablesLinks' value='"+listTables[c]+"'>"+listTables[c]+"</a><br>");
							}
							RefreshListener();
							if(numTable == 0){

								$("#noDB").show();

							}else{

								$("#noDB").hide();

							}

						}

					});


						}
						

					});	

				});

		} else{

			$("#listFiled").empty();
			$("#load_interfaz").hide();
			$("#currentBD").hide();
		}



	});

	//MANIPULAR MENU DE NAVEGACION
	$(".menu_tablas").click(function(){

		var opcion = $(this).val();

		//Actual BD {BDselected}

		switch(opcion){
			case 0:


				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});

				
				$.ajax({
					type: 'POST',
					url: "http://localhost/mygestordb/php/selectAll.php",
					data:({
						
						nombreDB: BDselected,
						nombreTB: nameTabla
					}),
					dataType: 'html',
					success:function(dataTable){

						var filaData = dataTable.split("|");
						console.log(dataTable);
						var contructor = 1;
						var medio;
						
						$("#load_interfaz").load('navegacion/examinar.html', function(){

							for(var a = 1; a <= filaData[0]; a++){

								$("#examinarData thead tr").append("<th>"+filaData[a]+"</th>");		
							}

								
							for(var a = parseInt(filaData[0]) + 1; a <= filaData.length-2; a++){

								console.log(a);	

								if(contructor == filaData[0]){
									

									medio +="<td>"+filaData[a]+"</td>";
									

									contructor = 0;
									$("#examinarData").append("<tr>"+medio+"</tr>");

									medio = null;

								}else{
									//console.log(a+' | '+contructor);	
									if(medio == null){
										medio ="<td>"+filaData[a]+"</td>";									
									}else{
										medio +="<td>"+filaData[a]+"</td>";									
									}
									
									
								}
								contructor++;
								

							}
							

						});
					},
				});
				

				$(this).css({
						
					"background-color": "#ff4d4d"
				});
				
				break;
			case 1:

				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});
				

				$(this).css({
						
					"background-color": "#ff4d4d"
				});
				
				$("#load_interfaz").load('navegacion/estructura.html', function(){
					
					//Contador de interfaz
					var a;
					var b;
					var colorFlag;
					var nombreTabla;
					$("#createTable").click(function(){

						nombreTabla = $("#tableName").val();
						var numCampos = $("#noCampos").val();

						//Validar el que el nombre de la tabla no sea nulo y el # de campos sea integer.
						if(nombreTabla == ""){

							$("#tableName").focus();
							alert('Por favor asigne un nombre a la tabla.');

						}else{
							if($.isNumeric(numCampos)){

								$("#tablas").removeAttr('hidden');
								$("#createNT").hide();

								colorFlag = 0;
								for(a = 1;a <= numCampos; a++){

									$("#tableData").append("<tr id='campoData"+a+"''><td><input id='nombreCampo' class='dataStyle'></input></td><td><select id='tipo' class='dataStyle'><option>Varchar</option><option>Int</option><option>Float</option><option>Double</option><option>Date</option></select></td><td><input id='longitud' class='dataStyle'></input></td><td><select id='nulo' class='dataStyle'><option>NOT NULL</option><option>NULL</option></select></td><td><input id='predeterminado' class='dataStyle'></input></td><td><select id='incrementable' class='dataStyle'><option></option><option>auto_increment</option></select></td><td><input id='llavepri' type='checkbox'></input></td></tr>");

									if(colorFlag == 0){
										colorFlag = 1;

										$("#campoData"+a).css({

											"background-color": "#ffffff"

										});
										
									} else if(colorFlag == 1){
										colorFlag = 0;


										$("#campoData"+a).css({

											"background-color": "#ffffb3",

										});

									}

									
									
								}
								

							} else{

								$("#noCampos").val('');
								$("#noCampos").focus();
								alert('Por favor ingrese un dato numerico.');
							}	
						}
						

					});
						
					$("#insertar").click(function(){
						//Segundo contador de interfaz
						var extraFile = parseInt($("#plusTData").val()) + a-1;

						for(b = a; b <= extraFile; b++){

							$("#tableData").append("<tr id='campoData"+b+"''><td><input id='nombreCampo' class='dataStyle'></input></td><td><select id='tipo' class='dataStyle'><option>Varchar</option><option>Int</option><option>Float</option><option>Double</option><option>Date</option></select></td><td><input id='longitud' class='dataStyle'></input></td><td><select id='nulo' class='dataStyle'><option>NOT NULL</option><option>NULL</option></select></td><td><input id='predeterminado' class='dataStyle'></input></td><td><select id='incrementable' class='dataStyle'><option></option><option>auto_increment</option></select></td><td><input id='llavepri' type='checkbox'></input></td></tr>");

								if(colorFlag == 0){
									colorFlag = 1;

									$("#campoData"+b).css({

										"background-color": "#ffffff"

									});
									
								} else if(colorFlag == 1){
									colorFlag = 0;


									$("#campoData"+b).css({

										"background-color": "#ffffb3",

									});

								}

						}

						a = b;


					});

					//crear nueva tabla
					var campoNombre = [];
					var tipoDato = [];
					var longitudDato = [];
					var nuloTF = [];
					var preterminadoDato = [];
					var autoIcrementable = [];
					var llavePrimaria = [];
					$("#finalizar").click(function(){
						
						//Recojer datos de la tabla.
						var pass1 = true;
						var pass2 = true;
						for(var f = 1; f <= a-1; f++){

							campoNombre[f] = $("#campoData"+f+" #nombreCampo").val();
							if(campoNombre[f] == ""){

								alert('Faltan datos en el formulario.');
								$("#campoData"+f+" #nombreCampo").focus();
								pass1 = false;
								break;

							}

							tipoDato[f] = $("#campoData"+f+" #tipo").val();
							longitudDato[f] = $("#campoData"+f+" #longitud").val();
							if(tipoDato[f] == "Varchar" && longitudDato[f] == ""){

								alert('Ingrese longitud a varchar.');
								$("#campoData"+f+" #longitud").focus();
								pass2 = false;
								break;

							}

							nuloTF[f] = $("#campoData"+f+" #nulo").val();
							preterminadoDato[f] = $("#campoData"+f+" #predeterminado").val();
							
							autoIcrementable[f] = $("#campoData"+f+" #incrementable").val();
							
							var pkT = 0;
							if($("#campoData"+f+" #llavepri").is(':checked') == true){

								pkT = 1;
								
								llavePrimaria[f] = campoNombre[f];
							}else{

								llavePrimaria[f] = "";
							}

						}

						if(pass1 == true && pass2 == true){

							$.ajax({

							type: 'POST',
							url: "http://localhost/mygestordb/php/createTables.php",
							data:({

								bd: BDselected,
								nameTable: nombreTabla,
								camName: campoNombre,
								typeData: tipoDato,
								longData: longitudDato,
								nulData : nuloTF,
								defaultData: preterminadoDato,
								autoIncrement: autoIcrementable,
								primaryKey: llavePrimaria,
								numReg: a

							}),
							dataType: 'html',
							success: function(insercion){
								var result = insercion;
								var LastQuery = result.split("|");
								$("#sqlQuery").empty();
								$("#sqlQuery").show();
								$("#sqlQuery").append(LastQuery[0]);
								$("#tableData").hide();
								$("#successTable").empty();
								$("#successTable").append(LastQuery[1]);
								$("#successTable").show();
								$("#finalizar").hide();
								$("#insertar").hide();
								$(".txt").hide();
								$("#plusTData").hide();

							}

						});

						$("#listFiled").empty();
						$.ajax({
						type: "POST",
						url: "http://localhost/mygestordb/php/countTables.php",
						data:({

							insertIn: BDselected

						}),
						dataType: "html",
						success: function(noTables){

							var listTables = noTables.split("\n");
							var numTable = listTables.length-1;

							for(var c = 0; c <= numTable; c++){

								$("#listFiled").append("<a href='#' class='listas' id='tablesLinks' value='"+listTables[c]+"'>"+listTables[c]+"</a><br>");
							}
							RefreshListener();
							if(numTable == 0){

								$("#noDB").show();

							}else{

								$("#noDB").hide();

							}

						}

					});

						}
						

					});	
				});
				break;
					
			case 2:
				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});
				
				$(this).css({
						
					"background-color": "#ff4d4d"
				});

				$("#load_interfaz").load('navegacion/sql.html', function(){

						
				});

				break;
			case 3:
				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});
				
				$(this).css({
						
					"background-color": "#ff4d4d"
				});

				$("#load_interfaz").load('navegacion/multi_select.html', function(){

					$("#bdt1").append("<option disabled selected value='0'></option>");
					$("#bdt2").append("<option disabled selected value='0'></option>");
					$("#bdt1").append("<option value='*'>*</option>");

					$("#whereDB1").append("<option value='0'></option>");
					$("#whereDB2").append("<option value='0'></option>");

					loadTables(BDselected,'bdt1');
					loadTables(BDselected,'bdt2');
					
					$("#bdt1").change(function(){
							
						if($("#bdt1").val() == '*'){

							$("#bdt2").empty();
							$("#whereDB1").empty();
							$("#whereDB2").empty();
							
						}else{

							$("#bdt2").empty();
							loadTables(BDselected,'bdt2');
						}
						if($("#bdt1").val() == '0'){
							$(".add").prop("disabled", true); 
						}else{

							$(".add").prop("disabled", false); 
							
							$("#whereDB1").append("<option value='0'></option>");
							$("#whereDB2").append("<option value='0'></option>");
							$("#whereDB1").empty();
							$("#bdcampo1").empty();
							$("#bdcampo2").empty();
							loadFields($("#bdt1").val(),'whereDB1');
							loadFields($("#bdt1").val(),'bdcampo1');
							loadFields($("#bdt2").val(),'whereDB2');
						}
							

					});

					$("#bdt2").change(function(){
							
						
						if($("#bdt2").val() == '0'){
							$(".add").prop("disabled", true); 
						}else{

							$(".add").prop("disabled", false); 
							
							$("#whereDB2").empty();
							$("#bdcampo2").empty();
							loadFields($("#bdt2").val(),'whereDB2');
							loadFields($("#bdt2").val(),'bdcampo2');
						}
							

					});
					var all;

					$(".add").on('click',function(){

						var tabla1 = $("#bdt1").val();
						var tabla2 = $("#bdt2").val();
						var campo1 = $("#bdcampo1").val();
						var campo2 = $("#bdcampo2").val();
						var where1 = $("#whereDB1").val();
						var where2 = $("#whereDB2").val();
						var numeroTablas= " ";
						var multiSelect;
						

						if(tabla1 == '*'){
							if(listTables.length == 0){

								multiSelect = "SELECT "+tabla1+" FROM "+ listTables[0];
								
							}else{
								for(var z = 0; z < listTables.length-1; z++){
									if(z == 0){
										numeroTablas+=listTables[z];	
									}else{
										numeroTablas+=","+listTables[z];	
									}
									
								}
								all = true;
								multiSelect = "SELECT "+tabla1+" FROM"+numeroTablas;
							}
							
						}else{
							all = false;
							multiSelect = "SELECT "+tabla1+"."+campo1+","+tabla2+"."+campo2+" FROM "+tabla1+","+tabla2;
						}

						if(where1 == null && where2 == "0" || where1 == null && where2 == null){

							

						}else{

							multiSelect += " WHERE "+tabla1+"."+where1+" = "+tabla2+"."+where2;
							
						}

						var toString = multiSelect.toString();
						allCampos = toString;
						console.log(toString);
						if(all == true){

							multiSelection(toString);
							getAllfields();
						}else if(all == false){
							
							multiSelection(toString);
							
							$("#tableEncabezados").empty();
							$("#tableStructure").show();
							
							$("#tableEncabezados").append("<th>"+campo1+"</th>");
							$("#tableEncabezados").append("<th>"+campo2+"</th>");
							

						}

						$(".vista").show();
						$("#vista").show();
						
						
					});
					
					$("#vista").on('click',function(){

						var nombreView = $(".vista").val();

						$.ajax({
							type: 'POST',
							url: "http://localhost/mygestordb/php/createView.php",
							data:({

								DBrunning:BDselected,
								nombreVista: nombreView,
								sistanxisView: allCampos



							}),
							dataType: "html",
							success: function(mesage){

								if(mesage == "TRUE"){

									alert('Vista creda correctamente');
									$("#loadDB").change();

								}else{

									alert(mesage);

								}
							
							}

						});

					});

						
						
				});
				break;
			case 4:
				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});
				
				$(this).css({
						
					"background-color": "#ff4d4d"
				});
				
				//Eliminar tablas
				if(confirm("ALERTA!!\nSeguro que desea eliminar la tabla "+nameTabla.toUpperCase()+"  y todo su contenido.")){
					console.log($("#currentBD").text());
					if(nameTabla == null){

						alert('Porfavor seleccione una tabla para continuar.')
					}else{

						$.ajax({

						type: 'POST',
						url: "http://localhost/mygestordb/php/deleteTB.php",
						data:({

							nombreDB: BDselected,
							tablaBorrar: nameTabla
						}),
						dataType: 'html',
						success: function(proces){

							if(proces == "TRUE"){

								alert("Tabla "+nameTabla.toUpperCase()+" borrada con exito");
								$("#loadDB").change();
							}
						}
						});

					}
					
				}
				break;
			case 5:

				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});
				
				$(this).css({
						
					"background-color": "#ff4d4d"
				});

				$("#load_interfaz").load('navegacion/new_users.html', function(){

						var nombre;
						var pass;
						var permisos;

						loadUsers();

						$(".usuario").on("click",function(){

						nombre = $(".userName").val();
						pass = $(".userPass").val();
						permisos = $("#permisos").val();

						$.ajax({

						type: 'POST',
						url: "http://localhost/mygestordb/php/createUser.php",
						data:({

							userName: nombre,
							userPass: pass,
							userPermission: permisos
						}),
						dataType: 'html',
						success: function(registro){

							alert(registro);
							loadUsers();
						
						}

						});
						});

				});

				break;
			case 6:

				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});
				
				$(this).css({
						
					"background-color": "#ff4d4d"
				});

				$("#load_interfaz").load('navegacion/trigger.html', function(){

						for(var i = 0; i < listTables.length-1; i++){

							$(".loaded_tables").append("<option value="+listTables[i]+">"+listTables[i]+"</option>");
						}

						$(".trigger").on('click',function(){

							//alert($(".triggerTime").val());
							$.ajax({
								type: 'POST',
								url: 'http://localhost/mygestordb/php/createTrigger.php',
								data:({

									DBrunning: 	BDselected,
									triName: 	$(".triggerName").val(),
									triTime: 	$(".triggerTime").val(),
									triAction: 	$(".triggerAction").val(),
									triTable: 	$(".loaded_tables").val(),
									triQuery: 	$("#query").val()

								}),
								dataType: 'html',
								success:function(final){

									alert(final);
								}

							});
						});

				});
				break;
			case 7:
				$(".menu_tablas").css({

					"background-color": "#4d79ff"
				});
				
				$(this).css({
						
					"background-color": "#ff4d4d"
				});

				$("#load_interfaz").load('navegacion/procedure.html', function(){

						
						$(".procedure").on('click',function(){

							//alert($(".triggerTime").val());
							$.ajax({
								type: 'POST',
								url: 'http://localhost/mygestordb/php/createProcedure.php',
								data:({

									DBrunning: 	BDselected,
									proName: 	$(".procedureName").val(),
									proParam: 	$(".procedureParams").val(),
									proQuery: 	$("#queryProc").val()

								}),
								dataType: 'html',
								success:function(final){

									alert(final);
								}

							});
						});

				});
				break;

		}

	});
	
	//Borrar bases de datos
	$(".eliminar").click(function(){

		BDselected = $("#loadDB").val();

		if(BDselected != "1"){


			//Eliminar BD
			if(confirm("ALERTA!!\nSeguro que desea eliminar esta Base de datos y todo su contenido.")){

				$.ajax({

					type: 'POST',
					url: "http://localhost/mygestordb/php/deleteDB.php",
					data:({

						DBrunning:BDselected

					}),
					dataType: "html",
					success: function(mesage){

						if(mesage == "TRUE"){

							alert('Base de datos '+BDselected+' borrada con exito');
							acutualizar_lista();

						}else{

							alert(mesage);

						}
					
					}

				});

			}

		} else{

			alert('Seleccione una base de datos para completar la accion.');
			
		}

	});


	function acutualizar_lista(){

		$("#loadDB").empty();

		$.ajax({
				type: "POST",
				url: "http://localhost/mygestordb/php/conectarDB.php",
				data: ({
					usuario: user,
					contrasena: pass

				}),
				dataType: "html",
				success: function(validar){

					var correcto = validar.split(" ");
					
					if(correcto[0] == "success"){

						var contador = 0;
						for(var llenarDB = 2; llenarDB <= correcto.length-2; llenarDB++){

							if(correcto[llenarDB] == 'mysql' || correcto[llenarDB] == 'phpmyadmin'){

								continue;
							}else{

								$("#loadDB").append("<option value="+correcto[llenarDB]+">"+correcto[llenarDB]+"</option>");

							}
							
							contador++;
						}

						//Habilitar campos
						$("#bdName").removeAttr('disabled');
						$("#bdName").css({
							"border": "1px solid #ffcccc",
							"background-color": "#ffffe6"
						});
						
						$("#crearDB").removeAttr('disabled');
						$("#crearDB").css({
							"background-color": "#ff4d4d",
							"border": "solid 1px black",
							"color": "white"
						});

						$(".eliminar").removeAttr('disabled');
						$(".eliminar").css({
							"background-color": "#ff4d4d",
							"border": "solid 1px black",
							"color": "white"
						});

						$("#loadDB").removeAttr('disabled');

						$(".user").attr('disabled', true);
						$(".user").css({
							"border": "1px solid #b3b3b3",
							"background-color": "#e6e6e6"
						});

						$(".pass").attr('disabled', true);
						$(".pass").css({
							"border": "1px solid #b3b3b3",
							"background-color": "#e6e6e6"
						});
						$("#sesionStar").attr('disabled', true);
						$("#sesionStar").css({
							"background-color": "#8c8c8c",
							"border": "solid 1px black",
							"color": "#cccccc"
						});


					} else{
						alert('Datos incorrectos,\nAcceso denegado.')
					}
				}

			});	

	}

	//Actualizar listener
	var nameTabla;
	function RefreshListener(){
		

		$("#listFiled .listas").off();

		//Cargar estructura de tabla
		$("#listFiled .listas").on("click", function(){

				$("#consultas").css({

					"display": "inline-block",
				});
				
				$("#consultas").show(1000);
				nameTabla = $(this).text();
				$("#currentBD").empty();
				$("#currentBD").append(BDselected+' > '+nameTabla);
				$(".dataTables").empty();
				showStructure(nameTabla);
		});	
	}

	function showStructure(tabla){

		$.ajax({
			type: 'POST',
			url: "http://localhost/mygestordb/php/tableEstruc.php",
			data:({

				nombreDB: BDselected,
				nombreTB: tabla

			}),
			dataType: 'html',
			success: function(squelet){

				var filas = squelet.split(' ');
				$("#tableStructure").show();
				
				var structureSintaxis='';
				var first = "<tr class='dataTables'>";
				var end = "</tr>";
				var finalsintaxis;
				var saltador = 0;

				for(var a = 0; a <= filas.length; a++){
						
					
							structureSintaxis += "<td id='data'>"+filas[a]+"</td>";

							if(saltador == 5){
								
								saltador = -1;
								finalsintaxis += first+structureSintaxis+end+"\n";
								structureSintaxis = '';

							}
							
							saltador++;

				}

				$("#tableStructure").append(finalsintaxis);
				//console.log(finalsintaxis);

			}


		});
	}

	function loadUsers(){

		$("table #listUsers").empty();
		$.ajax({
			type: "POST",
			url: "http://localhost/mygestordb/php/loadUSers.php",
			data:({

			}),
			dataType: "html",
			success: function(noUsers){

				console.log(noUsers);

				var listUsers = noUsers.split("|");
				var numUser = listUsers.length-1;

				var inicio = "<tr id='dataTables'>";
				var fin = "</tr>";
				var contenido;
				var flag = 0;

				for(var c = 0; c < numUser; c++){

					//console.log(listUsers[c]);
					flag++;
					contenido += "<td id='data'>"+listUsers[c]+"</td>";
					if(flag == 3){

						$("table #listUsers").append(inicio+contenido+fin);
						flag = 0;
						contenido = "";
					}
				}

			}

		});
	}

	function loadTables(dataBase, selectt){

		$.ajax({
			type: "POST",
			url: "http://localhost/mygestordb/php/countTables.php",
			data:({

				insertIn: dataBase

			}),
			dataType: "html",
			success: function(noTables){

				var listTables = noTables.split("\n");
				var numTable = listTables.length-1;

				for(var c = 0; c < numTable; c++){

					$("#"+selectt).append("<option value="+listTables[c]+">"+listTables[c]+"</option>");
				}
			}

		});

	}

	function loadFields(table, selection){

		$.ajax({
			type: "POST",
			url: "http://localhost/mygestordb/php/tableFields.php",
			data:({

				nombreDB: BDselected,
				nombreTB: table

			}),
			dataType: "html",
			success: function(noFields){

				var divideFields = noFields.split("|");
				for(var x = 0; x < divideFields.length-1; x++){

					$("#"+selection).append("<option value="+divideFields[x]+">"+divideFields[x]+"</option>");
				}
			}

		});

	}

	function multiSelection(query){

		$.ajax({
			type: "POST",
			url: "http://localhost/mygestordb/php/RunMultiSelect.php",
			data:({

				Sinstaxis: query,
				DB: BDselected

			}),
			dataType: "html",
			success: function(result){

				var Ndatos = result.split("|");

				console.log(result);

				$("#dataSelect").empty();
				for( var f = 0; f < Ndatos.length-1; f++){

					$("#dataSelect").append("<td id='data'>"+Ndatos[f]+"</td>");
				}
				
			}

		});

	}

	function getAllfields(){
		$("#tableEncabezados").empty();
		$.ajax({
			type: "POST",
			url: "http://localhost/mygestordb/php/allFields.php",
			data:({

				nombreDB: BDselected,

			}),
			dataType: "html",
			success: function(allFields){

				console.log(allFields);
				var Ncampos = allFields.split("|");
				
				$("#tableStructure").show();

				for( var f = 0; f < Ncampos.length-1; f++){

					$("#tableEncabezados").append("<th>"+Ncampos[f]+"</th>");
				}

			}

		});

	}

	
});
