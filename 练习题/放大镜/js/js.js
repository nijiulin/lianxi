/**
 * Created by admin on 2014/11/30.
 */
window.onload = function(){
var odiv = document.getElementById("div1");
var omark = document.getElementById("mark");
var ofloat = document.getElementById("float_layer");
var obig = document.getElementById("big_pic");
var osmall = document.getElementById("small_pic");
var oimgs = document.getElementById("oimg");
omark.onmouseover = function(){
    ofloat.style.display = "block";
    obig.style.display = "block";
};
omark.onmouseout = function(){
    ofloat.style.display = "none";
    obig.style.display = "none";
};
    omark.onmousemove = function(ev){
        var oevent = ev||event;
        var l = oevent.clientX - odiv.offsetLeft - osmall.offsetLeft - ofloat.offsetWidth/2;
        var t = oevent.clientY - odiv.offsetTop - osmall.offsetTop - ofloat.offsetHeight/2;
        if(l<0){
            l = 0;
        }else if(l>omark.offsetWidth - ofloat.offsetWidth){
            l = omark.offsetWidth - ofloat.offsetWidth
        }
        if(t<0){
            t = 0;
        }else if(t>omark.offsetHeight - ofloat.offsetHeight){
            t = omark.offsetHeight - ofloat.offsetHeight
        }
        ofloat.style.left = l  + "px";
        ofloat.style.top = t + "px";

       var perserX = l/(omark.offsetWidth - ofloat.offsetWidth);
        document.title = perserX + "px";
       var perserY = t/(omark.offsetHeight - ofloat.offsetHeight);
        oimgs.style.left = -perserX*(oimgs.offsetWidth - obig.offsetWidth) + "px";
        oimgs.style.top = -perserY*(oimgs.offsetHeight - obig.offsetHeight) + "px";
    }
};