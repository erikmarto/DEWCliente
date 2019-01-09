$(function(){
	
	
	$("#sumabutton").click(function(){
		
		var a = parseInt($("#primero").val());
		var b = parseInt($("#segundo").val());
		$("#resultado").html(sumar(a,b));
	});
	
	$("#restabutton").click(function(){

		var a = parseInt($("#primero").val());
		var b = parseInt($("#segundo").val());
		$("#resultado").html(restar(a,b));
	});
	
	
	
	
	
});