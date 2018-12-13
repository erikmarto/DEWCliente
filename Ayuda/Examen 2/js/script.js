$(function(){
	
	//Encapsulamos las imagenes con un div de clase photo_slider_img
	$("img").wrap("<div class='photo_slider_img'></div>");
	
	//cambiamos márgenes del thumbnail
	$("img").css("marginLeft, -150px");
	$("img").css("marginTop, -150px");
	
	//añadimos el enlace more info
	$(".photo_slider").append("<a class='more_info' href='#'></a>");
	//añadimos la imagen de moreinfo al enlace
	$(".more_info").css("backgroundImage", "url(images/moreinfo.jpg)");
	
	//añadimos enlace para borrar
	$(".info_area").append("<a class='close'> Close </a>");
	$(".close").css("cursor", "pointer");	
	
	//medidas del thumbnail
	var thumbnailY = $("photo_slider_img").height();
	var thumbnailX = $("photo_slider_img").width();
	
	$(".more_info").click(function(){
		//recogemos medidas originales de la foto
		var imgY = $(this).parent().find("img").height();
		var imgX = $(this).parent().find("img").width();
		
		//aumentamos el tamaño del photo_slider + los 95px para el infoarea
		$(this).parent().animate({
			height: imgY+95,
			width: imgX,
			borderWidth: 10
		},600);
		
		/* Cambiamos tamaño del contenedor de la imagen ya que tiene un overflow hidden */
		$(this).parent().find(".photo_slider_img").animate({
			height: imgY,
			width: imgX,
			
		}, 600);
		
		//quitamos el more info y mostramos el infoarea
		$(this).fadeOut(600);
		$(this).parent().find(".info_area").fadeIn(600);
		
	
	});
	
	$(".close").click(function(){
		
		//mostramos la información correcta de nuevo
		$(this).parent().fadeOut(600);
		$(this).parent().parent().find(".more_info").fadeIn(600);
		
		//disminuimos la medida de la imagen otra vez
		$(this).parent().parent().height(thumbnailY);
		$(this).parent().parent().find(".photo_slider_img").animate({
			width: 100, //tuve que usar manualmente las medidas en vez de las variables, porque recogia el valor ya modificado
			height: 100
		});
		//disminuimos el contenedor
		$(this).parent().parent().animate({
			width:100,
			height:130,
			borderWidth: 2
		});
	});
});