
//定义鼠标按下释放坐标
var down=0;
var downY=0;
var upX=0;
var upY=0;
var pyl=10;
var pyl2=5;
var downTime=0;
var upTime=0;



register();

function register(){


	//touch();
    mouseon();
    //mousemove();
    menuevent();
    backevent();
    home();
   // show();
    drag();
    //
    entry();

    //back

    focus();
    
   //

    moveListen();

    //
   modeToggle();


    recordstatuschange();

    waitClick();
    refresh();
    screenshotByHand();
    recordoptionshow();
    deviceoptionshow();

   playback();



}

function show(){
      var mydiv = document.createElement("div"); 
      mydiv.setAttribute("id","hint"); 
      mydiv.style.position="absolute"; 
      mydiv.style.lineHeight="10px"; 
      mydiv.style.width="80px"; 
      mydiv.style.borderStyle="solid"; 
      mydiv.style.borderColor="#000000"; 
      mydiv.style.borderWidth="0px";   
      mydiv.style.height="20px"; 
      mydiv.style.display="none"; 
      mydiv.style.color="red";
      document.body.appendChild(mydiv); 
      document.addEventListener("mousemove",function(e){
          var myhint = document.getElementById("hint");
          myhint.style.display= "block";
          myhint.style.left= e.clientX+"px";
          myhint.style.top= e.clientY+"px";

          myhint.innerHTML=e.clientX+","+e.clientY;
      });
  }


function mouseon(){
	$("#device-show").mousemove(function(e){
		$(this).css("cursor","crosshair");
		//console.log("x "+e.clientX);

		//show();
	});

}




//menu事件

function menuevent(){

	$("#menu").click(function(){

		actionexecute("menu","");
		//actionjudge("menu","");

	});




}

//back事件

function backevent(){
    $("#back").click(function(){

		actionexecute("back","");
		//actionjudge("back","");

	});

}


//home事件
function home(){
	$("#home").click(function(){

		actionexecute("home","");
		//actionjudge("home","");

	});

}

//单击事件
// function touch(){


// 	$("#device-show").click(function(e){

// 		//alert("test");


// 		console.log("设备显示区域被点击");
//         var point={};
//         point.x=e.clientX;
//         point.y=e.clientY;
//         var realpoint=convert_2(point);

//         var action="touch"
// 		var args="";
// 		args=";"+realpoint.x+";"+realpoint.y;

//         //执行命令
// 		actionexecute(action,args);



// 	});
// }



//双击事件  暂时不支持
function dbtouch(){


	$("#device-show").dblclick(function(e){



		console.log("设备显示区域被双击");

        var point={};
        point.x=e.clientX;
        point.y=e.clientY;
        var realpoint=convert_2(point);


        var action="dbtouch"
		var args=[];
		args.push(realpoint.x);
		args.push(realpoint.y);

        //执行命令
		actionexecute(action,args)


	});
}


//滑动事件或单击事件
function drag(){

	$("#device-show").mouseup(function(e){

		upTime=new Date().getTime();

		var spend=(upTime-downTime)/1000;
		console.log("spend time "+spend +"s");

		downX=e.clientX;
		downY=e.clientY;

        var flag=Math.abs(downX-upX)>pyl||Math.abs(downY-upY)>pyl

        var flag2=Math.abs(downX-upX)<pyl2&&Math.abs(downY-upY)<pyl2

		if(flag){

			var downpoint={};
			var uppoint={};
			downpoint.x=downX;
			downpoint.y=downY;
			uppoint.x=upX;
			uppoint.y=upY;


            var realdownpoint=convert_2(downpoint);
            var realuppoint=convert_2(uppoint);
			var action="drag";
			var args=";"+realdownpoint.x+";"+realdownpoint.y+";"+realuppoint.x+";"+realuppoint.y;

		    var webdownpoint=convert_2(downpoint);
		    var webuppoint=convert_2(uppoint);
		    var args0=";"+webdownpoint.x+";"+webdownpoint.y+";"+webuppoint.x+";"+webuppoint.y;

			actionexecute(action,args);
			//actionjudge(action,args0);

		}

		if(flag2){



			//算点击事件
	

	        console.log("设备显示区域被点击 "+isWait());
            var point={};
            point.x=e.clientX;
            point.y=e.clientY;
            var realpoint=convert_2(point);

            var webpoint=convert_2(point);

            var action="touch"

		    var args="";
		    //var args0="";

		    args=";"+realpoint.x+";"+realpoint.y;
		    //args0=";"+webpoint.x+";"+webpoint.y;


		    //根据时间判断是否是长按操作

		    if(spend>1.5){
		    	action="longtouch";
		    	args=args+";"+realpoint.x+";"+realpoint.y+";3000";
		    	
		    	args0=args0+";"+webpoint.x+";"+webpoint.y+";3000";
		    }

            //执行命令
		    actionexecute(action,args);

		    //

		  
		}

	});


	$("#device-show").mousedown(function(e){

		downTime=new Date().getTime();

		upX=0;
		upY=0;
		downX=0;
		downY=0;

		upX=e.clientX;
		upY=e.clientY;




	});


	//var action="drag";
}


//文本输入
function entry(){

	$(document).keydown(function(event){
		var hasF=$("#message").is(":focus");

　　　　if(event.keyCode == 13&&hasF){


　　　　 var actionName="input";
		var args=";"+$("#message").val();
		actionexecute(actionName,args);

		$("#message").val("");



　　　　}else if(event.keyCode==8){

　　　　 var actionName="key_back";
		var args=";";
		actionexecute(actionName,args);


      }

　　});

}

//





//点击操作文本聚焦
function focus(){
	$("#device-show").click(function(){

		//console.log("click 触发focus事件...");

		$("#message").focus();
	});
}

//点击位置实时显示

function moveListen(){

	$("#device-show").mousemove(function(e){

		

		var p={x:e.clientX,y:e.clientY}
		var pn=convert_2(p);
		$("#reslv").text(pn.x+"x"+pn.y+"@"+dwidth+"x"+dheight);

		//console.log("e=>"+e.clientX+" "+e.clientY);




	});

}
//开启录制脚本
function recordstatuschange(){

	//初始状态判断
		
	     //  var args={};
	     //  args.userName=getParam("userName");
	     //  args.serial=getParam("serial");

	     //  var url="http://"+target_ip+":"+target_port+"/auto-web/mGetUserRecord";
	     //  var obj=get(url,args);
	     //  if(obj==undefined)return;


	     //  if(obj.data=undefined)return;

	     //  ///if(obj.data==null)return;

	  	  // if(obj.data.length>0){
	     //      $("#btn-record").text("停止录制");
		    //   $("#btn-record").addClass("recording");

		    //   //标记一个时间点 对应后台录制图片保存位置
		    //   $("#timerecord").html(getTimeStr());

	     //  	}



	$("#btn-record").click(function(){

	var url;
	var status=$("#btn-record").hasClass("recording");



	if(status===false){

		
		$("#btn-record").text("停止录制");
		$("#btn-record").addClass("recording");

		//标记一个时间点 对应后台录制图片保存位置
		$("#timerecord").html(getTimeStr());


	}
	else{



		$("#btn-record").text("开始录制");
		$("#btn-record").removeClass("recording");

		recordStop();
	}

	status=$("#btn-record").hasClass("recording");

   // console.log("脚本录制状态 "+status);



	});

	

}

//是否录屏中
function isrecording(){
  return $("#btn-record").hasClass("recording");

}


//开启自动识别模式 waiting
function waitClick(){
	$("#waiter").click(function(){

		console.info("waiting模式切换");
		waitToggle();

	});

}
function waitToggle(){

	if(isWait()){
		$("#waiter").removeClass("waiting");
		$(".glyphicon-eye-open").css("color","");

	}
	else {
		$("#waiter").addClass("waiting");
		$(".glyphicon-eye-open").css("color","red");

	}

}

function waitRemove(){
	if(isWait()){
		$("#waiter").removeClass("waiting");
		$(".glyphicon-eye-open").css("color","");

	}

}

function isWait(){

	return $("#waiter").hasClass("waiting");

}





//将web页面中屏幕点击坐标转为设备实际坐标
function convert(point){
	var out={};
	//console.log(typeof out);
	if(typeof point==='object'){

	    var touchX=point.x;
		var touchY=point.y;
        //console.log("输入坐标为 ["+touchX+","+touchY+"]");

		var target=document.getElementById("device");
		var target2=document.getElementById("main-control");

		var minX=target.offsetLeft;
		var maxX=target.offsetLeft+target.clientWidth;
		var minY=target2.clientHeight;
		var maxY=target.clientHeight;	

		//console.log("投影区域范围 "+"["+minX+","+minY+"]["+maxX+","+maxY+"]");	

		var screenX=touchX-minX;
		var screenY=touchY-minY;
		var realX=screenX*dwidth/bw2;
		var realY=screenY*dwidth/bw2;
        
        //console.log("缩放比例 "+dwidth/bw2);
		console.log("投影坐标转换 ["+screenX+","+screenY+"] ——>["+realX+","+realY+"]");

        out.x=realX;
		out.y=realY;




	}else{
		console.log("point 输入类型不合法");
	}

	return out;


}

//将实际点击位置转换成pc投影对应点击位置
function convert_2(point){
	var out={};
	//console.log(typeof out);
	if(typeof point==='object'){

	    var touchX=point.x;
		var touchY=point.y;
        //console.log("输入坐标为 ["+touchX+","+touchY+"]");

		var target=document.getElementById("device");
		var target2=document.getElementById("main-control");

		var minX=target.offsetLeft;
		var maxX=target.offsetLeft+target.clientWidth;
		var minY=target2.clientHeight;
		var maxY=target.clientHeight;	

		

		var screenX=touchX-minX;
		var screenY=touchY-minY;

		//console.log("web内 屏幕点击坐标为 ["+screenX+","+screenY+"]");

        out.x=screenX;
		out.y=screenY;




	}else{
		console.log("point 输入类型不合法");
	}

	return out;

}

//调用本地方法执行action
function actionexecute(action,argstr){



	var interfaceName="";
	var url="http://"+target_ip+":"+target_port+"/auto-web/actionControl";
    
    var t=$(".mode-selected");
    var args={};
    args.serial=getParam("serial");
    args.userName=getParam("userName");
    args.actionName=action;

    if(isWait()&&isrecording()){
		args.actionName="wait";

		waitRemove();

	}


    args.args=argstr;
    args.sw=bw2;
    args.isRecording=String(isrecording());

    //args.mode=t[0].getAttribute("id");
    args.mode=0;
    console.log("当前mode=%s",args.mode);
    args.time=$("#timerecord").text();

    console.log("模拟动作 "+url);
    console.log("serial="+args.serial+" actionName="+args.actionName+" args="+argstr+" sw="+args.sw+" isRecording="+args.isRecording);
	

	get3(url,args,getCurrentUserRecord);

	//updateUI();


}

function delUserRecordLast(){

	$("#del-last").click(function(){
	  console.log("del-last");

	  var url="http://"+target_ip+":"+target_port+"/auto-web/mDelUserRecordLast";
	  var args={};
      args.serial=getParam("serial");
      args.userName=getParam("userName");

      get3(url,args,getCurrentUserRecord);

	});




}


//录屏判断
function actionjudge(action,argstr){

	if(isrecording()===true){

	//console.log("录屏模式 记录动作");




	var url="http://"+target_ip+":"+target_port+"/auto-web/actionRecord";
	var args={};

	args.serial=getParam("serial");
	args.userName=getParam("userName");
    args.actionName=action;

    args.sw=bw2;

   //如果开启wait状态 则actionName=wait

	if(isWait())
		args.actionName="wait"
	
    args.args=argstr;


	console.log("录制动作");
	console.log("serial="+args.serial+" actionName="+action+" args="+argstr+" time="+args.time);

	get2(url,args);

	}


}

//刷新
function refresh(){

	$("#btn-refresh").click(function(){
		recordoptionshow();
	});
}

function recordStop(){

	//清楚录制步骤view
	clearRecord();



	//
	var url="http://"+target_ip+":"+target_port+"/auto-web/recordStop";
	var args={};
	args.serial=getParam("serial");
	args.userName=getParam("userName");
	args.recordName=$("#recordname").val()===""?"case_"+getTimeStr():$("#recordname").val();
	args.tip=$("#tip").val();
	args.method=$(".record-method:first").text()==="坐标"?0:1;
	args.time=$("#timerecord").text();

    console.log("停止录制 url="+url+" args="+args.userName+":"+args.recordName+":"+args.tip+":"+args.method+":"+args.time);
	//get2(url,args,recordoptionshow);

	get2(url,args);
	//get3(url,args,recordoptionshow);

	//recordoptionshow();


}

function clearRecord(){
	$("#recordmsg").empty();
}

function getCurrentUserRecord(){

	      if(!isrecording())return;
		     //
	     console.log("绘制当期录制步骤...");

         //显示用例选择
	      var args={};
	      args.userName=getParam("userName");
	      args.serial=getParam("serial");

	      var url="http://"+target_ip+":"+target_port+"/auto-web/mGetUserRecord";
	      var obj=get(url,args);
	      if(null==obj.data){

	      	return;

	      }



	      console.log("请求用户录制脚本 url="+url+" userName="+args.userName );

	      var prefix="<small class='col-md-12'>已录步骤</small>";
	      var html=prefix+"<div class='scroll dotted-decorate col-md-12'>";

	      for(var i=obj.data.length-1;i>=0;i--){


	      	var command=obj.data[i];
	      	var actionName=command.split(";")[0];

	      	var msg="";

	      	if(actionName.toLowerCase().indexOf("touch")>-1){
	      		console.log("touch系统事件.")
	      		var len=command.split(";")[1].split("_").length;
	      	    console.log("len="+len);
	      	    var str=command.split(";")[1].split("_")[2];
	      	    if(len>3){
	      		for(var j=3;j<len;j++){
	      			var sp=command.split(";")[1].split("_")[j];
	      			console.log("sp:"+sp);
	      			str+="_"+sp;

	      		}

	      	}
	      	  msg=actionName+" "+str;

	      	}else{
	      		console.log("非touch系统事件.")
	      		var reg = new RegExp(";" , "g" )
                msg = command.replace( reg ," ");


	      	}


	      	console.log("录制返回步骤:"+msg)

	   

	      	//html+="<small class='case-option col-md-2' id='"+id+"' title='"+title+"'>"+getshort(name,10)+"</small
	      	if(i==obj.data.length-1)
	      		html+="<small class='step-option col-md-12'><span id='"+i+"' class='col-md-1'>"+(i+1)+"</span><span title='"+msg+"'class='col-md-10' style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>"+msg+"</span><span id='del-last' class='fa fa-trash col-md-1'></span></small>";
	      	else
	      		html+="<small class='step-option col-md-12'><span id='"+i+"' class='col-md-1'>"+(i+1)+"</span><span title='"+msg+"'class='col-md-10' style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>"+msg+"</span><span class='col-md-1'></span></small>";




	

	      }
	      html+="</div>";



          $("#recordmsg").empty();
	      $("#recordmsg").html(html);


	      //重新添加del-last event
	       delUserRecordLast();

	      //显示基准选择

	      // var prefix="<small class='col-md-2'>基准选择</small>";
	      // var html=prefix+"<select class='col-md-2'>";

	      // for(var i=0;i<obj.data.length;i++){
	      // 	var name=obj.data[i].recordName;
	      // 	var tip=obj.data[i].tip;
	      // 	var method=obj.data[i].method;
	      // 	var id=obj.data[i].recordId;

	      //   if(obj.data.length<1){
	      // 		html+="<option id='"+id+"'>无用例</option>";
	      // 		break;
	      // 	}

	      // 	html+="<option id='"+id+"'>"+getshort(name,10)+"</option>";

	      // }
	      // $("#target").empty();

	      // $("#target").html(html);



	     //添加选中事件
	     $(".case-option:first").addClass("device-case-selected");

    $(".case-option").click(function(){
    	   if($(this).hasClass("device-case-selected"))
    	   	$(this).removeClass("device-case-selected");
    	   else{
    	   	$(".case-option").removeClass("device-case-selected");
    	   	$(this).addClass("device-case-selected");
    	   	    

    	   }
    	   
    	
    });

}

//手动截屏
function screenshotByHand(){
	$("#btn-screenshot").click(function(){
		

        if(!isrecording())return;
        
	    var url="http://"+target_ip+":"+target_port+"/auto-web/screenshotByHand";
	    var args={};

	    var t=$(".mode-selected");
        var args={};
        args.serial=getParam("serial");
        args.userName=getParam("userName");
        args.isRecording="true";
        //args.mode=t[0].getAttribute("id");
        args.mode="easy_by_hand"
        args.time=$("#timerecord").text();

        console.log("手动截屏 %s",args.mode);
        get2(url,args);



	});
}



function recordoptionshow(){

	     //
	     console.log("重构录制显示部分");

         //显示用例选择
	      var args={};
	      args.userName=getParam("userName");

	      var url="http://"+target_ip+":"+target_port+"/auto-web/mGetRecordHistory";
	      var obj=get(url,args);

	      console.log("请求历史数据 url="+url+" userName="+args.userName );

	      var prefix="<small class='col-md-12'>用例选择</small>";
	      var html=prefix+"<div class='scroll dotted-decorate col-md-12'>";

	      if(obj==null){
	      	$("#historymsg").empty();
	      	$("#historymsg").html("还没有录制用例...");
	      	return;
	      }

	      for(var i=0;i<obj.data.length;i++){


	      	var name=obj.data[i].recordName;
	      	var tip=obj.data[i].tip;
	      	var method=obj.data[i].method;
	      	var id=obj.data[i].recordId;
	      	var title=name+"_"+tip;

	      	//html+="<small class='case-option col-md-2' id='"+id+"' title='"+title+"'>"+getshort(name,10)+"</small>";

	      	html+="<small class='case-option col-md-12'><span id='"+id+"' class='col-md-4'>"+getshort(name,8)+"</span><span title='"+tip+"'class='col-md-8' style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>"+tip+"</span></small>";


	      }
	      html+="</div>";



          $("#historymsg").empty();
	      $("#historymsg").html(html);

	      //显示基准选择

	      // var prefix="<small class='col-md-2'>基准选择</small>";
	      // var html=prefix+"<select class='col-md-2'>";

	      // for(var i=0;i<obj.data.length;i++){
	      // 	var name=obj.data[i].recordName;
	      // 	var tip=obj.data[i].tip;
	      // 	var method=obj.data[i].method;
	      // 	var id=obj.data[i].recordId;

	      //   if(obj.data.length<1){
	      // 		html+="<option id='"+id+"'>无用例</option>";
	      // 		break;
	      // 	}

	      // 	html+="<option id='"+id+"'>"+getshort(name,10)+"</option>";

	      // }
	      // $("#target").empty();

	      // $("#target").html(html);



	     //添加选中事件
	     $(".case-option:first").addClass("device-case-selected");

    $(".case-option").click(function(){
    	   if($(this).hasClass("device-case-selected"))
    	   	$(this).removeClass("device-case-selected");
    	   else{
    	   	$(".case-option").removeClass("device-case-selected");
    	   	$(this).addClass("device-case-selected");
    	   	    

    	   }
    	   
    	
    });


}

function deviceoptionshow(){

	var url="http://"+target_ip+":"+target_port+"/auto-web/loadDevice";
	
	var online=get(url,{}).data.deviceInfo;

   // console.log("online size="+online.length);

    var html="<small class='col-md-12'>设备选择</small>"+"<div class='scroll dotted-decorate col-md-12'>";
    for(var i=0;i<online.length;i++){
    	html+="<small class='device-option col-md-2' id='"+online[i].serial+"'>"+getshort(online[i].model,10)+"</small>"
    

    }

    html+="</div>";

    $("#deviceinfo").html(html);

    //添加选中事件

    $(".device-option:first").addClass("device-case-selected");

    $(".device-option").click(function(){
    	   if($(this).hasClass("device-case-selected"))
    	   	$(this).removeClass("device-case-selected");
    	   else
    	   	$(this).addClass("device-case-selected");
    	
    });

}





//脚本回放
function playback(){

	$("#btn-playback").click(function(){


    //清除上一次结果

    $("#result").empty();

    //重设回放按钮
	$("#btn-playback").text("回放中");

	$("#btn-playback").attr("disabled","disabled");


    //

	var selectCase=$("#historymsg .device-case-selected").children("span:first");
	var caseId=selectCase[0].getAttribute("id");



	
	var url="http://"+target_ip+":"+target_port+"/auto-web/playback";
	var selectDevices=$("#deviceinfo .device-case-selected");
	var serialStr="";
	for(var i=0;i<selectDevices.length;i++){
		serialStr+=";"+selectDevices[i].getAttribute("id");

	}
	var sw=bw2;
	console.log("开始回放 url="+url+" serialStr="+serialStr+" recordid="+caseId+"sw="+sw);

    get3(url,{'serialStr':serialStr,'recordId':caseId,'sw':sw,'time':getTimeStr(),'userName':getParam("userName")},showplaybackresult);



	});




}

function showplaybackresult(data){
	var code=data.code;
    if(code!=1)return;

    var html="<small class='col-md-12'>回放结果</small>";
    html+="<table class='table table-default'>";



	for(var key in data.data){

		var result=data.data[key].result===true?"pass":"fail";
		var model=data.data[key].model;
		var msg=data.data[key].msg;
		var spend=data.data[key].spend;

		html+="<tr><td>"+model+"</td><td class='"+result+"'>"+result+"</td><td>"+msg+"</td><td style='color:#46b8da'>"+spend+" sec</td></tr>";

	   console.log("key="+key+" result="+result+" msg="+msg);

	}

	html+="</table>";

	$("#result").empty();
	$("#result").html(html);

	//重设回放按钮
	$("#btn-playback").text("开始回放");

	$("#btn-playback").removeAttr("disabled");



}

//模式切换 strict-mode/easy-mode

function modeToggle(){

	$(".record-mode").click(
		function(){
			
			if(!$(this).hasClass("mode-selected")){

				console.log("点击了未选中class=record-mode 元素");

				$(this).siblings().removeClass("mode-selected");
				$(this).addClass("mode-selected");

			}

			//禁用截屏逻辑

			if($(this).attr("id")==="strict"){
				$("#btn-screenshot").addClass("disabled");

			}else

			     $("#btn-screenshot").removeClass("disabled");
		});

}


//同步方式get请求接口 解析返回json对象指定属性
function get(url,param){
	
	var obj;
	   $.ajax(
				  { 
				  url:url,
				  type:'get',
				  timeout:1000000,
				  dataType: 'JSON',
				  data:param,
				  async:false,
				  success:function(data,status){
					  
					  //console.log("type="+typeof data);
					  console.log("同步调用 status="+status+" code="+data.code);
					  obj= data;
					  //console.log(data);


				  },
				  error:function (data, status, e){
			             
			              console.log(e);
			          }
					  
				  });
	   
	   return obj;
	
	
}

//异步方式get请求接口 解析返回json对象指定属性
function get3(url,param,f){
	
	
	   $.ajax(
				  { 
				  url:url,
				  type:'get',
				 // timeout:3000,
				  dataType: 'JSON',
				  data:param,
				  async:true,
				  success:function(data,status){


					  
					 // console.log("type="+typeof data);
					  console.log("异步调用 status="+status+" code="+data.code+" data="+data.data);
	

				
					  f(data);
					 // console.log(data);


				  },
				  error:function (data, status, e){
			             
			              console.log(e);
			          }
					  
				  });
	   
	   
	
	
}

//异步方式get请求接口 解析返回json对象指定属性
function get2(url,param){
	
	
	   $.ajax(
				  { 
				  url:url,
				  type:'get',
				  //timeout:3000,
				  dataType: 'JSON',
				  data:param,
				  async:true,
				  success:function(data,status){
					  
					  //console.log("type="+typeof data);

					  console.log("异步调用 status="+status+" code="+data.code);
		

					 // console.log(data);


				  },
				  error:function (data, status, e){
			             
			              console.log(e);
			          }
					  
				  });
	   
	   
	
	
}




/* 获取当前时间 */
function getTimeStr(){
	   var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth();//得到月份
       var date = now.getDate();//得到日期
       var hour=now.getHours();
       var minute=now.getMinutes();
       var second=now.getSeconds();
       month = month + 1;
       if (month < 10) month = "0" + month;
       if (date < 10) date = "0" + date;
       if(hour<10) hour="0"+hour;
       if(minute<10) minute="0"+minute;
       if(second<10) second="0"+second;
       var time = "";
       time = year + "-" + month + "-" + date+"_"+hour+"-"+minute+"-"+second;

       return time;
}

//缩写转化
function getshort(content,maxlength){

    var short="";
	if(content.length<=maxlength)
		short=content;

	else{
		short=content.substring(0,maxlength-1)+"...";
	}

	//console.log("old="+content+" short="+short);

	return short;



}


