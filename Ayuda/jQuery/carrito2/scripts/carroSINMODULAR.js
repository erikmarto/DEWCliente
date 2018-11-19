$(function(){
	
	var compras = 0;
	
	$("div.item").dblclick(function(event){
		var stocklabel =  $(this).children("label.stock").text();
		var stock = parseInt(stocklabel.substring(6));
		//Si hay en stock
		if (stock > 0){
			stock--; //restamos 
			$(this).children("label.stock").text("Stock "+ stock);
			compras++;
			if (stock < 1){ //en caso de quedarse a 0, le añadimos la clase agotado
				$(this).children("label.stock").addClass("agotado");	
			}
			$("#citem").val(compras); //actualizamos la cantidad de compras
			var precioItem = parseInt($(this).children(".price").text());
			var precioTotal = parseInt ($("#cprice").val());
			$("#cprice").val((precioTotal + precioItem) +'€' ); //actualizamos el precio total
			var copia = $(this).clone(); //creamos la copia del item
			$(copia).attr("id","c"+this.id); //le cambiamos la id por c+id
			$(copia).addClass("icart"); // le añadimos la clase icart
			$(copia).css("cursor", "default"); //le cambiamos el cursor
			$(copia).children(".stock").hide(); //le ocultamos el stock
			var $delete = $('<a href="" class="delete"></a>'); //creamos el enlace borrar
			$(copia).prepend($delete); //se lo ponemos a la copia
			$(copia).appendTo($("#cart_items")); //añadimos la copia al carrito
			
			//funcion borrar item 
			$delete.click(function(event){
				
				var item = $(this).parent();
				var id = $(item).attr("id").substring(1);
				$(item).remove(); //borramos el item del carrito
				compras --;
				$("#citem").val(compras); //actualizamos cantidad de artículos
				var stockitem = $("#"+id).children("label.stock").text();
				stock =  parseInt(stockitem.substring(6));
				stock++;
				$("#"+id).children("label.stock").text("Stock "+ stock);
				if (stock > 0){
					$("#"+id).children(".stock").removeClass("agotado");
				}
				var total = parseInt ($("#cprice").val());
				var pItem = parseInt($("#"+id).children(".price").text());
				
				$("#cprice").val((total - pItem) +'€' );
				
				
				return false;
				
			});
			
		}
		
	});
});

