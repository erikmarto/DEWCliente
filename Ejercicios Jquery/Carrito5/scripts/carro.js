$(function () {
	compras = 0;
	sumaItem = false;

	//resteblacer valores a 0 para firefox
	$("#cprice").val(0 + '€');
	$("#citem").val(0);

	//movimiento y anchos
	anchoInicial = 483;
	movido = false;

	$("div.item").on("dblclick", dblClick); //doble click
	$("#btn_clear").on("click", vaciarCarrito); //vaciar

	//ocultando los botones de comprar, izq, der, y vaciar
	$("#btn_comprar, #btn_clear, #btn_next, #btn_prev").hide();

	/*flechas*/
	$("#btn_next").on("click", movDerecha);  //mover hacia derecha
	$("#btn_next").mouseover(startSlideDerecha);
	$("#btn_next").mouseout(stopSlideDerecha);
	$("#btn_prev").on("click", movIzquierda);  //mover hacia izquierda
	$("#btn_prev").mouseover(startSlideIzquierda);
	$("#btn_prev").mouseout(stopSlideIzquierda);

});

//Funcion doble click
function dblClick() {
	const itemID = this.id;
	let stocklabel = $(this).children("label.stock").text();
	let stock = parseInt(stocklabel.substring(6)); //cantidad del stock  

	if (stock > 0) { //en caso que sea mayor a 0
		sumaItem = true;
		actualizarStock(stock, itemID, sumaItem); //actualizar stock
		compras++; //sumar compras

		/*llamada a las funciones*/
		actualizarCompra(compras);
		actualizarTotal(itemID, sumaItem);
		addCarrito(itemID);
		if ($("#btn_comprar").css("display") == "none") {
			$("#btn_comprar").fadeIn(600); //mostramos el botón comprar
			$("#btn_clear").fadeIn(600); //mostramos el botón vaciar
		}
	}
}

//Funciones flecha
actualizarStock = (stock, itemID, sumaItem) => {
	const item = $("#" + itemID);
	if (sumaItem) { //estamos añadiendo o borrándolo un item
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
	item.children(".stock").hide();
	item.children("label.stock").fadeIn();
	item.children("label.stock").text("Stock " + stock); //rectificamos el valor
}

actualizarCompra = (compras) => {
	$("#citem").val(compras); //actualizamos la cantidad
	$("#citem").hide();
	$("#citem").fadeIn();
}

actualizarTotal = (itemID, sumaItem) => {
	const item = $("#" + itemID);
	let precioItem = parseInt(item.children(".price").text());
	let precioTotal = parseInt($("#cprice").val());
	if (sumaItem) { //si añadimos un articulo al carro
		$("#cprice").val((precioTotal + precioItem) + ' €'); //suma el precio total
		$("#cprice").hide();
		$("#cprice").fadeIn();
	} else {
		$("#cprice").val((precioTotal - precioItem) + ' €'); //resta precio total
		$("#cprice").hide();
		$("#cprice").fadeIn();
	}
}

addCarrito = (itemID) => {
	let item = $("#" + itemID);
	const clon = item.clone(); //crear clon del articulo
	$(clon).attr("id", "c" + itemID); //añadir la 'c' al id
	$(clon).addClass("icart"); //añadir la clase icart
	$(clon).css("cursor", "default"); //cambiar el cursor
	$(clon).children(".stock").hide(); //ocultar el stock

	const $add = $('<a href="" class="add"></a>');
	$add.click(sumarCantidad);
	$add.button({
		icons: { primary: "ui-icon-circle-add" },
		text: false
	});

	const $delete = $('<a href="" class="delete"></a>'); //creamos el enlace borrar
	$delete.button({
		icons: { primary: "ui-icon-circle-close" },
		text: false
	});

	const $minus = $('<a href="" class="minus"></a>');
	$minus.click(restarCantidad, $cantidad);
	$minus.button({
		icons: { primary: "ui-icon-circle-minus" },
		text: false
	});

	$(clon).hide() //ocultamos la clon para animarla

	/*comprueba si ya existe el item en el carro
	en caso de true, suma la cantidad del input
	en caso de false, añade al carro
	*/

	if ($("#cart_items").children().is("#c" + itemID)) {
		sumarCantidad(event, itemID, cantidad);
	} else {
		const cantidad = 1;
		let $cantidad = $('<input class="cantidad" type="text" value="' + cantidad + '" readonly="true" />');
		$(clon).prependTo($("#cart_items")); //añadir clon al carro//añadir clon al carro
		$(clon).prepend($minus, $add, $delete, $cantidad); //agregamos los enlaces de eliminar, sumar y restar item
	}

	$(clon).animate({ width: "toggle" }, 600);

	/*botón de borrar que guarda los parametros que 
	queremos pasar a la función de borrar*/
	$delete.on("click", function () {
		borrarArticulo(itemID, clon);
		return false;
	});

	const cantArt = $("#cart_items").children().length; //cantidad de articulos
	if (cantArt > 4) {
		/*mostramos flechas*/
		$("#btn_prev").fadeIn(600); 
		$("#btn_next").fadeIn(600);
		aumAncho(); //si hay mas de 4 incrementamos el ancho 
	}
}

borrarArticulo = (itemID, clon) => {
	let animando = false;
	if (!animando) {
		animando = true;
		$(clon).effect("explode", { mode: "hide" }, 600, function () {
			const item = $("#" + itemID);
			const stockitem = item.children("label.stock").text();
			animando = false;
			compras--;
			actualizarCompra(compras);//actualizar carrito
			clon.remove(); //borramos el artículo
			stock = parseInt(stockitem.substring(6));
			sumaItem = false;
			actualizarStock(stock, itemID, sumaItem); //volvemos a actualizar stock
			actualizarTotal(itemID, sumaItem); //restamos el al precio total
			const cantArt = $("#cart_items").children().length; //comprobamos cantidad de productos introducidos
			if (cantArt > 4) {
				redAncho(); //si hay mas de 4 decrementamos el ancho 
			} else { //sinó reiniciamos la posición y medida
				$("#cart_items").css("left", "0px");
				$("#cart_items").css("width", anchoInicial);
				$("#btn_prev").fadeOut(600); //ocultamos flechas
				$("#btn_next").fadeOut(600);
			}
			if (cantArt < 1) { //cuando se queda a 0 ocultamos los botones de comprar y vaciar
				$("#btn_clear").fadeOut(600);
				$("#btn_comprar").fadeOut(600);
			}
		});
	}
}

vaciarCarrito = () => {
	const deletes = $("#cart_items").children(".item").children(".delete"); //seleccionamos los botones de borrar item
	deletes.trigger("click"); //lanzamos un trigger de su listener para ejecutarlos todos
	$("#cart_items").css("left", "0px");
	$("#cart_items").css("width", anchoInicial + "px");
	$("#btn_clear").fadeOut();
	$("#btn_comprar").fadeOut();
}

//aumenta el ancho a medida que se añaden artículos
aumAncho = () => {
	const ancho = parseInt($("#cart_items").css("width"));
	$("#cart_items").css("width", ancho + 120 + "px");
}

//reduce el ancho según se vayan eliminando artículos
redAncho = () => {
	const ancho = parseInt($("#cart_items").css("width"));
	$("#cart_items").css("width", ancho - 120 + "px");
	movIzquierda();
}

//desplaza el carro hasta un borde
movDerecha = () => {
	const ancho = parseInt($("#cart_items").css("width"));
	const left = parseInt($("#cart_items").css("left"));
	if (compras > 4) {
		if ((left + ancho) > anchoInicial) {
			$("#cart_items").css("left", left - 60 + "px");
		}
	}
}

//desplaza el carro a la izquierda
movIzquierda = () => {
	const left = parseInt($("#cart_items").css("left"));
	if (compras > 4 || left < 0) {
		if (left != 0) {
			$("#cart_items").css("left", left + 60 + "px");
		}
	}
}

/*hacemos recursividad en la función de callback 
para que al terminar la animación siga desplazándose*/
startSlideIzquierda = () => {
	var left = parseInt($("#cart_items").css("left"));
	var desp = "+=5";
	//cambiamos la velocidad dependiendo la cantidad de compras
	if (compras > 9) {
		desp = "+=10";
	}
	if (compras > 4 || left < 0) {
		if (left != 0) {
			$("#cart_items").animate({ left: desp }, 1, function () {
				if (left < 0) {
					startSlideIzquierda();
				}
			});
		}
	}
	return false;
}

//parar desplazamiento a la izquierda
stopSlideIzquierda = () => {
	const left = parseInt($("#cart_items").css("left"));
	if (left < 60) {
		$("#cart_items").stop(true, false);
	}
}

//empezar desplazamiento derecho
startSlideDerecha = () => {
	const ancho = parseInt($("#cart_items").css("width"));
	const left = parseInt($("#cart_items").css("left"));
	let desp = "-=5";
	//cambiamos la velocidad dependiendo la cantidad de compras
	if (compras > 9) {
		desp = "-=10";
	}
	if (compras > 4) {
		if ((left + ancho) > anchoInicial) {
			$("#cart_items").animate({ left: desp }, 1, function () {
				startSlideDerecha();
			});
		}
	}
}

//parar desplazamiento a la derecha
stopSlideDerecha = () => {
	$("#cart_items").stop(true, false);
}


//comprueba si el item ya está y cambia su cantidad
sumarCantidad = (event, itemID, cantidad) => {
	event.preventDefault();
	alert();
	const $cantidad = $("#c" + itemID).find(".cantidad");
	const cantidad = $cantidad.val();
	cantidad++;
	$cantidad.val(cantidad);
}

//igual que sumar pero decrementando
restarCantidad = (event, $cantidad) => {
	event.preventDefault();
	let cantidad = $cantidad.val();
}