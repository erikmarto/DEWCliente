$(function(){

    sumarItem  = false;
    compras = 0 ;

    $("div.item").dblclick(function(){
        let itemID = this.id;
        let stockLabel = $(this).children("label.stock").text();
        let stock = parseInt(stockLabel.substring(6));
        
        if (stock > 0) {
            sumarItem = true;
            actualizarStock(itemID, stock, sumarItem);
            compras++;
            actualizarCompras(compras);
            addToCart(itemID);
        } 
        console.log(itemID, stockLabel); 
    });

    function actualizarStock(itemID, stock, sumarItem){
        let item = $("#" + itemID);

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
		item.children("label.stock").text("Stock "+ stock); //escribimos el valor correcto
    }

    function actualizarCompras(compras){
        $("citem").val(compras);
    }

    function addToCart(itemID){
		let item = $("#" + itemID);
        let clon = item.clone(); //creamos un clon del artículo
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
			deleteFromCart(itemID, copia);
			return false;
		});	
	}

});

