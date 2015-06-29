/* http://www.miaov.com/ - coding: leo - QQ: 20907961 - time: 2010/8/28 */

var timer      = null;
var autoTime   = null;
var ms         = 100;
var autoMs     = 3000;
var iTarget    = 0;
var speed      = 0;
var nextTarget = 0;

window.onload  = function()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    var oUl    = obj.getElementsByTagName("ul")[0];
    var oUlLis = oUl.getElementsByTagName("li");
    var oPrev  = obj.getElementsByTagName("p")[0];
    var oNext  = obj.getElementsByTagName("p")[1];

// ul的宽度  3000px
    oUl.style.width = oUlLis.length * oUlLis[0].offsetWidth + "px";
    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].onmouseover = getIndx;
    }

    //移入移出鼠标情况
    obj.onmouseover = function()
    {
        clearInterval(currentTime);
    };
    obj.onmouseout = function()
    {
        if(currentTime)
        {
            clearInterval(currentTime);
        }
        currentTime = setInterval("autoPlay()",autoMs);
    };
//按下前后按钮
    oPrev.onmousedown = fnPrev;
    oNext.onmousedown = fnNext;

    currentTime = setInterval("autoPlay()",autoMs);
};

// 点击前一个按钮
function fnPrev()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    nextTarget-=1;
    if(nextTarget < 0){ nextTarget = aLis.length-1; }
    goTime(nextTarget);
}

// 点击后一个按钮
function fnNext()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    nextTarget+=1;
    if(nextTarget === aLis.length){ nextTarget = 0; }
    goTime(nextTarget);
}

// 自动轮播
function autoPlay()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");

    nextTarget+=1;
    if( nextTarget >= aLis.length ) {
        nextTarget = 0;
      }
    goTime(nextTarget)
}

// ol 中的 li;
function getIndx()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");

    for( var i = 0; i < aLis.length; i+=1 )
    {
        if(aLis[i] === this)
        {
            goTime(i);
        }
    }
}

//
function goTime(index)
{
    var obj      = document.getElementById("play");
    var oUl      = obj.getElementsByTagName("ul")[0];
    var oOl      = obj.getElementsByTagName("ol")[0];
    var aLis     = oOl.getElementsByTagName("li");
    var iLiWidth = oUl.getElementsByTagName("li")[0].offsetWidth;

    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].className = "";
    }
    aLis[index].className = "active";

    iTarget = -index * iLiWidth;

    if(timer){ clearInterval(timer); }
   timer = setInterval("doMove("+ iTarget +")",ms);
   doMove(iTarget);
}


function doMove(target)
{
   var obj = document.getElementById("play");
    var oUl = obj.getElementsByTagName("ul")[0];

    oUl.style.left = speed + "px";
    speed+=(target - oUl.offsetLeft)/3;

    if( Math.abs(target-oUl.offsetLeft) === 0 )
    {
        oUl.style.left = target + "px";
        clearInterval(timer);
        timer = null;
    }
}
