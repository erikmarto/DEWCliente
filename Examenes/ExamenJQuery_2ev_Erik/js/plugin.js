$(function () {

    //Añadimos la clase (photo-area = info-area)
    $(".info_area").append("<a class='close'> Close </a>");

    //Guardamos los valores del slider en const
    const sliderH = $("photo_slider_img").height();
    const sliderW = $("photo_slider_img").width();

    //Asignamos los márgenes de las imagenes left/top
    $("img").css("marginLeft, -150px");
    $("img").css("marginTop, -150px");


    /* ESTRUCTURA */
    //Cogemos las imágenes con un div con la clase .photo_slider_img
    $("img").wrap("<div class='photo_slider_img'></div>");

    //Creamos el enlace more_info
    $(".photo_slider").append("<a class='more_info' href='#'></a>");

    //Le ponemos la imagen de more_info al enlace
    $(".more_info").css("backgroundImage", "url(images/moreinfo.jpg)");


    /* EVENTO CLICK MÁS INFO */
    $(".more_info").click(function () {

        //Guardamos los valores de alto/ancho de las imágenes
        const imgH = $(this).parent().find("img").height();
        const imgW = $(this).parent().find("img").width();

        //Animación que devuelve las dimensiones originales a las imágenes y aumenta el slider con ello
        $(this).parent().animate({
            height: imgH + 95, //incrementamos en 95px la altura
            width: imgW,
            borderWidth: 10 //ancho del borde a 10px
        }, 600); //velocidad 600ms

        //El enlace more_info desaparece
        $(this).fadeOut(600);

        //Animación que tomara las medidas originales de la imagen
        $(this).parent().find(".photo_slider_img").animate({
            height: imgH,
            width: imgW,
            marginTop: 0,
            marginLeft: 0
        }, 600); //velocidad 600ms

        //Animación para que info_area aparezca
        $(this).parent().find(".info_area").fadeIn(600);

    });


    //Enlace para cerrar la ventana
    $(".close").css("cursor", "pointer");


    /* EVENTO CLICK CERRAR */
    $(".close").click(function () {

        //Animación que disminuye el slider al tamaño inicial
        $(this).parent().parent().animate({
            width: 100,
            height: 130,
            borderWidth: 1 //borde con valor de 1px
        }, 600);

        //El enlace more_info aparece
        $(this).parent().parent().find(".more_info").fadeIn(600);

        //Animación para reducir y tomar las medidas del slider y con ello las imágenes
        $(this).parent().parent().height(sliderH);
        $(this).parent().parent().width(sliderW);
        
        $(this).parent().parent().find(".photo_slider_img").animate({
            width: 100,
            height: 100,
        }, 600);

        //Animación para que info_area desaparezca
        $(this).parent().fadeOut(600);

    });

});