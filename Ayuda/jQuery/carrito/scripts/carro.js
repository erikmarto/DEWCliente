$(function(){
	
	$("div.item").css("background-color", "#cecece");
	$("#cart_items").css("border","4px solid black");
	$("img").css("border", "1px solid blue");
	$(".item > label").css("text-decoration", "underline");
	$("#cart_container button").css("color", "red");
	$(".item label+label").css("color","white");
	$("input, *:contains('€')").css("color","green");
	$("div:empty").css("background-color","yellow");
	$(".item:first, .item:last").css("background-color","red");
	$("[src^='img/camiseta']").css("border", "1px solid green");
});

