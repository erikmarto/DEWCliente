$(function() {

    sumarItem  = false;
	compras = 0;
	
    $("div.item").dblclick(function() {
        const itemID = this.id;
        let stockLabel = $(this).children("label.stock").text();
        let stock = parseInt(stockLabel.substring(6)); //cantidad del stock 
        
        if (stock > 0) {//en caso que sea mayor a 0
            sumarItem = true;
            actualizarStock(itemID, stock, sumarItem); //actualizar stock
			compras++; //sumar coimpras

			/*llamada a las funciones*/
            actualizarCompra(compras);
            actualizarTotal(itemID, sumarItem);
            addCarrito(itemID);
        } 
    });
});

actualizarStock = (itemID, stock, sumarItem) => {
	const item = $("#" + itemID);

	if (sumarItem) { //estemos añadiendo o borrándolo un item
		stock --; //restamos stock 
		
		if (stock < 1) { //si esta a 0 se añade clase
			item.children("label.stock").addClass("agotado");
		}		
	} else {
		stock ++; //sumamos stock
		
		if (stock > 0) {
			item.children("label.stock").removeClass("agotado");
		}	
	}
	item.children("label.stock").text("Stock " + stock); //rectificamos el valor
	//console.log(stock);
}

actualizarCompra = (compras) => {
	$("#citem").val(compras); //actualizamos la cantidad 
}

actualizarTotal = (itemID, sumarItem) => {
	const item = $("#" + itemID); 
	let precioItem = parseInt(item.children(".price").text());
	let precioTotal = parseInt ($("#cprice").val());

	if (sumarItem){ //si añadimos un articulo al carro
		$("#cprice").val((precioTotal + precioItem) + '€' ); //suma precio total 
	}else{
		$("#cprice").val((precioTotal - precioItem) + '€' ); //resta precio total
	}
}

addCarrito = (itemID) => {
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
	$borrar.click(function(){
		borrarArticulo(itemID, clon);
		return false;
		//console.log(clon);
	});	
}

borrarArticulo = (itemID, clon) => {
	const item = $("#" + itemID);
	const stockItem = item.children("label.stock").text();

	clon.remove();//borramos el artículo
	compras--; 
	actualizarCompra(compras); //actualizar carro
	stock = parseInt(stockItem.substring(6));
	sumarItem = false;
	actualizarStock(itemID, stock, sumarItem); //volver a actualizar el stock
	actualizarTotal(itemID, sumarItem); //restar pre.articulo al total
}