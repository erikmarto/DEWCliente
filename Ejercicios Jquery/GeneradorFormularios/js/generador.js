$(function () {

	// Menu
	$("nav").mouseover(function () {
		let prevcolor = $(this).css("color");
		if (prevcolor != "rgb(35, 140, 215)") {
			$(this).css("color", "rgb(35, 140, 215)");
			$(this).mouseout(function () {
				$(this).css("color", "rgb(0,0,0");
			});
		}
	});

	// Añadir boton
	$("#addmenubutton").click(function () {
		let item = $("#addMenu");
		let menubutton = this;
		mostrarMenu(item, menubutton);
		resetFieldStyle();
	});

	// Propiedades del Archivo
	$("#fieldpropbutton").click(function () {
		let item = $("#menuProp");
		let menubutton = this;
		mostrarMenu(item, menubutton);
	});

	// Propiedades de la Seccion
	$("#formpropbutton").click(function () {
		let item = $("#formProp");
		let menubutton = this;
		mostrarMenu(item, menubutton);
		resetFieldStyle();
	});

	// Mostrar Menu 
	function mostrarMenu(item, menubutton) {
		$(".navption").css("borderColor", "#0d6586");
		$(".navption").css("color", "rgb(0,0,0)");
		$("#addMenu").hide();
		$("#menuProp").hide();
		$("#formProp").hide();
		$(item).show();
		$(menubutton).css("borderColor", "#238CD7");
		$(menubutton).css("color", "rgb(35, 140, 215)");
		$(menubutton).mouseout(function () {
			$(this).css("color", "rgb(35, 140, 215)");
		});
	}

	/* Añadir campos al formulario */
	let fields = 0;
	let textfields = 0;
	let numberfields = 0;
	let parafields = 0;
	let checkboxfields = 0;
	let checkinputs = 0;
	let multiplefields = 0;
	let radioinputs = 0;
	let selectfields = 0;
	let selectoptions = 0;
	let namefields = 0;
	let datefields = 0;
	let timefields = 0;
	let telfields = 0;
	let addressfields = 0;
	let webfields = 0;
	let pricefields = 0;
	let mailfields = 0;
	let breakfields = 0;
	let filefields = 0;

	// Texto
	$("#textfield").click(function () {
		let item = $("#textfieldbox");
		$("#textfieldbox").attr("fieldtype", "text");
		textfields++;
		let cantidad = textfields;
		insertField(item, cantidad);

	});

	// Numero
	$("#numberfield").click(function () {
		let item = $("#numberfieldbox");
		$("#numberfieldbox").attr("fieldtype", "number");
		numberfields++;
		let cantidad = numberfields;
		insertField(item, cantidad);
	});

	// Parrafo
	$("#parafield").click(function () {
		let item = $("#parafieldbox");
		$("#parafieldbox").attr("fieldtype", "para");
		parafields++;
		let cantidad = parafields;
		insertField(item, cantidad);
	});

	// Checkbox
	$("#checkboxfield").click(function () {
		let item = $("#checkfieldbox");
		$("#checkfieldbox").attr("fieldtype", "check");
		checkboxfields++;
		checkinputs = checkinputs + 3;
		let cantidad = checkboxfields;
		insertField(item, cantidad);
	});

	// Radio
	$("#multiplefield").click(function () {
		let item = $("#multiplefieldbox");
		$("#multiplefieldbox").attr("fieldtype", "multiple");
		multiplefields++;
		radioinputs = radioinputs + 3;
		let cantidad = multiplefields;
		insertField(item, cantidad);
	});

	// Desplegable
	$("#selectfield").click(function () {
		let item = $("#selectfieldbox");
		$("#selectfieldbox").attr("fieldtype", "select");
		selectfields++;
		selectoptions = selectoptions + 3;
		let cantidad = selectfields;
		insertField(item, cantidad);
	});

	// Nombre
	$("#namefield").click(function () {
		let item = $("#namefieldbox");
		$("#namefieldbox").attr("fieldtype", "name");
		namefields++;
		let cantidad = namefields;
		insertField(item, cantidad);
	});

	// Fecha
	$("#datefield").click(function () {
		let item = $("#datefieldbox");
		datefields++;
		let cantidad = datefields;
		insertField(item, cantidad);
	});

	// Hora
	$("#timefield").click(function () {
		let item = $("#timefieldbox");
		timefields++;
		let cantidad = timefields;
		insertField(item, cantidad);
	});

	// Teléfono
	$("#telfield").click(function () {
		let item = $("#telfieldbox");
		telfields++;
		let cantidad = telfields;
		insertField(item, cantidad);
	});

	// Dirección
	$("#addressfield").click(function () {
		let item = $("#addressfieldbox");
		addressfields++;
		let cantidad = addressfields;
		insertField(item, cantidad);
	});

	// Web
	$("#webfield").click(function () {
		let item = $("#webfieldbox");
		webfields++;
		let cantidad = webfields;
		insertField(item, cantidad);
	});

	// Precio
	$("#pricefield").click(function () {
		let item = $("#pricefieldbox");
		pricefields++;
		let cantidad = pricefields;
		insertField(item, cantidad);
	});

	// E-mail
	$("#mailfield").click(function () {
		let item = $("#mailfieldbox");
		mailfields++;
		let cantidad = mailfields;
		insertField(item, cantidad);
	});

	// Espacio
	$("#breakfield").click(function () {
		let item = $("#breakfieldbox");
		breakfields++;
		let cantidad = breakfields;
		insertField(item, cantidad);

	});

	// Archivo
	$("#filefield").click(function () {
		let item = $("#filefieldbox");
		filefields++;
		let cantidad = filefields;
		insertField(item, cantidad);
	});


	/* Insertar. Clonamos el item y le cambiamos su id */
	function insertField(item, cantidad) {
		fields++;
		let copia = $(item).clone();
		let itemID = $(item).attr("id");
		$(copia).attr("id", itemID + cantidad);
		let labelID = $(copia).find(".fieldLabel").attr("id");
		$(copia).find(".fieldLabel").attr("id", labelID + cantidad);
		$(copia).attr("selected", false);
		$(copia).hide();
		$(copia).appendTo($("#form"));
		$(copia).mouseover(fieldHover);
		let animando = false;
		if (!animando) {
			animando = true;
			$(copia).fadeIn(function () {
				animando = false;
			});
		}
		//en caso de ser checkbox editamos los name e ids de sus inputs
		if (itemID == "checkfieldbox") {
			$(copia).find("#checkboxinput").attr("name", "checkboxinput" + (checkinputs - 2));
			$(copia).find("#checkboxinput").attr("id", "checkboxinput" + (checkinputs - 2));
			$(copia).find("#checkboxinput2").attr("name", "checkboxinput" + (checkinputs - 1));
			$(copia).find("#checkboxinput2").attr("id", "checkboxinput" + (checkinputs - 1));
			$(copia).find("#checkboxinput3").attr("name", "checkboxinput" + checkinputs);
			$(copia).find("#checkboxinput3").attr("id", "checkboxinput" + checkinputs);
		}
		//en caso de ser radiobuttons
		if (itemID == "multiplefieldbox") {
			$(copia).find("#radioinput").attr("name", "Option" + cantidad);
			$(copia).find("#radioinput").attr("id", "radioinput" + (radioinputs - 2));
			$(copia).find("#radioinput2").attr("name", "Option" + cantidad);
			$(copia).find("#radioinput2").attr("id", "radioinput" + (radioinputs - 1));
			$(copia).find("#radioinput3").attr("name", "Option" + cantidad);
			$(copia).find("#radioinput3").attr("id", "radioinput" + radioinputs);
		}
		//select
		if (itemID == "selectfieldbox") {
			$(copia).find("#selectoption").attr("id", "selectoption" + (selectoptions - 2));
			$(copia).find("#selectoption2").attr("id", "selectoption" + (selectoptions - 1));
			$(copia).find("#selectoption3").attr("id", "selectoption" + selectoptions);
		}
		$(copia).click(function () {
			editField(copia);
		});
	}
	$(".fieldbox").mouseover(fieldHover);

	// Reseteo de estilos del form
	function resetFieldStyle() {
		$(".fieldBox").css("backgroundColor", "#fff");
		$(".fieldBox").css("borderColor", "#fff");
		$(".fieldBox").attr("selected", false);
		$(".fieldBox").find(".removeButton").hide();
	}

	// Cambia estilos con el hover 
	function fieldHover() {

		$(this).css("borderColor", "rgb(35, 140, 215)");
		$(this).css("borderStyle", "dotted");

		$(this).mouseout(function () {
			if (!($(this).attr("selected"))) {
				$(this).css("borderColor", "#fff");
				$(this).css("backgroundColor", "#fff");
				$(this).find(".duplicateButton").hide();
				$(this).find(".removeButton").hide();
			}
		});
	}

	// Guardar
	$("#savebutton").click(function () {
		let resultado = $("#formBox").clone();
		let copiaID = $(resultado).attr("id");
		$(resultado).attr("id", "c" + copiaID);
		$(resultado).find("#savebutton").remove();
		$("#codeBox").text(resultado.html());
		$("#outcode").show();
	});

	// Limpia al hacer Click
	$("input").click(function () {
		inputdefault = $(this).val();
		$(this).val("");
	});
	$("textarea").click(function () {
		$(this).val("");
	});

	/* Edición de campos */
	function editField(item) {

		//Selección del item	
		$(".fieldBox").css("backgroundColor", "#fff");
		$(".fieldBox").css("borderColor", "#fff");
		$(".fieldBox").attr("selected", false);
		$(".fieldBox").find(".duplicateButton").hide();
		$(".fieldBox").find(".removeButton").hide();
		$(item).css("backgroundColor", "#E5F9FC");
		$(item).css("borderColor", "rgb(35, 140, 215)");
		$(item).attr("selected", true);

		//Borrar item
		$(item).find(".removeButton").click(function () {
			$(item).fadeOut();
			mostrarMenu(mebox, menubtn);

		});
		$(item).find(".removeButton").show();


		$(item).mouseout(function () {
			$(item).css("backgroundColor", "#E5F9FC");
			$(item).css("borderColor", "rgb(35, 140, 215)");
		});

		//Mostrar propiedades
		let mebox = $("#menuProp");
		let menubtn = $("#fieldpropbutton");
		mostrarMenu(mebox, menubtn);
		$("#errormenupropbox").hide();

		//edit label
		$("#editLabelbox").show();
		let prevValor = $(item).find(":first").html();
		$("#editlabelinput").val(prevValor);
		$("#editlabelinput").change(function () {
			let valor = $("#editlabelinput").val();
			if ($(item).attr("selected")) {
				$(item).find(":first").html(valor);
			}
		});

		//edit size para campos de tipo paragraph, number y text
		if ($(item).attr("fieldtype") == "text" || $(item).attr("fieldtype") == "number" || $(item).attr("fieldtype") == "para") {
			$("#editSizebox").show();
			$("#editSizebox").click(function () {
				if ($(item).attr("selected")) {
					switch ($("#fieldsizeinput").val()) {
						case "Small":
							if ($(item).attr("fieldtype") == "para") {
								$(item).find("textarea").css("height", "50px");
								break;
							} else {
								$(item).find("input").css("width", "100px");
								break;
							}
						case "Medium":
							if ($(item).attr("fieldtype") == "para") {
								$(item).find("textarea").css("height", "100px");
								break;
							} else {
								$(item).find("input").css("width", "198px");
								break;
							}
						case "Large":
							if ($(item).attr("fieldtype") == "para") {
								$(item).find("textarea").css("height", "200px");
								break;
							} else {
								$(item).find("input").css("width", "400px");
								break;
							}
					}
				}
			});
		} else {
			$("#editSizebox").hide();

		}
	}

	let inputdefault = "";

	/* Form name */
	$("#formname").change(function () {
		let formname = $("#formname").val();
		if (formname != "") {
			$("#form").attr("name", formname);
		} else {
			$("#formname").val(inputdefault);
		}

	});
});

