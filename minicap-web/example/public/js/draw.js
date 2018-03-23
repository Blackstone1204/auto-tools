


deviceshow();


function uiinit(){



}
function deviceshow(){


console.log("原图第一次缩放到 "+bw1+"px"+" 第二次缩放到"+bw2+"px");
// var devices={
// deviceInfo:[
// {
//   "model":"metl 4",
//   "brand":"小米",
//   "version":"4.4.4",
//   "minicap_port":"1717",
//   "browser_port":"9002"

// }

// ]
// }

var BLANK_IMG =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

var canvas = document.getElementById('src')
  , g = canvas.getContext('2d')



//console.log("new canvas: "+newCanvas);


var view_url=window.location.href;
console.log("view_url="+window.location.href);
var ws_port=window.location.port;
//var ws_name="minicap";
var ws_name="a_"+getParam("n");
console.log("ws_name="+ws_name);



var ws_url='ws://localhost:'+ws_port;

console.log("ws_url="+ws_url);

var ws = new WebSocket(ws_url,ws_name);
ws.binaryType = 'blob'

ws.onclose = function() {
  console.log('onclose', arguments)
}

ws.onerror = function() {
  console.log('onerror', arguments)
}

ws.onmessage = function(message) {
  var blob = new Blob([message.data], {type: 'image/jpeg'})
  var URL = window.URL || window.webkitURL
  var img = new Image()

  img.onload = function() {

    //接受图像的宽高比例
    var scale=img.height/img.width;

    //设定全局变量设备宽度
    dwidth=img.width;


    canvas.width =bw1;
    canvas.height =scale*bw1;
   // console.log("接受的图像宽高 和比例"+img.width+"x"+img.height+" scale "+scale);
    //console.log("canvas size "+canvas.width+"x"+canvas.height);

    g.drawImage(img, 0, 0,img.width,img.height,0,0,canvas.width,canvas.height)

    
    //g.drawImage(img, 0, 0)
    img.onload = null
    img.src = BLANK_IMG
    img = null
    u = null
    blob = null
  }
  var u = URL.createObjectURL(blob)
  img.src = u


var destCanvas=canvas;

//创建新的画布 加载到投影区域

if(open_status){

  destCanvas = scale(bw2/bw1,canvas);

}

  $("#device-show").empty();
  $("#device-show").append(destCanvas);


  //
  resetscreen();



}

ws.onopen = function() {
  console.log('onopen', arguments)
  ws.send('1920x1080/0')
}
}

function resetscreen(){
  //string
    var w=$("#device-show canvas").attr("width");
    var h=$("#device-show canvas").attr("height");
  //var w="100px";
  //number
  var w2=document.getElementById("device").clientWidth;
  var h2=document.getElementById("device").clientHeight;

 // console.log("当前设备管理区域宽高 "+w2+" "+h2);
  //var w2="200px";s
  //设置一个阈值 小于时予以提示
  var fz=50;
  
  var wv;
  wv=new String(w).replace("px","");
  var w2v=w2;
  var flag=w2v-wv>fz;

  if(flag){
      $("#device-show").css("width",w);
      //console.log("重设设备投影区域宽高 "+w+" "+h);
  }else{
    //alert("设备投影可能会超出投影区域！");
    console.log("设备投影可能会超出投影区域！");
  }
}



//获取该js所在页面通过url传入的指定参数
function getParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}