$(function () {
	sumarItem = false;
	compras = 0;

	//resteblacer valores a 0 para firefox
	$("#cprice").val(0 + '€');
	$("#citem").val(0);

	//movimiento y anchos
	anchoInicial = 483; //medida
	ancho = parseInt($("#cart_items").css("width")); //recoger el ancho
	cantArt = $("#cart_items").children().length; //cantidad de articulos
	left = parseInt($("#cart_items").css("left"));

	$("div.item").on("dblclick", dblClick); //doble click
	$("#btn_clear").on("click", vaciarCarrito); //vaciar
	
	$("#btn_next").on("click", movDerecha);  //mover derecha
	$("#btn_prev").on("click", movIquierda);  //mover izquierda
	
});

//Funcion doble click
function dblClick() {
	const itemID = this.id;
	let stockLabel = $(this).children("label.stock").text();
	let stock = parseInt(stockLabel.substring(6)); //cantidad del stock 

	if (stock > 0) {//en caso que sea mayor a 0
		sumarItem = true;
		actualizarStock(itemID, stock, sumarItem); //actualizar stock
		compras++; //sumar compras

		/*llamada a las funciones*/
		actualizarCompra(compras);
		actualizarTotal(itemID, sumarItem);
		addCarrito(itemID, cantArt);
	}
}

//Funciones flecha
actualizarStock = (itemID, stock, sumarItem) => {
	const item = $("#" + itemID);

	if (sumarItem) { //estemos añadiendo o borrándolo un item
		stock--; //restamos stock 

		if (stock < 1) { //si esta a 0 se añade clase
			item.children("label.stock").addClass("agotado");
		}
	} else {
		stock++; //sumamos stock

		if (stock > 0) {
			item.children("label.stock").removeClass("agotado");
		}
	}
	item.children("label.stock").text("Stock " + stock); //rectificamos el valor
}

actualizarCompra = (compras) => {
	$("#citem").val(compras); //actualizamos la cantidad 
}

actualizarTotal = (itemID, sumarItem) => {
	const item = $("#" + itemID);
	let precioItem = parseInt(item.children(".price").text());
	let precioTotal = parseInt($("#cprice").val());

	if (sumarItem) { //si añadimos un articulo al carro
		$("#cprice").val((precioTotal + precioItem) + '€'); //suma precio total 
	} else {
		$("#cprice").val((precioTotal - precioItem) + '€'); //resta precio total
	}
}

addCarrito = (itemID, cantArt) => {
	let item = $("#" + itemID);
	const clon = item.clone(); //crear clon del articulo
	const $borrar = $('<a href="" class="delete"></a>'); //crear enlace borrar

	$(clon).attr("id", "c" + itemID); //añadir la 'c' al id
	$(clon).addClass("icart"); //añadir la clase icart
	$(clon).css("cursor", "default"); //cambiar el cursor
	$(clon).children(".stock").hide(); //ocultar el stock
	$(clon).prepend($borrar); //se le añade el enlace al clon
	$(clon).appendTo($("#cart_items")); //añadir clon al carro

	/*click de borrar*/
	$borrar.on("click", function () {
		borrarArticulo(itemID, clon, cantArt);
		return false;
	});

	if (cantArt > 4) {
		aumAncho(); //si hay mas de 4 incrementamos el ancho 
	}
}

borrarArticulo = (itemID, clon, cantArt) => {
	const item = $("#" + itemID);
	const stockItem = item.children("label.stock").text();

	clon.remove();//borramos el artículo
	compras--;
	actualizarCompra(compras); //actualizar carro
	stock = parseInt(stockItem.substring(6));
	sumarItem = false;
	actualizarStock(itemID, stock, sumarItem); //volver a actualizar el stock
	actualizarTotal(itemID, sumarItem); //restar pre.articulo al total

	if (cantArt > 4){ 
		reducirAncho(); //si hay mas de 4 decrementamos el ancho 
	}else{
		$("#cart_items").css("left","0px");
		$("#cart_items").css("width", anchoInicial);
	}
}


vaciarCarrito = () => {
	const deletes = $("#cart_items").children(".item").children(".delete"); //seleccionamos los botones de borrar item
	deletes.trigger("click"); //lanzamos un trigger de su listener para ejecutarlos todos
	$("#cart_items").css("left","0px");
	$("#cart_items").css("width", anchoInicial+"px");
}

aumAncho = () => {
	const ancho = parseInt($("#cart_items").css("width"));
	$("#cart_items").css("width", ancho + 120 + "px");
}

redAncho = () => {
	const ancho = parseInt($("#cart_items").css("width"));
	$("#cart_items").css("width", ancho - 120 + "px");
	movIquierda();
}

movDerecha = () => {
	const ancho = parseInt($("#cart_items").css("width"));
	const left = parseInt($("#cart_items").css("left"))
	if (compras > 4){
		if ((left+ancho)>anchoInicial) {
			$("#cart_items").css("left", left - 60 + "px");
		}	
	}
}

movIquierda = () => {
	const left = parseInt($("#cart_items").css("left"));
	if (compras > 4 || left < 0){
		if (left != 0){
			$("#cart_items").css("left",left + 60 + "px");
		}	
	}
}



