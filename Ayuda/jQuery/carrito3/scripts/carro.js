$(function(){
	
	var compras = 0;
	var sumaItem  = false;
	const anchoInicial = 483;
	var movido = false;
	
	
	//doble click en artículo
	$("div.item").dblclick(function(event){
		var itemID = this.id;
		var stocklabel =  $(this).children("label.stock").text();
		var stock = parseInt(stocklabel.substring(6)); //Substraemos la cantidad del stock 
		
		if (stock > 0){ //en caso de que el stock sea mayor a 0
			sumaItem = true;
			actualizarStock(stock, itemID, sumaItem); //actualizamos stock
			compras++; //sumamos el valor de compras
			actualizarCompras(compras); //actualizamos las compras
			actualizarTotal(itemID, sumaItem);
			addToCart(itemID);
		}
		
	});
	
	function actualizarStock(stock, itemID, sumaItem){
		var item = $("#"+itemID); 
		if (sumaItem){ //depende si estemos añadiendo un item al carro o borrándolo
			stock --; //restamos el valor del stock 
			if (stock < 1){ //en caso de quedarse a 0, le añadimos la clase agotado
				item.children("label.stock").addClass("agotado");
			}		
		}else{
			stock++; //sumamos stock
			if (stock > 0){
				item.children("label.stock").removeClass("agotado");
			}	
		}
		item.children("label.stock").text("Stock "+ stock); //escribimos el valor correcto

	}
	
	function actualizarCompras(compras){
		$("#citem").val(compras); //actualizamos la cantidad de compras
	}
	
	function actualizarTotal(itemID, sumaItem){
		var item = $("#"+itemID); 
		var precioItem = parseInt(item.children(".price").text());
		var precioTotal = parseInt ($("#cprice").val());
		if (sumaItem){ //En caso de añadir, el valor sera true, si borramos, el valor sera false
			$("#cprice").val((precioTotal + precioItem) +'€' ); //sumamos al precio total
		}else{
			$("#cprice").val((precioTotal - precioItem) +'€' ); //restamos al precio total
		}
	}
	
	function addToCart(itemID){
		var item = $("#"+itemID);
		var copia = item.clone(); //creamos un clon del artículo
		$(copia).attr("id","c"+itemID); //añadimos la 'c' al id para mantener la propiedad única de un id
		$(copia).addClass("icart"); // le añadimos la clase icart
		$(copia).css("cursor", "default"); //le cambiamos el cursor
		$(copia).children(".stock").hide(); //le ocultamos el stock
		var $delete = $('<a href="" class="delete"></a>'); //creamos el enlace borrar
		$(copia).prepend($delete); //se lo ponemos a la copia
		$(copia).appendTo($("#cart_items")); //añadimos la copia al carrito
		
		/*Creamos un listener al botón de borrar que tiene una funcion que guarda los parametros que queremos pasar 
		 a la función de borrar*/
		$delete.click(function(){
			
			deleteFromCart(itemID, copia);
			return false;
		});
		var cantProd = $("#cart_items").children().length; //comprobamos cantidad de productos introducidos
		if (cantProd > 4){ 
			aumentarAncho(); //si hay mas de 4 incrementamos el ancho 
		}
		
	}
	
	function deleteFromCart(itemID, copia){
	
		copia.remove();//borramos el artículo del carrito
		compras--; 
		actualizarCompras(compras); //Actualizamos cantidad de artículos del carrito
		var item = $("#"+itemID);
		var stockitem = item.children("label.stock").text();
		stock = parseInt(stockitem.substring(6));
		sumaItem = false;
		actualizarStock(stock, itemID, sumaItem); //volvemos a actualizar stock
		actualizarTotal(itemID, sumaItem); //restamos el al precio total
		var cantProd = $("#cart_items").children().length; //comprobamos cantidad de productos introducidos
		if (cantProd > 4){ 
			reducirAncho(); //si hay mas de 4 decrementamos el ancho 
		}else{
			$("#cart_items").css("left","0px");
			$("#cart_items").css("width", anchoInicial);
		}

		
	}
	
	$("#btn_clear").click(vaciarCarrito); //vaciar carro
	$("#btn_next").click(moveRight);  //mover hacia  la derecha
	$("#btn_prev").click(moveLeft);  //mover hacia  la izquierda
	
	function vaciarCarrito(){
		
		var deletes = $("#cart_items").children(".item").children(".delete"); //seleccionamos los botones de borrar item
		deletes.trigger("click"); //lanzamos un trigger de su listener para ejecutarlos todos
		$("#cart_items").css("left","0px");
		$("#cart_items").css("width", anchoInicial+"px");
	}
	
	function aumentarAncho(){
		var ancho = parseInt($("#cart_items").css("width"));
		$("#cart_items").css("width", ancho+120+"px");
		//alert (ancho);
		
	}
	
	function reducirAncho(){
		var ancho = parseInt($("#cart_items").css("width"));
		$("#cart_items").css("width", ancho-120+"px");
		moveLeft();
		moveLeft();	
	}
	
	function moveRight(){
		var ancho = parseInt($("#cart_items").css("width"));
		var left = parseInt($("#cart_items").css("left"));
		
		if (compras > 4 ){
			if ((left+ancho)>anchoInicial ){
				$("#cart_items").css("left",left-60+"px");
				
			}	
		}
		
	}
	
	function moveLeft(){
		
		var left = parseInt($("#cart_items").css("left"));
		if (compras > 4 || left < 0){
			if (left != 0){
				$("#cart_items").css("left",left+60+"px");
			}	
		}
	}
	
});