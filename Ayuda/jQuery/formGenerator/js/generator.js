$(function(){

/* menu Hover function */
$("nav").mouseover(function(){
	
	var prevcolor = $(this).css("color");
	if (prevcolor != "rgb(35, 140, 215)"){
		$(this).css("color", "rgb(35, 140, 215)");
		$(this).mouseout (function(){
			$(this).css("color", "rgb(0,0,0");
		});
	}
});

//addmenu button
$("#addmenubutton").click(function(){
	var item = $("#addMenu");
	var menubutton = this;
	mostrarMenu(item, menubutton);
	resetFieldStyle();
});

//field prop button 
$("#fieldpropbutton").click(function(){
	var item = $("#menuProp");
	var menubutton = this;
	mostrarMenu(item, menubutton);
});

//form prop button
$("#formpropbutton").click(function(){
	var item = $("#formProp");
	var menubutton = this;
	mostrarMenu(item, menubutton);
	resetFieldStyle();
});

//function mostrar menu. 
function mostrarMenu(item, menubutton){
	$(".navption").css("borderColor", "#0d6586");
	$(".navption").css("color", "rgb(0,0,0)");
	$("#addMenu").hide();
	$("#menuProp").hide();
	$("#formProp").hide();
	$(item).show();
	$(menubutton).css("borderColor", "#238CD7");
	$(menubutton).css("color", "rgb(35, 140, 215)");
	$(menubutton).mouseout(function(){
		$(this).css("color", "rgb(35, 140, 215)");
	});
}

/* 
		 ------------------------------------------------------------
		 
						Añadir campos al formulario
		 
		 ------------------------------------------------------------
 */
 var fields = 0;
 var textfields = 0;
 var numberfields = 0;
 var parafields = 0;
 var checkboxfields = 0;
 var checkinputs = 0;
 var multiplefields = 0;
 var radioinputs = 0;
 var selectfields = 0;
 var selectoptions = 0;
 var namefields = 0;
 var datefields = 0;
 var timefields = 0;
 var telfields = 0;
 var addressfields = 0;
 var webfields = 0;
 var pricefields = 0;
 var mailfields = 0;
 var breakfields = 0;
 var filefields = 0;
 
 // Text listener
  $("#textfield").click(function(){
	 var item = $("#textfieldbox");
	 $("#textfieldbox").attr("fieldtype", "text");
	 textfields++; 
	 var cantidad = textfields;
	 insertField(item, cantidad);
	 
 });
  
  // Number listener
  $("#numberfield").click(function(){
	 var item = $("#numberfieldbox");
	 $("#numberfieldbox").attr("fieldtype", "number");
	 numberfields ++;
	 var cantidad = numberfields; 
	 insertField(item, cantidad);
  });
 
 // Paragraph listener
 $("#parafield").click(function(){
	 var item = $("#parafieldbox");
	 $("#parafieldbox").attr("fieldtype", "para");
	 parafields++;
	 var cantidad = parafields;
	 insertField(item, cantidad);
  });
  
  //Checkbox listener
   $("#checkboxfield").click(function(){
	 var item = $("#checkfieldbox");
	 $("#checkfieldbox").attr("fieldtype", "check");
	 checkboxfields++;
	 checkinputs=checkinputs+3;
	 var cantidad = checkboxfields;
	 insertField(item, cantidad);
  });
  
  //Radio listener
   $("#multiplefield").click(function(){
	 var item = $("#multiplefieldbox");
	 $("#multiplefieldbox").attr("fieldtype", "multiple");
	 multiplefields++;
	 radioinputs = radioinputs+3;
	 var cantidad = multiplefields;
	 insertField(item, cantidad);
  });
  
  //Drop Down listener
   $("#selectfield").click(function(){
	 var item = $("#selectfieldbox");
	 $("#selectfieldbox").attr("fieldtype", "select");
	selectfields++;
	 selectoptions = selectoptions+3;
	 var cantidad = selectfields;
	 insertField(item, cantidad);
  });
  
  //name listener
 $("#namefield").click(function(){
	var item = $("#namefieldbox");
	$("#namefieldbox").attr("fieldtype", "name");
	namefields++;
	var cantidad = namefields;
	insertField(item, cantidad);	
  });
  
 //Date listener
 $("#datefield").click(function(){
	var item = $("#datefieldbox");
	datefields++;
	var cantidad = datefields;
	insertField(item, cantidad);	
  });
  
  //Time listener
  $("#timefield").click(function(){
	var item = $("#timefieldbox");
	timefields++;
	var cantidad = timefields;
	insertField(item, cantidad);	
  });
  
  //Phone listener
  $("#telfield").click(function(){
	var item = $("#telfieldbox");
	telfields++;
	var cantidad = telfields;
	insertField(item, cantidad);	
  });
  
    //Address listener
  $("#addressfield").click(function(){
	var item = $("#addressfieldbox");
	addressfields++;
	var cantidad = addressfields;
	insertField(item, cantidad);	
  });
  
  //web listener
  $("#webfield").click(function(){
	var item = $("#webfieldbox");
	webfields++;
	var cantidad = webfields;
	insertField(item, cantidad);	
  });
  
   //price listener
  $("#pricefield").click(function(){
	var item = $("#pricefieldbox");
	pricefields++;
	var cantidad = pricefields;
	insertField(item, cantidad);	
  });
  
  //mail listener
  $("#mailfield").click(function(){
	var item = $("#mailfieldbox");
	mailfields++;
	var cantidad = mailfields;
	insertField(item, cantidad);	
  });
  
  //section break listener
  $("#breakfield").click(function(){
	var item = $("#breakfieldbox");
	breakfields++;
	var cantidad = breakfields;
	insertField(item, cantidad);
	
  });
  
  //FIle
  $("#filefield").click(function(){
	var item = $("#filefieldbox");
	filefields++;
	var cantidad = filefields;
	insertField(item, cantidad);	
  });
  
  
 /* Insert. Clonamos el item y le cambiamos su id */
 function insertField(item, cantidad){ 
	fields++;
	var copia = $(item).clone();
	var itemID = $(item).attr("id");
	$(copia).attr("id", itemID+cantidad);
	var labelID = $(copia).find(".fieldLabel").attr("id");
	$(copia).find(".fieldLabel").attr("id", labelID+cantidad);
	$(copia).attr("selected", false);
	$(copia).hide();
	$(copia).appendTo($("#form"));
	//alert (copia.attr("id"));
	$(copia).mouseover(fieldHover);
	var animando = false;
	if (!animando){
		animando = true;
		$(copia).fadeIn(function(){
			animando = false;
		});
	}
	//en caso de ser checkbox editamos los name e ids de sus inputs
	if (itemID == "checkfieldbox"){
		$(copia).find("#checkboxinput").attr("name", "checkboxinput"+(checkinputs-2));
		$(copia).find("#checkboxinput").attr("id", "checkboxinput"+(checkinputs-2));
		$(copia).find("#checkboxinput2").attr("name", "checkboxinput"+(checkinputs-1));
		$(copia).find("#checkboxinput2").attr("id", "checkboxinput"+(checkinputs-1));
		$(copia).find("#checkboxinput3").attr("name", "checkboxinput"+checkinputs);
		$(copia).find("#checkboxinput3").attr("id", "checkboxinput"+checkinputs);
	}
	//en caso de ser radiobuttons
	if (itemID == "multiplefieldbox"){
		$(copia).find("#radioinput").attr("name", "Option"+cantidad);
		$(copia).find("#radioinput").attr("id", "radioinput"+(radioinputs-2));
		$(copia).find("#radioinput2").attr("name", "Option"+cantidad);
		$(copia).find("#radioinput2").attr("id", "radioinput"+(radioinputs-1));
		$(copia).find("#radioinput3").attr("name", "Option"+cantidad);
		$(copia).find("#radioinput3").attr("id", "radioinput"+radioinputs);
	}
	//select
	if (itemID == "selectfieldbox"){
		$(copia).find("#selectoption").attr("id", "selectoption"+(selectoptions-2));
		$(copia).find("#selectoption2").attr("id", "selectoption"+(selectoptions-1));
		$(copia).find("#selectoption3").attr("id", "selectoption"+selectoptions);
	}
	$(copia).click (function(){
		editField(copia);
	});
 }
 

 // hover del field
 $(".fieldbox").mouseover(fieldHover);
 
 //reset de estilos del form
 function resetFieldStyle(){
	 $(".fieldBox").css("backgroundColor","#fff");
	 $(".fieldBox").css("borderColor", "#fff");
	 $(".fieldBox").attr("selected",false);
	 $(".fieldBox").find(".removeButton").hide();
 }
 
 /* Cambia estilos con el hover evitando los items seleccionados */
 function fieldHover(){
	 
	$(this).css("borderColor","rgb(35, 140, 215)");
	$(this).css("borderStyle", "dotted");
	//$(this).css("backgroundColor", "#E5F9FC");
	
	$(this).mouseout(function(){
		if (!($(this).attr("selected"))){
			$(this).css("borderColor", "#fff");
			$(this).css("backgroundColor", "#fff");
			$(this).find(".duplicateButton").hide();
			$(this).find(".removeButton").hide();
		}
	});
 }

//Save button
$("#savebutton").click(function(){
	var resultado = $("#formBox").clone();
	var copiaID = $(resultado).attr("id");
	$(resultado).attr("id", "c"+copiaID); //cambiamos su id para evitar duplicados
	$(resultado).find("#savebutton").remove();
	$("#codeBox").text(resultado.html());
	$("#outcode").show();
});

/* limpiar value de input al hacer click */
 $("input").click(function(){
	inputdefault = $(this).val();
	//alert(inputdefault);
	$(this).val("");
});
$("textarea").click(function(){
	$(this).val("");
}); 

/* 
		 ------------------------------------------------------------
		 
								Edición de campos
		 
		 ------------------------------------------------------------
 */

 /* Esta función cambia todos los items del form para quitarles cualquier estilo y el atributo selected, y 
	los cambia para el item seleccionado en concreto para remarcarlo.
	Por otra parte muestra sus opciones de edición correspondientes.
 */
 function editField(item){
	
	//selección del item	
	$(".fieldBox").css("backgroundColor", "#fff");
	$(".fieldBox").css("borderColor","#fff");
	$(".fieldBox").attr("selected", false);
	$(".fieldBox").find(".duplicateButton").hide();
	$(".fieldBox").find(".removeButton").hide();
	$(item).css("backgroundColor", "#E5F9FC");
	$(item).css("borderColor","rgb(35, 140, 215)");
	$(item).attr("selected", true);
	
	//Borrar item
	$(item).find(".removeButton").click(function(){
		$(item).fadeOut();
		var addbox = $("#addMenu");
		var addbtn = $("#addmenubutton");
		mostrarMenu(mebox, menubtn);
		
	});
	$(item).find(".removeButton").show();
	
	
	$(item).mouseout(function(){
		$(item).css("backgroundColor", "#E5F9FC");
		$(item).css("borderColor","rgb(35, 140, 215)");
	});
	
	//Mostrar propiedades
	var mebox = $("#menuProp");
	var menubtn = $("#fieldpropbutton");
	mostrarMenu(mebox, menubtn);
	$("#errormenupropbox").hide();
	
	//edit label
	$("#editLabelbox").show();
	var prevValor = $(item).find(":first").html();
	$("#editlabelinput").val(prevValor);
	$("#editlabelinput").change(function(){
		var valor = $("#editlabelinput").val();	
		if ($(item).attr("selected")){
			$(item).find(":first").html(valor);
		}
	});
	
	//edit size para campos de tipo paragraph, number y text
	if($(item).attr("fieldtype") == "text" || $(item).attr("fieldtype") == "number" || $(item).attr("fieldtype") == "para"){
		$("#editSizebox").show();
		$("#editSizebox").click(function(){
			if ($(item).attr("selected")){
				switch ($("#fieldsizeinput").val()){
					case "Small":
						if($(item).attr("fieldtype") == "para"){
							$(item).find("textarea").css("height", "50px");
							break;
						} else{
							$(item).find("input").css("width", "100px");
							break;
						}
					case "Medium":
						if($(item).attr("fieldtype") == "para"){
							$(item).find("textarea").css("height", "100px");
							break;
						} else{
							$(item).find("input").css("width", "198px");
							break;
						}	
					case "Large":
						if($(item).attr("fieldtype") == "para"){
							$(item).find("textarea").css("height", "200px");
							break;
						} else{
							$(item).find("input").css("width", "400px");
							break;
						}		
				}
			}
		});
	}else{
		$("#editSizebox").hide();
		
	}
	//Checkbox y radiobuttons
	if ($(item).attr("fieldtype") == "check" || $(item).attr("fieldtype") == "multiple"){
		$("#editchoisesbox").show();
		if ($(item).attr("fieldtype") == "check"){
			var inputtype = "checkboxinput";
		}else{
			var inputtype = "radioinput";
		}
		var cantOpciones = $(item).find("input").length;
		for (var i = 1; i< cantOpciones; i++){
			var opcion = $("#editrow").clone();
			//alert ($("#editrow").find("input").attr("id"));
			/* Por alguna razón no me saca la id del input 
			Mi idea era hacer ducplicados, cambiarle la id y ponerle los valores de la id del input
			usando los contadores de inputs.
			Luego hacer un evento que para cambiar el valor de los inputs con el valor de este campo*/
			
			
			
		}
	} 
	
 }
 
 
/* 
		 ------------------------------------------------------------
		 
							Propiedades formulario
		 
		 ------------------------------------------------------------
 */
 
var inputdefault ="";
var txtareadefault = "";
 
 /* form name */
 
 $("#formname").change(function(){
	 //alert (inputdefault);
	var formname = $("#formname").val();
	if (formname != ""){
		$("#form").attr("name", formname);	
	}else{
		$("#formname").val(inputdefault);
	}
	
 });

//fin
});

