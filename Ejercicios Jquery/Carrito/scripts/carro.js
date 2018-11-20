$(function(){

    sumarItem  = false;
    compras = 0;

    $("div.item").dblclick(function(){
        const itemID = this.id;
        let stockLabel = $(this).children("label.stock").text();
        let stock = parseInt(stockLabel.substring(6));
        
        if (stock > 0) {
            sumarItem = true;
            actualizarStock(stock, itemID, sumarItem);
            compras++;
            actualizarCompras(compras);
            actualizarTotal(itemID, sumarItem);
            addToCart(itemID);
        } 
    });

    function actualizarStock(stock, itemID, sumarItem){
        const item = $("#" + itemID);

        if (sumarItem) { 
			stock --; 
			if (stock < 1) { 
				item.children("label.stock").addClass("agotado");
			}		
		}else{
			stock ++; //sumamos stock
			
			if (stock > 0) {
				item.children("label.stock").removeClass("agotado");
			}	
		}
		item.children("label.stock").text("Stock " + stock); //escribimos el valor correcto
		console.log(stock);
    }

    function actualizarCompras(compras){
        $("#citem").val(compras);
    }

    function actualizarTotal(itemID, sumarItem){
		const item = $("#"+itemID); 
		let precioItem = parseInt(item.children(".price").text());
		let precioTotal = parseInt ($("#cprice").val());
		if (sumarItem){ 
			$("#cprice").val((precioTotal + precioItem) +'€' ); 
		}else{
			$("#cprice").val((precioTotal - precioItem) +'€' ); 
		}
	}

    function addToCart(itemID){
		let item = $("#" + itemID);
        const clon = item.clone(); //creamos un clon del artículo
        const $delete = $('<a href="" class="delete"></a>');

		$(clon).attr("id", "c" + itemID);
		$(clon).addClass("icart");
		$(clon).css("cursor", "default");
		$(clon).children(".stock").hide();
		$(clon).prepend($delete);
		$(clon).appendTo($("#cart_items"));
		
		/*Creamos un listener al botón de borrar que tiene una funcion que guarda los parametros que queremos pasar 
		 a la función de borrar*/
		$delete.click(function(){
			deleteFromCart(itemID, clon);
			return false;
		});	
    }
    
    function deleteFromCart(itemID, clon){
		clon.remove();//borramos el artículo del carrito
		compras--; 
		actualizarCompras(compras); //Actualizamos cantidad de artículos del carrito
		const item = $("#"+itemID);
		const stockitem = item.children("label.stock").text();
		stock = parseInt(stockitem.substring(6));
		sumarItem = false;
		actualizarStock(stock, itemID, sumarItem); //volvemos a actualizar stock
		actualizarTotal(itemID, sumarItem); //restamos el al precio total
	}

});

