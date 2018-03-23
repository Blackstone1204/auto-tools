
addLogEvent();

function addLogEvent(){
	
$(document).ready(function(){
	logInit();
	toggle();
});
}

function logInit(){
	  //设置log区块
  //$("#south-part").css("width","200px");
}
function toggle(){

	


	$("#toggle").click(function(){

		var flag=$(this).children("i").hasClass("glyphicon-chevron-up");

		//alert(flag);


		if(flag){


			$(this).children("i").removeClass("glyphicon-chevron-up");
			$(this).children("i").addClass("glyphicon-chevron-down");
			$("#log").removeClass("hidden");



		}else{



			$("#log").addClass("hidden");
			$(this).children("i").removeClass("glyphicon-chevron-down");
			$(this).children("i").addClass("glyphicon-chevron-up");

		}

	});




}

